// src/tools/askFabricDocsTool.ts
import { z } from 'zod';
import type { TextContent } from '@modelcontextprotocol/sdk/types.js';
// --- Pinecone Imports ---
import { type Index, type PineconeRecord, type RecordMetadata, type QueryResponse } from '@pinecone-database/pinecone';
// Remove ChromaDB imports
// import { type ChromaClient, type Collection, IncludeEnum } from 'chromadb';
import type { Pipeline, FeatureExtractionPipeline } from '@xenova/transformers';

// --- Define DocMetadata Interface (Matches indexDocs.ts) ---
// Restore extending RecordMetadata for compatibility with Index<T>
// Export the interface
export interface DocMetadata extends RecordMetadata {
    doc_id: string;
    title: string;
    area: string;
    tags: string[];
    // Define as string to match RecordMetadataValue. Handle potential absence during access.
    lastUpdated: string;
    filePath: string;
    chunkId: string;
    section: string;
    textContent: string;
}


// Schema remains the same
export const askFabricDocsSchema = z.object({
  query: z.string().describe('The natural language question or topic to search for in Fabric UX docs.'),
  resultCount: z.number().int().positive().optional().default(8).describe('The maximum number of relevant document chunks to return.'),
}).describe('Queries the indexed Fabric UX documentation using semantic search.');

// Type for the handler's dependencies - Updated for Pinecone
interface AskFabricDocsDeps {
  log: {
      info: (...args: unknown[]) => void;
      warn: (...args: unknown[]) => void;
      error: (...args: unknown[]) => void;
  };
  // Use the specific index type with our corrected DocMetadata
  pineconeIndex: Index<DocMetadata>;
  getEmbedder: () => FeatureExtractionPipeline | null;
}

// Define the handler function - Accepts updated dependencies
export function createAskFabricDocsHandler(deps: AskFabricDocsDeps) {
  // Destructure updated dependencies
  const { log, pineconeIndex, getEmbedder } = deps;

  // The actual handler function
  // biome-ignore lint/suspicious/noExplicitAny: extra param type from SDK
  return async (args: z.infer<typeof askFabricDocsSchema>, extra: any): Promise<{ content: TextContent[]; isError?: boolean }> => {
    const { query, resultCount } = args;

    log.info({ toolInput: args, traceId: extra?.traceId }, 'askFabricDocs tool called');

    const currentEmbedder = getEmbedder();
    if (!currentEmbedder) {
        log.error('Embedding model not loaded yet.');
        const errorContent: TextContent[] = [{ type: 'text', text: 'Embedding model is not ready. Please try again later.' }];
        return { content: errorContent, isError: true };
    }

    try {
      log.info({ query }, 'Generating query embedding...');
      const queryEmbedding = await currentEmbedder(query, { pooling: 'mean', normalize: true });
      const queryVector = Array.from(queryEmbedding.data as Float32Array);
      log.info('Query embedding generated.');

      log.info({ topK: resultCount }, 'Querying Pinecone index...');

      // Query Pinecone
      const results: QueryResponse<DocMetadata> = await pineconeIndex.query({
          vector: queryVector,
          topK: resultCount,
          includeMetadata: true, // Ensure metadata is included
          // includeValues: false // Typically don't need vector values back
      });
      log.info({ count: results.matches?.length ?? 0 }, 'Pinecone query complete.');

      const matches = results.matches ?? [];

      // Process Pinecone results
      const content: TextContent[] = matches.map((match): TextContent => {
          const metadata = match.metadata; // Metadata is already typed as DocMetadata | undefined
          const score = match.score ?? 0; // Pinecone score (cosine similarity)

          // Construct the text using metadata fields defined in DocMetadata
          // Use optional chaining and defaults for robustness
          const filePath = metadata?.filePath ?? 'Unknown Path';
          const section = metadata?.section ?? 'Unknown Section';
          const title = metadata?.title ?? 'Unknown Title';
          const docText = metadata?.textContent ?? 'No text content found.'; // Use textContent field

          // Format the output text
          const text = `Title: ${title}\nSource: ${filePath}\nSection: ${section}\nSimilarity: ${score.toFixed(4)}\n\n${docText}`;

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