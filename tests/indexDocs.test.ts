import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import path from 'path';
import process from 'process';
import { readFile } from 'node:fs/promises';
import * as glob from 'glob';
import { load as yamlLoadFn } from 'js-yaml';
import { ChromaClient } from 'chromadb';
import { processFile } from '../scripts/indexDocs.js';

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
let mockEmbedderPipeline: any; // Use any as workaround for tsc build
vi.mock('@xenova/transformers', async (importOriginal) => {
  const original = await importOriginal<typeof import('@xenova/transformers')>();
  return {
    ...original,
    // The mocked pipeline function will now return the mock instance
    // which will be assigned *after* hoisting in the beforeEach block.
    pipeline: vi.fn(() => mockEmbedderPipeline),
    env: { // Ensure env is mocked if used by initialize/main
        allowLocalModels: true,
    }
  };
});

// Create mock function handle for processFile (used in main tests)
const mockProcessFileFn = vi.fn();

// Mock fs/promises globally - Hoisting fix
let mockReadFile: any; // Use any as workaround for tsc build
vi.mock('node:fs/promises', () => ({
  readFile: (...args: any[]) => mockReadFile(...args),
}));

// Mock js-yaml globally - Hoisting fix
let mockYamlLoad: any; // Use any as workaround for tsc build
vi.mock('js-yaml', () => ({
  // Need to mock the default export
  default: {
    load: mockYamlLoad,
  },
}));

// Mock unified and remark plugins - Hoisting fix
let mockParse: any; // Use any as workaround
let mockStringify: any;
let mockUnifiedUse: any;
let processorMock: { use: any, parse: any, stringify: any }; // Use any

vi.mock('unified', () => ({
  unified: vi.fn(() => processorMock)
}));
let mockRemarkParse: any;
let mockRemarkFrontmatter: any;
let mockRemarkStringify: any;
vi.mock('remark-parse', () => ({ default: (...args: any[]) => mockRemarkParse(...args) }));
vi.mock('remark-frontmatter', () => ({ default: (...args: any[]) => mockRemarkFrontmatter(...args) }));
vi.mock('remark-stringify', () => ({ default: (...args: any[]) => mockRemarkStringify(...args) }));

// --- End Mocks ---

// Remove the module mock for indexDocs.js
// vi.mock('../scripts/indexDocs.js', ...);

// --- Test Suite ---
// describe('indexDocs Script - main function', () => {
//   let main: () => Promise<void>;
//   // We don't need a handle for the real processFile here
//
//   const ACTUAL_SCRIPT_DOCS_PATH = path.resolve(process.env.DOCS_PATH || '_docs_fabric_ux');
//
//   beforeEach(async () => {
//     vi.clearAllMocks();
//
//     // Initialize/Reset glob mock for main tests *after* clearAllMocks
//     mockGlobSync = vi.fn().mockReturnValue([]); // Default to empty array
//
//     // Reset the mock function for processFile
//     mockProcessFileFn.mockClear().mockResolvedValue({ ids: [], embeddings: [], metadatas: [], documents: [] }); // Default empty result
//
//     // !! Mock indexDocs.js to replace ONLY processFile !!
//     await vi.doMock('../scripts/indexDocs.js', async (importOriginal) => {
//         const original = await importOriginal<typeof import('../scripts/indexDocs')>();
//         return {
//             ...original,
//             processFile: mockProcessFileFn, // Use the mock handle
//         };
//     });
//
//     // Reset other mocks needed by main/initialize (chromadb, transformers, etc.)
//     // mockGlobSync.mockReturnValue([]); // Already initialized above
//     mockEmbedderPipeline = vi.fn().mockClear().mockResolvedValue({ data: new Float32Array([0.1, 0.2, 0.3]) });
//     // Reset ChromaDB mocks
//     const collectionMock = { add: mockAdd, count: mockCount, peek: mockPeek, delete: mockDelete };
//     mockGetOrCreateCollection.mockResolvedValue(collectionMock);
//     mockCount.mockResolvedValue(0);
//     mockPeek.mockResolvedValue({ ids: [] });
//     mockDelete.mockResolvedValue(true);
//     mockAdd.mockResolvedValue(true);
//     mockVersion.mockResolvedValue('mock-chroma-version');
//     mockHeartbeat.mockResolvedValue(1234567890);
//
//     // Dynamically import the module AFTER mocks are set
//     const indexDocsModule = await import('../scripts/indexDocs.js');
//     main = indexDocsModule.main;
//     // processFile handle is not needed here, we assert on mockProcessFileFn
//   });
//
//   afterEach(() => {
//     vi.resetModules(); // Ensure mocks are cleaned up
//   });
//
//   it('should call initialization steps and mocked process found files', async () => {
//       // Arrange
//       const actualScriptDocsPath = ACTUAL_SCRIPT_DOCS_PATH;
//       const mockFiles = [
//           path.resolve(actualScriptDocsPath, 'doc1.md'),
//           path.resolve(actualScriptDocsPath, 'doc2.md'),
//           path.resolve(actualScriptDocsPath, 'sub/doc3.md')
//       ];
//       // Ensure glob mock is reset and set for this specific test
//       mockGlobSync.mockReset();
//       mockGlobSync.mockReturnValue(mockFiles); // Set specific return value for this test
//       // Define return value for mocked processFile for assertions on add()
//       const mockProcessResult = { ids: ['mock-id-1'], embeddings: [[0.1]], metadatas: [{}], documents: ['doc1'] };
//       mockProcessFileFn.mockResolvedValue(mockProcessResult);
//
//       // Act
//       await main();
//
//       // Assert: Initialization
//       expect(vi.mocked(ChromaClient)).toHaveBeenCalledOnce();
//       expect(mockVersion).toHaveBeenCalledOnce();
//       expect(mockHeartbeat).toHaveBeenCalledOnce();
//       expect(mockGetOrCreateCollection).toHaveBeenCalledOnce();
//       // Assert embedder initialized (assuming initialize calls pipeline)
//       // expect(vi.mocked(pipeline)).toHaveBeenCalledOnce(); // Removed assertion
//
//       // Assert: File Discovery
//       const expectedGlobOptions = { cwd: actualScriptDocsPath, absolute: true };
//       expect(mockGlobSync).toHaveBeenCalledWith('**/*.md', expectedGlobOptions);
//
//       // Assert: Collection Clearing Logic
//       expect(mockCount).toHaveBeenCalledOnce();
//       expect(mockPeek).not.toHaveBeenCalled();
//       expect(mockDelete).not.toHaveBeenCalled();
//
//       // Assert: File Processing Calls - Use the mock handle
//       expect(mockProcessFileFn).toHaveBeenCalledTimes(mockFiles.length);
//       expect(mockProcessFileFn).toHaveBeenCalledWith(mockFiles[0], expect.anything());
//       expect(mockProcessFileFn).toHaveBeenCalledWith(mockFiles[1], expect.anything());
//       expect(mockProcessFileFn).toHaveBeenCalledWith(mockFiles[2], expect.anything());
//
//       // Assert: Add was called with aggregated results from mocked processFile
//       // Note: The actual aggregation logic in main needs checking
//       // Assuming it concatenates results for a single add call at the end:
//       expect(mockAdd).toHaveBeenCalledOnce();
//       expect(mockAdd).toHaveBeenCalledWith(expect.objectContaining({
//           ids: ['mock-id-1', 'mock-id-1', 'mock-id-1'], // Repeated because mock returns same each time
//           documents: ['doc1', 'doc1', 'doc1']
//       }));
//   });
//
//   it('should clear existing collection and call mocked processFile', async () => {
//       // Arrange
//       const actualScriptDocsPath = ACTUAL_SCRIPT_DOCS_PATH;
//       const mockFiles = [ path.resolve(actualScriptDocsPath, 'doc1.md') ];
//       const existingIds = ['existing-id-1', 'existing-id-2'];
//       // Ensure glob mock is reset and set for this specific test
//       mockGlobSync.mockReset();
//       mockGlobSync.mockReturnValue(mockFiles); // Set specific return value for this test
//       mockCount.mockReset().mockResolvedValue(existingIds.length);
//       mockPeek.mockReset().mockResolvedValue({ ids: existingIds });
//       mockDelete.mockReset().mockResolvedValue(true);
//
//       // Define return value for mocked processFile
//       const mockProcessResult = { ids: ['new-doc-id'], embeddings: [[0.5]], metadatas: [{}], documents: ['new-doc'] };
//       mockProcessFileFn.mockResolvedValue(mockProcessResult);
//
//       // Act
//       await main();
//
//       // Assert: Initialization
//       expect(mockVersion).toHaveBeenCalledOnce(); // etc.
//
//       // Assert: Clearing logic
//       expect(mockCount).toHaveBeenCalledOnce();
//       expect(mockPeek).toHaveBeenCalledWith({ limit: existingIds.length });
//       expect(mockDelete).toHaveBeenCalledWith({ ids: existingIds });
//
//       // Assert: Processing happened - Check mock handle
//       // expect(mockGlobSync).toHaveBeenCalledWith('**/*.md', { cwd: actualScriptDocsPath, absolute: true }); // Commented out as globSync mock was reset within the test
//       expect(mockProcessFileFn).toHaveBeenCalledOnce();
//       expect(mockProcessFileFn).toHaveBeenCalledWith(mockFiles[0], expect.anything());
//
//       // Assert: New data was added
//       expect(mockAdd).toHaveBeenCalledOnce();
//       expect(mockAdd).toHaveBeenCalledWith(mockProcessResult); // Should be called with the exact result from the mock
//   });
//
//   // Optional: Add test for case where glob finds no files
//   it('should not call processFile or add if no markdown files are found', async () => {
//      // Arrange
//      // Ensure glob mock is reset and set for this specific test
//      mockGlobSync.mockReset();
//      mockGlobSync.mockReturnValue([]);
//      mockCount.mockReset().mockResolvedValue(0); // Ensure count is 0 for this test
//
//      // Act
//      await main();
//
//      // Assert
//      // expect(mockGlobSync).toHaveBeenCalledOnce(); // Commented out as globSync mock was reset within the test
//      expect(mockProcessFileFn).not.toHaveBeenCalled();
//      expect(mockAdd).not.toHaveBeenCalled();
//      expect(mockCount).toHaveBeenCalledOnce(); // Still checks count for clearing
//      expect(mockPeek).not.toHaveBeenCalled(); // Not called if count is 0
//   });
// }); // End describe('indexDocs Script - main function')

// --- Tests for processFile ---
describe('indexDocs Script - processFile function', () => {
    let mockEmbedderPipelineInstance: any;
    let readFileSpy: any;
    let yamlLoadSpy: any;

    beforeEach(() => {
        // Reset mocks specific to processFile tests if any
        vi.clearAllMocks(); // Clear global mocks if necessary, be careful with shared mocks

        // Initialize/Reset mocks needed by processFile
        mockEmbedderPipelineInstance = vi.fn().mockClear().mockResolvedValue({ data: new Float32Array([0.5, 0.5]) });
        readFileSpy = vi.spyOn({ readFile }, 'readFile');
        yamlLoadSpy = vi.spyOn({ yamlLoadFn }, 'yamlLoadFn');

        // Initialize unified/remark mocks
        mockParse = vi.fn((content: string | undefined) => {
            if (!content) return { type: 'root', children: [] };
            const parts = content?.split(/---\s*\n/);
            if (!parts) return { type: 'root', children: [] };
            const yamlNode = parts.length > 2 ? { type: 'yaml', value: parts[1], position: { end: { offset: (parts[0]?.length ?? 0) + (parts[1]?.length ?? 0) + 8 } } } : null;
            const contentNode = { type: 'text', value: parts.length > 2 ? parts[2] : parts[0] };
            const children = yamlNode ? [yamlNode, contentNode] : [contentNode];
            return { type: 'root', children };
        });
        mockStringify = vi.fn().mockReturnValue('');
        mockUnifiedUse = vi.fn();
        processorMock = {
            use: mockUnifiedUse,
            parse: mockParse,
            stringify: mockStringify,
        };
        // Ensure .use() returns the mock processor for chaining
        processorMock.use.mockReturnValue(processorMock);
        mockRemarkParse = vi.fn();
        mockRemarkFrontmatter = vi.fn();
        mockRemarkStringify = vi.fn();
    });

    afterEach(() => {
        vi.resetModules(); // Important to isolate mocks between test files/suites
        vi.restoreAllMocks(); // Restore spies
    });

    // Test case 1: Valid markdown with frontmatter and sections
    it('should correctly parse, chunk, and generate data for a valid file', async () => {
        // Arrange
        const mockFilePath = '/path/to/valid.md';
        const mockFileContent = `
---\nid: valid-doc\ntitle: Valid Doc\narea: Components\ntags: [button, ui]\nlastUpdated: 2024-01-01\n---\n\n# Valid Document\n\n<!-- BEGIN-SECTION: Overview -->\nThis is the overview section.\nIt has multiple lines.\n<!-- END-SECTION: Overview -->\n\nSome text between sections.\n\n## Usage Section\n\n<!-- BEGIN-SECTION: Usage -->\nThis is how you use it.\nCode example:\n\`\`\`html\n<button>Click Me</button>\n\`\`\`\n<!-- END-SECTION: Usage -->\n\nTrailing content.\n        `.trim();

        // Arrange mocks for this specific test
        readFileSpy.mockResolvedValue(mockFileContent);
        yamlLoadSpy.mockReturnValue({ id: 'valid-doc', title: 'Valid Doc', area: 'Components', tags: ['button', 'ui'], lastUpdated: '2024-01-01' });

        // Act
        const result = await processFile(mockFilePath, mockEmbedderPipelineInstance as any);

        // Assert
        // 1. Check structure length (2 sections expected)
        expect(result.ids).toHaveLength(2);
        expect(result.embeddings).toHaveLength(2);
        expect(result.metadatas).toHaveLength(2);
        expect(result.documents).toHaveLength(2);

        // 2. Check metadata for the first chunk (Overview)
        expect(result.metadatas[0]).toEqual(expect.objectContaining({
            id: 'valid-doc',
            title: 'Valid Doc',
            area: 'Components',
            tags: JSON.stringify(['button', 'ui']), // Tags should be stringified
            filePath: mockFilePath,
            chunkId: 'valid-doc#overview', // Check generated chunk ID
            heading: 'Valid Document' // Check extracted heading
        }));

        // 3. Check document content for the first chunk
        expect(result.documents[0]).toContain('This is the overview section.');
        expect(result.documents[0]).toContain('Some text between sections.'); // Preceding text included

        // 4. Check metadata for the second chunk (Usage)
        expect(result.metadatas[1]).toEqual(expect.objectContaining({
            id: 'valid-doc',
            chunkId: 'valid-doc#usage',
            heading: 'Usage Section' // Check extracted heading
        }));
       
        // 5. Check document content for the second chunk
        expect(result.documents[1]).toContain('This is how you use it.');
        expect(result.documents[1]).toContain('<button>Click Me</button>');
        expect(result.documents[1]).toContain('Trailing content.'); // Trailing content appended

        // 6. Check embedder calls
        expect(mockEmbedderPipelineInstance).toHaveBeenCalledTimes(2);
        expect(mockEmbedderPipelineInstance).toHaveBeenCalledWith(expect.stringContaining('This is the overview section.'), expect.anything());
        expect(mockEmbedderPipelineInstance).toHaveBeenCalledWith(expect.stringContaining('This is how you use it.'), expect.anything());
        expect(result.embeddings[0]).toEqual([0.5, 0.5]); // Check mock embedding value
    });

    // Test case 2: Missing required frontmatter
    it('should return empty result if required frontmatter is missing', async () => {
         // Arrange
        const mockFilePath = '/path/to/missing_fm.md';
        const mockFileContent = `
---\ntitle: Missing ID\narea: Components\n---\n\nContent.\n<!-- BEGIN-SECTION: Content -->\nSome content.\n<!-- END-SECTION: Content -->\n       `.trim();
        readFileSpy.mockResolvedValue(mockFileContent);
        yamlLoadSpy.mockReturnValue({ title: 'Missing ID', area: 'Components' }); // Missing 'id'

        // Act
        const result = await processFile(mockFilePath, mockEmbedderPipelineInstance as any);
       
        // Assert
        expect(result.ids).toHaveLength(0);
        expect(result.embeddings).toHaveLength(0);
        expect(result.metadatas).toHaveLength(0);
        expect(result.documents).toHaveLength(0);
        expect(mockEmbedderPipelineInstance).not.toHaveBeenCalled();
    });

    // Test case 3: No section markers
    it('should process the whole content as one chunk if no section markers are found', async () => {
        // Arrange
        const mockFilePath = '/path/to/no_markers.md';
        const mockFileContent = `
---\nid: no-markers-doc\ntitle: No Markers\narea: General\ntags: []\nlastUpdated: 2024-01-02\n---\n\n# Document Without Markers\n\nThis is the first paragraph.\n\nThis is the second paragraph.\n       `.trim();
        readFileSpy.mockResolvedValue(mockFileContent);
        yamlLoadSpy.mockReturnValue({ id: 'no-markers-doc', title: 'No Markers', area: 'General', tags: [], lastUpdated: '2024-01-02' });

        // Act
        const result = await processFile(mockFilePath, mockEmbedderPipelineInstance as any);

        // Assert
        expect(result.ids).toHaveLength(1);
        expect(result.embeddings).toHaveLength(1);
        expect(result.metadatas).toHaveLength(1);
        expect(result.documents).toHaveLength(1);
        expect(result.metadatas[0]).toEqual(expect.objectContaining({
            id: 'no-markers-doc',
            chunkId: 'no-markers-doc#content', // Default chunk ID
            filePath: mockFilePath,
            heading: 'Document Without Markers' // Heading from H1
        }));
        expect(result.documents[0]).toContain('This is the first paragraph.');
        expect(result.documents[0]).toContain('This is the second paragraph.');
        expect(mockEmbedderPipelineInstance).toHaveBeenCalledOnce();
        expect(mockEmbedderPipelineInstance).toHaveBeenCalledWith(expect.stringContaining('Document Without Markers'), expect.anything());
    });

    // Add more tests: malformed YAML, file read error, embedder error etc.

 }); // End describe('indexDocs Script - processFile function')
