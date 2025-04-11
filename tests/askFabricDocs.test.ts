import { describe, it, expect, vi, beforeEach } from 'vitest';

// Import the factory and schema from the new tool file
import { createAskFabricDocsHandler, askFabricDocsSchema } from '../src/tools/askFabricDocsTool.js';
import type { TextContent } from '@modelcontextprotocol/sdk/types.js';
import type { ChromaClient, Collection } from 'chromadb';
import type { Pipeline } from '@xenova/transformers';
import type { Logger } from 'pino';
import { IncludeEnum } from 'chromadb'; // Import IncludeEnum for assertion

// --- Simple Mocks for Dependencies ---
// Define mockLog ensuring properties are functions
const mockLog = {
  info: vi.fn(), // Simple definition
  warn: vi.fn(),
  error: vi.fn(),
};

const mockQuery = vi.fn();
const mockGetCollection = vi.fn(() => Promise.resolve({
    query: mockQuery, 
    name: 'mock_collection_name',
    id: 'mock_collection_id',
    metadata: null,
    peek: vi.fn(() => Promise.resolve({ ids: [], embeddings: [], documents: [], metadatas: [] })),
    add: vi.fn(() => Promise.resolve()),
    get: vi.fn(() => Promise.resolve({ ids: [], embeddings: [], documents: [], metadatas: [] })),
    update: vi.fn(() => Promise.resolve()),
    upsert: vi.fn(() => Promise.resolve()),
    delete: vi.fn(() => Promise.resolve([])),
    count: vi.fn(() => Promise.resolve(0)),
    modify: vi.fn(() => Promise.resolve()), 
} as unknown as Collection));
const mockChromaClient: Partial<ChromaClient> = {
  getCollection: mockGetCollection,
};

const mockEmbedderPipeline = vi.fn();

// --- Test Suite ---
describe('askFabricDocs MCP Tool Handler', () => {
  let handler: (extra: any) => Promise<{ content: TextContent[], isError?: boolean }>;
  let mockEmbedder: (Pipeline | null) = null;

  beforeEach(() => {
    // Reset mocks - Use vi.mocked() again
    vi.mocked(mockLog.info).mockClear();
    vi.mocked(mockLog.warn).mockClear();
    vi.mocked(mockLog.error).mockClear();
    mockQuery.mockReset();
    mockGetCollection.mockReset();
    mockGetCollection.mockImplementation(() => Promise.resolve({
        query: mockQuery, 
        name: 'mock_collection_name',
        id: 'mock_collection_id',
        metadata: null,
        peek: vi.fn(() => Promise.resolve({ ids: [], embeddings: [], documents: [], metadatas: [] })),
        add: vi.fn(() => Promise.resolve()),
        get: vi.fn(() => Promise.resolve({ ids: [], embeddings: [], documents: [], metadatas: [] })),
        update: vi.fn(() => Promise.resolve()),
        upsert: vi.fn(() => Promise.resolve()),
        delete: vi.fn(() => Promise.resolve([])),
        count: vi.fn(() => Promise.resolve(0)),
        modify: vi.fn(() => Promise.resolve()), 
    } as unknown as Collection));
    mockEmbedderPipeline.mockReset();

    // Default state for embedder in tests
    mockEmbedder = mockEmbedderPipeline as unknown as Pipeline; 

    // Create a fresh handler for each test with current mock state
    handler = createAskFabricDocsHandler({
      log: mockLog,
      chromaClient: mockChromaClient as ChromaClient,
      embedder: mockEmbedder,
      collectionName: 'mock_collection',
    });
  });

  it('should return relevant documents for a valid query', async () => {
    // Arrange
    const mockInput = { query: 'test query', resultCount: 3 };
    const mockExtra = { traceId: 'test-trace-123', input: mockInput }; 
    const mockEmbedding = { data: new Float32Array([0.1, 0.2, 0.3]) };
    const mockDbResults = {
      ids: [['doc1', 'doc2']],
      embeddings: null, 
      documents: [['content of doc1', 'content of doc2']],
      metadatas: [[{ filePath: 'path/doc1.md', heading: 'Heading 1' }, { filePath: 'path/doc2.md', heading: 'Heading 2' }]],
      distances: null, 
    };

    mockEmbedderPipeline.mockResolvedValue(mockEmbedding);
    mockQuery.mockResolvedValue(mockDbResults);

    // Act
    const result = await handler(mockExtra);

    // Assert
    expect(mockLog.info).toHaveBeenCalledWith(expect.objectContaining({ traceId: 'test-trace-123' }), 'askFabricDocs tool called');
    expect(mockEmbedderPipeline).toHaveBeenCalledWith('test query', { pooling: 'mean', normalize: true });
    expect(mockGetCollection).toHaveBeenCalledWith({ name: 'mock_collection', embeddingFunction: expect.any(Object) });
    expect(mockQuery).toHaveBeenCalledWith({ 
      queryEmbeddings: [expect.arrayContaining([
          expect.closeTo(0.1), 
          expect.closeTo(0.2), 
          expect.closeTo(0.3)
      ])],
      nResults: 3, 
      include: expect.arrayContaining([IncludeEnum.Metadatas, IncludeEnum.Documents])
    });
    expect(result.isError).toBeFalsy();
    expect(result.content).toHaveLength(2);
    expect(result.content[0].type).toBe('text');
    expect(result.content[0].text).toContain('Source: path/doc1.md');
    expect(result.content[0].text).toContain('Section: Heading 1');
    expect(result.content[0].text).toContain('content of doc1');
    expect(result.content[1].text).toContain('Source: path/doc2.md');
  });

  it('should return a friendly message when no documents are found', async () => {
    // Arrange
    const mockInput = { query: 'unfound query', resultCount: 3 };
    const mockExtra = { traceId: 'test-trace-456', input: mockInput }; 
    const mockEmbedding = { data: new Float32Array([0.4, 0.5, 0.6]) };
    const mockDbResultsEmpty = {
      ids: [[]],
      embeddings: null, 
      documents: [[]],
      metadatas: [[]],
      distances: null, 
    };

    mockEmbedderPipeline.mockResolvedValue(mockEmbedding);
    mockQuery.mockResolvedValue(mockDbResultsEmpty);

    // Act
    const result = await handler(mockExtra);

    // Assert
    expect(mockQuery).toHaveBeenCalled();
    expect(result.isError).toBeFalsy();
    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe('text');
    expect(result.content[0].text).toBe('No relevant documents found for your query.');
  });

  it('should return an error if the embedding model is not loaded', async () => {
    // Arrange
    mockEmbedder = null;
    handler = createAskFabricDocsHandler({
      log: mockLog,
      chromaClient: mockChromaClient as ChromaClient,
      embedder: mockEmbedder, 
      collectionName: 'mock_collection',
    });
    const mockInput = { query: 'test query', resultCount: 3 };
    const mockExtra = { traceId: 'test-trace-789', input: mockInput }; 

    // Act
    const result = await handler(mockExtra);

    // Assert
    expect(mockLog.error).toHaveBeenCalledWith('Embedding model not loaded yet.');
    expect(result.isError).toBe(true);
    expect(result.content).toHaveLength(1);
    expect(result.content[0].type).toBe('text');
    expect(result.content[0].text).toContain('Embedding model is not ready');
    expect(mockEmbedderPipeline).not.toHaveBeenCalled();
    expect(mockQuery).not.toHaveBeenCalled();
  });

  it('should handle errors during embedding generation', async () => {
    // Arrange
    const mockInput = { query: 'error query', resultCount: 2 };
    const mockExtra = { traceId: 'test-trace-err-embed', input: mockInput };
    const embedError = new Error('Embedding failed');
    mockEmbedderPipeline.mockRejectedValue(embedError);

    // Act
    const result = await handler(mockExtra);

    // Assert
    expect(mockLog.error).toHaveBeenCalledWith({ error: embedError, query: 'error query' }, expect.stringContaining('Error executing RAG pipeline'));
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('Error during search: Embedding failed');
    expect(mockQuery).not.toHaveBeenCalled();
  });

  it('should handle errors during ChromaDB query', async () => {
    // Arrange
    const mockInput = { query: 'db error query', resultCount: 4 };
    const mockExtra = { traceId: 'test-trace-err-db', input: mockInput };
    const mockEmbedding = { data: new Float32Array([0.7, 0.8, 0.9]) };
    const dbError = new Error('DB connection failed');
    mockEmbedderPipeline.mockResolvedValue(mockEmbedding);
    mockQuery.mockRejectedValue(dbError);

    // Act
    const result = await handler(mockExtra);

    // Assert
    expect(mockLog.error).toHaveBeenCalledWith({ error: dbError, query: 'db error query' }, expect.stringContaining('Error executing RAG pipeline'));
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('Error during search: DB connection failed');
  });
  
  it('should return an error if the input is invalid (internal check)', async () => {
    // Arrange
    const invalidExtra = { traceId: 'test-trace-invalid', input: { query: 123 } };

    // Act
    const result = await handler(invalidExtra);

    // Assert
    expect(mockLog.error).toHaveBeenCalledWith({ receivedExtra: invalidExtra }, 'Failed to extract valid input from handler parameter');
    expect(result.isError).toBe(true);
    expect(result.content[0].text).toContain('Invalid input received');
    expect(mockEmbedderPipeline).not.toHaveBeenCalled();
    expect(mockQuery).not.toHaveBeenCalled();
  });
}); 