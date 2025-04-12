// src/tools/askFabricDocsTool.ts
import { z } from 'zod';
import type { TextContent } from '@modelcontextprotocol/sdk/types.js';
import { type ChromaClient, type Collection, IncludeEnum } from 'chromadb';
import type { Pipeline, FeatureExtractionPipeline } from '@xenova/transformers';

// Define the schema separately, exporting it for potential reuse
export const askFabricDocsSchema = z.object({
  query: z.string().describe('The natural language question or topic to search for in Fabric UX docs.'),
  resultCount: z.number().int().positive().optional().default(8).describe('The maximum number of relevant document chunks to return.'),
}).describe('Queries the indexed Fabric UX documentation using semantic search.');

// Type for the handler's dependencies - Use FeatureExtractionPipeline type
interface AskFabricDocsDeps {
  log: { 
      info: (...args: unknown[]) => void;
      warn: (...args: unknown[]) => void;
      error: (...args: unknown[]) => void;
  };
  chromaClient: ChromaClient;
  // Use the more specific type returned by the getter
  getEmbedder: () => FeatureExtractionPipeline | null; 
  collectionName: string;
}

// Define the handler function - Accepts dependencies and returns the actual handler
export function createAskFabricDocsHandler(deps: AskFabricDocsDeps) {
  // Destructure getEmbedder instead of embedder
  const { log, chromaClient, getEmbedder, collectionName } = deps;

  // The actual handler function - Now receives validated args as first param
  // biome-ignore lint/suspicious/noExplicitAny: extra param type from SDK
  return async (args: z.infer<typeof askFabricDocsSchema>, extra: any): Promise<{ content: TextContent[]; isError?: boolean }> => {
    // Args are already validated by the SDK based on the schema shape passed to server.tool()
    // Remove the manual validation:
    // const input = extra.input as z.infer<typeof askFabricDocsSchema>; 
    // if (!input || typeof input.query !== 'string') {
    //     log.error({ receivedExtra: extra }, 'Failed to extract valid input from handler parameter');
    //     const errorContent: TextContent[] = [{ type: 'text', text: 'Invalid input received by tool handler' }];
    //     return { content: errorContent, isError: true };
    // }
    
    // Use args directly
    const { query, resultCount } = args;
    // const resultCount = input.resultCount ?? 5;
    // const { query } = input;

    // Use traceId from extra object if available
    log.info({ toolInput: args, traceId: extra?.traceId }, 'askFabricDocs tool called');

    // Check if embedder is loaded by calling the getter
    const currentEmbedder = getEmbedder();
    if (!currentEmbedder) { // Check the result of the getter
        log.error('Embedding model not loaded yet.');
        const errorContent: TextContent[] = [{ type: 'text', text: 'Embedding model is not ready. Please try again later.' }];
        return { content: errorContent, isError: true };
    }

    try {
      log.info({ query }, 'Generating query embedding...');
      // Use the embedder obtained from the getter
      const queryEmbedding = await currentEmbedder(query, { pooling: 'mean', normalize: true });
      const queryVector = Array.from(queryEmbedding.data as Float32Array);
      log.info('Query embedding generated.');

      log.info({ collection: collectionName, results: resultCount }, 'Querying ChromaDB...');
      // Provide a dummy embedding function to satisfy the type
      const dummyEmbeddingFunction = { generate: async (texts: string[]) => Promise.resolve([]) }; 
      const collection: Collection = await chromaClient.getCollection({ 
          name: collectionName, 
          embeddingFunction: dummyEmbeddingFunction // Add dummy function
      });
      
      const results = await collection.query({
          queryEmbeddings: [queryVector],
          nResults: resultCount,
          // Use IncludeEnum values
          include: [IncludeEnum.Metadatas, IncludeEnum.Documents]
      });
      log.info({ count: results.documents?.[0]?.length ?? 0 }, 'ChromaDB query complete.');

      const documents = results.documents?.[0] ?? [];
      const metadatas = results.metadatas?.[0] ?? [];

      const content: TextContent[] = documents.map((docText, index): TextContent => {
          const metadata = metadatas[index] ?? {};
          const text = `Source: ${metadata.filePath || 'Unknown'}\nSection: ${metadata.heading || 'N/A'}\n\n${docText}`;
          return { type: 'text', text };
      });
      
      if (content.length === 0) {
          content.push({ type: 'text', text: 'No relevant documents found for your query.' });
      }

      return { content };

    } catch (error) {
      log.error({ error, query }, 'Error executing RAG pipeline in askFabricDocs tool');
      const errorMessage = error instanceof Error ? error.message : String(error);
      const errorContent: TextContent[] = [{ type: 'text', text: `Error during search: ${errorMessage}` }];
      return { content: errorContent, isError: true };
    }
  };
} 