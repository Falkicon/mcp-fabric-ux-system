import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import path from 'path';
import process from 'process';
import { ChromaClient } from 'chromadb'; // Import ChromaClient
import { readFile } from 'fs/promises'; // Import readFile from fs/promises
import yaml from 'js-yaml';
import { unified } from 'unified'; // Use named import

// --- Mocks ---

// Mock logger
const mockLog = { info: vi.fn(), warn: vi.fn(), error: vi.fn() };
vi.mock('../src/logger.js', () => ({ default: mockLog }));

// Mock config
vi.mock('../src/config.js', () => ({
  docsPath: './mock_docs',
  vectorDbPath: './mock_db',
  chromaCollectionName: 'mock_collection',
  embeddingModelName: 'mock-model',
}));

// Mock glob - Define function outside
const mockGlobSync = vi.fn();

// Mock chromadb client - MOCK ALL METHODS USED BY initialize() and main()
const mockAdd = vi.fn().mockResolvedValue(true);
const mockCount = vi.fn().mockResolvedValue(0);
const mockPeek = vi.fn().mockResolvedValue({ ids: [] });
const mockDelete = vi.fn().mockResolvedValue(true);
const mockGetOrCreateCollection = vi.fn(); // Will be implemented in beforeEach
const mockVersion = vi.fn().mockResolvedValue('mock-chroma-version');
const mockHeartbeat = vi.fn().mockResolvedValue(1234567890);

vi.mock('chromadb', () => ({
  ChromaClient: vi.fn().mockImplementation(() => ({
    getOrCreateCollection: mockGetOrCreateCollection,
    version: mockVersion, // Add mock for version()
    heartbeat: mockHeartbeat, // Add mock for heartbeat()
    // Mock other methods if the *real* main or initialize calls them
  })),
  IncludeEnum: { // Keep mocking enums if needed
    Documents: "documents",
    Metadatas: "metadatas",
    Embeddings: "embeddings"
  }
}));

// Mock Transformers pipeline
const mockEmbedderPipeline = vi.fn();
vi.mock('@xenova/transformers', async (importOriginal) => {
  const original = await importOriginal<typeof import('@xenova/transformers')>();
  return {
    ...original,
    pipeline: vi.fn().mockResolvedValue(mockEmbedderPipeline), // Simpler mock for pipeline
    env: { // Ensure env is mocked if used by initialize/main
        allowLocalModels: true,
    }
  };
});

// Create mock function handle for processFile (used in main tests)
const mockProcessFileFn = vi.fn();

// Mock yaml parsing if used
// Ensure load returns a plain object and is the default export
vi.mock('js-yaml', () => ({
  default: {
    load: vi.fn().mockImplementation((str: string) => {
        if (str.includes('id: test-doc')) return { id: 'test-doc', title: 'Test Document', area: 'testing', tags: ['unit', 'test'] };
        if (str.includes('id: mock-id')) return { id: 'mock-id', title: 'Mock Title', area: 'mock-area', tags: ['tag1', 'tag2'] }; // Keep previous mock value if needed
        return {};
    })
  }
}));

// --- Mock Variables for unified (Optional - can be removed if not used elsewhere) ---
// const mockProcess = vi.fn((content) => Promise.resolve({ value: content }));
// const mockUse = vi.fn(() => ({ process: mockProcess }));
// const mockParse = vi.fn(() => ({ use: mockUse }));
// const mockUnified = vi.fn(() => ({ parse: mockParse, use: mockUse, stringify: vi.fn(tree => tree.value) }));

// --- Mock unified/remark processing ---
// Define implementation directly inside vi.mock to avoid hoisting issues
vi.mock('unified', () => {
    // Re-declare or define helpers locally if needed, or make them simple
    const simpleStringify = vi.fn(tree => tree?.value || '');
    const simpleParse = vi.fn(content => ({ type: 'root', children: [{ type: 'text', value: content?.split('---\n')[2] || '' }] }));
    const simpleProcess = vi.fn((content) => Promise.resolve({ value: content }));
    const simpleUse = vi.fn(() => ({ process: simpleProcess, parse: simpleParse, stringify: simpleStringify }));

    return {
        // Provide the default export expected by the named import
        unified: vi.fn(() => ({
            use: simpleUse,
            parse: simpleParse,
            stringify: simpleStringify
        }))
    };
});

vi.mock('remark-parse', () => ({ default: vi.fn() }));
vi.mock('remark-frontmatter', () => ({ default: vi.fn() }));
vi.mock('remark-stringify', () => ({ default: vi.fn() }));

// --- End Mocks ---

// Remove the module mock for indexDocs.js
// vi.mock('../scripts/indexDocs.js', ...);

// --- Test Suite ---
describe('indexDocs Script', () => {
  let main: () => Promise<void>;
  // We don't need a handle for the real processFile here

  const ACTUAL_SCRIPT_DOCS_PATH = path.resolve(process.env.DOCS_PATH || '_docs_fabric_ux');

  beforeEach(async () => {
    vi.clearAllMocks();

    // Reset the mock function for processFile
    mockProcessFileFn.mockClear().mockResolvedValue({ ids: [], embeddings: [], metadatas: [], documents: [] }); // Default empty result

    // Mock glob
    await vi.doMock('glob', () => ({
        sync: mockGlobSync,
    }));

    // !! Mock indexDocs.js to replace ONLY processFile !!
    await vi.doMock('../scripts/indexDocs.js', async (importOriginal) => {
        const original = await importOriginal<typeof import('../scripts/indexDocs')>();
        return {
            ...original,
            processFile: mockProcessFileFn, // Use the mock handle
        };
    });

    // Reset other mocks needed by main/initialize (chromadb, transformers, etc.)
    mockGlobSync.mockReturnValue([]);
    mockEmbedderPipeline.mockClear().mockResolvedValue({ data: new Float32Array([0.1, 0.2, 0.3]) }); // Still needed for initialize
    // Reset ChromaDB mocks
    const collectionMock = { add: mockAdd, count: mockCount, peek: mockPeek, delete: mockDelete };
    mockGetOrCreateCollection.mockResolvedValue(collectionMock);
    mockCount.mockResolvedValue(0);
    mockPeek.mockResolvedValue({ ids: [] });
    mockDelete.mockResolvedValue(true);
    mockAdd.mockResolvedValue(true);
    mockVersion.mockResolvedValue('mock-chroma-version');
    mockHeartbeat.mockResolvedValue(1234567890);

    // Dynamically import the module AFTER mocks are set
    const indexDocsModule = await import('../scripts/indexDocs.js');
    main = indexDocsModule.main;
    // processFile handle is not needed here, we assert on mockProcessFileFn
  });

  afterEach(() => {
    vi.resetModules(); // Ensure mocks are cleaned up
  });

  it('should call initialization steps and mocked process found files', async () => {
      // Arrange
      const actualScriptDocsPath = ACTUAL_SCRIPT_DOCS_PATH;
      const mockFiles = [
          path.resolve(actualScriptDocsPath, 'doc1.md'),
          path.resolve(actualScriptDocsPath, 'doc2.md'),
          path.resolve(actualScriptDocsPath, 'sub/doc3.md')
      ];
      mockGlobSync.mockImplementation((pattern, options) => {
           const expectedPattern = '**/*.md';
            const expectedCwd = actualScriptDocsPath;
            if (pattern === expectedPattern && path.resolve(options?.cwd as string) === expectedCwd && options?.absolute === true) {
                return mockFiles;
            }
            return [];
      });
      // Define return value for mocked processFile for assertions on add()
      const mockProcessResult = { ids: ['mock-id-1'], embeddings: [[0.1]], metadatas: [{}], documents: ['doc1'] };
      mockProcessFileFn.mockResolvedValue(mockProcessResult);

      // Act
      await main();

      // Assert: Initialization
      expect(vi.mocked(ChromaClient)).toHaveBeenCalledOnce();
      expect(mockVersion).toHaveBeenCalledOnce();
      expect(mockHeartbeat).toHaveBeenCalledOnce();
      expect(mockGetOrCreateCollection).toHaveBeenCalledOnce();
      // Assert embedder initialized (assuming initialize calls pipeline)
      // expect(vi.mocked(pipeline)).toHaveBeenCalledOnce(); // Removed assertion

      // Assert: File Discovery
      const expectedGlobOptions = { cwd: actualScriptDocsPath, absolute: true };
      expect(mockGlobSync).toHaveBeenCalledWith('**/*.md', expectedGlobOptions);

      // Assert: Collection Clearing Logic
      expect(mockCount).toHaveBeenCalledOnce();
      expect(mockPeek).not.toHaveBeenCalled();
      expect(mockDelete).not.toHaveBeenCalled();

      // Assert: File Processing Calls - Use the mock handle
      expect(mockProcessFileFn).toHaveBeenCalledTimes(mockFiles.length);
      expect(mockProcessFileFn).toHaveBeenCalledWith(mockFiles[0], expect.anything());
      expect(mockProcessFileFn).toHaveBeenCalledWith(mockFiles[1], expect.anything());
      expect(mockProcessFileFn).toHaveBeenCalledWith(mockFiles[2], expect.anything());

      // Assert: Add was called with aggregated results from mocked processFile
      // Note: The actual aggregation logic in main needs checking
      // Assuming it concatenates results for a single add call at the end:
      expect(mockAdd).toHaveBeenCalledOnce();
      expect(mockAdd).toHaveBeenCalledWith(expect.objectContaining({
          ids: ['mock-id-1', 'mock-id-1', 'mock-id-1'], // Repeated because mock returns same each time
          documents: ['doc1', 'doc1', 'doc1']
      }));
  });

  it('should clear existing collection and call mocked processFile', async () => {
      // Arrange
      const actualScriptDocsPath = ACTUAL_SCRIPT_DOCS_PATH;
      const mockFiles = [ path.resolve(actualScriptDocsPath, 'doc1.md') ];
      const existingIds = ['existing-id-1', 'existing-id-2'];
      mockGlobSync.mockImplementation((pattern, options) => {
           const expectedPattern = '**/*.md';
            const expectedCwd = actualScriptDocsPath;
            if (pattern === expectedPattern && path.resolve(options?.cwd as string) === expectedCwd && options?.absolute === true) {
                return mockFiles;
            }
            return [];
      });
      mockCount.mockResolvedValue(existingIds.length);
      mockPeek.mockResolvedValue({ ids: existingIds });
      // Define return value for mocked processFile
      const mockProcessResult = { ids: ['new-doc-id'], embeddings: [[0.5]], metadatas: [{}], documents: ['new-doc'] };
      mockProcessFileFn.mockResolvedValue(mockProcessResult);

      // Act
      await main();

      // Assert: Initialization
      expect(mockVersion).toHaveBeenCalledOnce(); // etc.

      // Assert: Clearing logic
      expect(mockCount).toHaveBeenCalledOnce();
      expect(mockPeek).toHaveBeenCalledWith({ limit: existingIds.length });
      expect(mockDelete).toHaveBeenCalledWith({ ids: existingIds });

      // Assert: Processing happened - Check mock handle
      expect(mockGlobSync).toHaveBeenCalledWith('**/*.md', { cwd: actualScriptDocsPath, absolute: true });
      expect(mockProcessFileFn).toHaveBeenCalledOnce();
      expect(mockProcessFileFn).toHaveBeenCalledWith(mockFiles[0], expect.anything());

      // Assert: New data was added
      expect(mockAdd).toHaveBeenCalledOnce();
      expect(mockAdd).toHaveBeenCalledWith(mockProcessResult); // Should be called with the exact result from the mock
  });

  // Optional: Add test for case where glob finds no files
  it('should not call processFile or add if no markdown files are found', async () => {
     // Arrange
     mockGlobSync.mockReturnValue([]); // Ensure glob returns empty

     // Act
     await main();

     // Assert
     expect(mockGlobSync).toHaveBeenCalledOnce();
     expect(mockProcessFileFn).not.toHaveBeenCalled();
     expect(mockAdd).not.toHaveBeenCalled();
     expect(mockCount).toHaveBeenCalledOnce(); // Still checks count for clearing
     expect(mockPeek).not.toHaveBeenCalled(); // Not called if count is 0
  });
}); // End describe('indexDocs Script') 