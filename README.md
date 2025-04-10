# Fabric UX System MCP Server (TypeScript)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Model Context Protocol (MCP) server designed to act as an expert source for the Fabric UX System. It allows MCP-enabled AI clients (like Cursor) to access up-to-date information about Fabric UX components, development practices, design guidelines, and content standards by performing semantic search over local documentation files.

This server uses a **Retrieval-Augmented Generation (RAG)** approach:
1.  **Indexing:** Reads local Fabric UX documentation files (e.g., from `_references/fabric_ux_system`), splits them into meaningful chunks, generates vector embeddings using a local model, and stores them in a local vector database (ChromaDB).
2.  **Retrieval:** When the `askFabricDocs` tool is called, it searches the vector database for documentation chunks semantically similar to the user's query.
3.  **Generation:** The retrieved chunks are returned to the AI client, which uses them as context to generate an informed answer.

## Features

- **TypeScript:** Modern, type-safe JavaScript.
- **MCP SDK:** Uses the official [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk).
- **Local RAG Pipeline:**
  - **Embedding Model:** Local sentence transformers via [`@xenova/transformers`](https://github.com/xenova/transformers.js) (Defaults to `Xenova/all-MiniLM-L6-v2`). Runs offline.
  - **Vector Database:** Local persistence using [`chromadb`](https://github.com/chroma-core/chroma) (via `chromadb` client). Data stored in `./db` by default.
  - **Markdown Parsing:** Uses `unified` / `remark` ecosystem for robust, structure-aware parsing and chunking.
- **Core MCP Tool:**
  - `askFabricDocs(query: string)`: Performs semantic search over the indexed documentation and returns relevant chunks.
- **Stdio Transport:** Focused on `stdio` transport for easy integration with local clients like Cursor.
- **Configurable:** Uses environment variables (`.env` file support) for paths and settings.
- **Structured Logging:** Uses `pino`.
- **Error Handling:** Custom error classes (`src/errors.ts`).
- **Containerization:** Includes a `Dockerfile` (indexing step might need adjustment for container builds).
- **Linting/Formatting:** ESLint and Prettier.
- **Testing:** Setup with Vitest.

## Prerequisites

- Node.js (v18 or later recommended)
- npm (usually included with Node.js)
- Git (for cloning and getting updates)
- Python (Required by `chromadb` for its backend server - usually comes pre-installed on Linux/macOS, needs installation on Windows)

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd <repository-name> # e.g., mcp-fabric-ux-system
    ```

2.  **Install dependencies:**
    *This installs the MCP server code, embedding libraries, ChromaDB client, etc.* 
    ```bash
    npm install
    ```
    *(Note: `chromadb` might take a moment as it sets up its Python backend.)*

3.  **Configure environment (Optional):**
    - Copy the example environment file:
      ```bash
      cp .env.example .env
      ```
    - Edit the `.env` file if needed (see [Configuration](#configuration)). Default paths usually work.

4.  **Index Documentation:**
    *This is a crucial step! It scans the source documents, generates embeddings, and populates the local vector database (`./db` directory).* 
    ```bash
    npm run index-docs
    ```
    *This might take some time, especially on the first run, as it downloads the embedding model and processes all documents.* 

## Configuration

Configuration is managed via environment variables, loaded from `.env`. Key options:

- `LOG_LEVEL`: Logging level (Default: `info`).
- `NODE_ENV`: Set to `production` for optimized builds/JSON logs (Default: `development`).
- `DOCS_PATH`: Path to the directory containing source documentation files (Default: `_references/fabric_ux_system`).
- `VECTOR_DB_PATH`: Path to store the ChromaDB vector database files (Default: `./db`).
- `EMBEDDING_MODEL_NAME`: Name of the sentence transformer model from Hugging Face Hub (via Xenova) (Default: `Xenova/all-MiniLM-L6-v2`).
- `CHROMA_COLLECTION_NAME`: Name for the collection within ChromaDB (Default: `fabric_ux_docs`).

## Running the Server

**Important:** Ensure you have run `npm run index-docs` at least once before starting the server.

### Development Mode (with Hot-Reload and Pretty Logs)

```bash
npm run dev
```

### Production Mode (Compiled JavaScript)

1.  **Build the TypeScript code:**

    ```bash
    npm run build
    ```

2.  **Run the server:**
    ```bash
    set NODE_ENV=production
    npm start
    ```
    _Logs will be in JSON format._

## Updating Content

To update the information the server uses:

1.  **Get latest source docs:** If documentation is versioned in Git, pull the latest changes:
    ```bash
    git pull origin main # Or relevant branch
    ```
2.  **Re-index the documentation:** This updates the local vector database with the latest content.
    ```bash
    npm run index-docs
    ```
3.  **Restart the server** if it was running.

## Available MCP Tools

- **`askFabricDocs`**
  - **Description:** Queries the indexed Fabric UX documentation using semantic search.
  - **Arguments:**
    - `query` (string, required): The natural language question or topic to search for.
    - `resultCount` (number, optional, default: 3): The maximum number of relevant document chunks to return.
  - **Returns:** An array of objects, each containing:
    - `text`: The content of the relevant document chunk.
    - `metadata`: Information about the chunk's source (e.g., `filePath`, `heading`).
    - `score`: A similarity score (lower is better for ChromaDB's default L2 distance).

## Extending the Boilerplate

*(This section focuses on the RAG implementation)*

1.  **Modify Chunking:** Improve the logic in `scripts/indexDocs.ts` (specifically how `unified` is used to parse and split Markdown into chunks).
2.  **Add Metadata:** Extract more metadata during indexing (e.g., using `remark-frontmatter`) and store it in ChromaDB to enable filtered searches.
3.  **Create Filtered Tools:** Add new MCP tools that query `chromadb` using metadata filters (e.g., `getComponentExamples(componentName: string)`).
4.  **Change Embedding Model:** Update `EMBEDDING_MODEL_NAME` in `.env` and re-run `npm run index-docs`.
5.  **Tune Search:** Adjust the `resultCount` or explore different search parameters in the `askFabricDocs` tool handler.

## MCP Tool Invocation

When working with MCP tools, it's important to understand how they're invoked:

1. **AI Tool Invocation:** MCP tools are designed to be called by the AI assistant, not directly by users. The AI can call tools directly using their prefixed name.

2. **Tool Naming:**

   - Register tools with simple names (e.g., "add")
   - The AI will see tools with prefixed names (e.g., "mcp_mcp_minimal_add")
   - Do not register tools with prefixed names, as this creates duplication

3. **Logging Considerations:**

   - When running in stdio mode, all logging must go to stderr, never stdout
   - Stdout is strictly reserved for JSON-RPC messages
   - Using console.log() will break the JSON-RPC protocol - use a custom logger that writes to stderr

4. **User Interface:**
   - Users cannot directly invoke MCP tools in the chat interface
   - The AI assistant acts as the intermediary to invoke tools on behalf of the user

## Client Configuration Examples

Here are examples of how to configure a client like Cursor to connect to this server.

### Connecting via Stdio (Recommended)

1.  Ensure you have run `npm run build` and `npm run index-docs`.
2.  Add/ensure the `start:stdio` script exists in `package.json`:
    ```json
    "scripts": {
      // ... other scripts
      "start:stdio": "cross-env NODE_ENV=production node dist/index.js --stdio"
    }
    ```
3.  Install `cross-env`: `npm install --save-dev cross-env`.
4.  Configure the server in `mcp.json` (e.g., `C:\Users\<username>\.cursor\mcp.json`):

    ```json
    {
      "mcpServers": {
        "mcp_fabricux": {
          "displayName": "Fabric UX System",
          "command": "node",
          "args": [
            "C:\\path\\to\\your\\project\\dist\\index.js", // Use YOUR absolute path
            "--stdio"
          ],
          "env": {
            "NODE_ENV": "production"
            // Optionally set other ENV VARS like DOCS_PATH if not default
          },
          "enabled": true
        }
      }
    }
    ```

    - **Important:** Replace the path in `args` with the correct **absolute path** to `dist/index.js` in your project. Use double backslashes (`\\`) on Windows.

## Basic Security Considerations

- **Input Validation:** Zod schemas validate tool inputs.
- **Source Data:** Be aware of any sensitive information within the source documentation being indexed.
- **Dependencies:** Regularly audit dependencies (`npm audit`).
- **Error Handling:** Avoid leaking excessive detail in errors.

## Testing

- Run tests using Vitest: `npm test`
- *(Tests for indexing and the `askFabricDocs` tool need to be added)*

## Linting and Formatting

- Check formatting: `npm run format`
- Apply formatting: `npm run format:fix`
- Run linter: `npm run lint`
- Fix linter errors: `npm run lint:fix`

## Limitations

- **Local Execution:** This server is designed to run locally. Updates require manual re-indexing.
- **Indexing Time:** Initial indexing can take time depending on documentation size and machine specs.
- **AI Model Compatibility:** The ability for the Cursor AI agent to automatically use or be prompted to use custom MCP tools can be **model-dependent**. Some models may have difficulty initiating calls to dynamically discovered tools even if they are listed correctly in the settings. Testing with different AI models within Cursor may be necessary if you encounter issues with AI tool invocation.
- **Tool Quantity:** Some MCP servers, or user's with many MCP servers active, may have many tools available for Cursor to use. Currently, Cursor will only send the first 40 tools to the Agent.
- **Remote Development:** Cursor directly communicates with MCP servers from your local machine, either directly through `stdio` or via the network using `sse`. Therefore, MCP servers may not work properly when accessing Cursor over SSH or other development environments. We are hoping to improve this in future releases.
- **MCP Features Support:** MCP servers offer three main capabilities: tools, resources, and prompts. Currently, Cursor only supports tools. Resources and prompts are defined in the protocol and implemented in this server, but are not yet accessible through Cursor. We are hoping to see support for these additional capabilities in future Cursor releases.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
