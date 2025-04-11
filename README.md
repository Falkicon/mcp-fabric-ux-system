# Fabric UX System MCP Server (TypeScript)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A Model Context Protocol (MCP) server designed to act as an expert source for the Fabric UX System. It allows MCP-enabled AI clients (like Cursor) to access up-to-date information about Fabric UX components, development practices, design guidelines, and content standards by performing semantic search over local, RAG-optimized documentation files.

This server uses a **Retrieval-Augmented Generation (RAG)** approach:
1.  **Indexing:** Reads local Fabric UX documentation files from the `_docs_fabric_ux` directory, splits them into meaningful chunks, generates vector embeddings using a local model, and stores them in a vector database (ChromaDB) accessed via a running server.
2.  **Retrieval:** When the `askFabricDocs` tool is called, it searches the vector database for documentation chunks semantically similar to the user's query.
3.  **Generation:** The retrieved chunks are returned to the AI client, which uses them as context to generate an informed answer.

## Features

- **TypeScript:** Modern, type-safe JavaScript.
- **MCP SDK:** Uses the official [`@modelcontextprotocol/sdk`](https://github.com/modelcontextprotocol/typescript-sdk).
- **Local RAG Pipeline:**
  - **Source Data:** RAG-optimized Markdown files in `_docs_fabric_ux`.
  - **Embedding Model:** Local sentence transformers via [`@xenova/transformers`](https://github.com/xenova/transformers.js) (Defaults to `Xenova/all-MiniLM-L6-v2`). Runs offline.
  - **Vector Database Client:** Connects to a running [ChromaDB](https://www.trychroma.com/) server via its HTTP client (`chromadb` library).
  - **Markdown Parsing:** Uses `unified` / `remark` ecosystem for robust, structure-aware parsing and chunking.
- **Core MCP Tool:**
  - `askFabricDocs(query: string)`: Performs semantic search over the indexed documentation and returns relevant chunks.
- **Stdio Transport:** Focused on `stdio` transport for easy integration with local clients like Cursor.
- **Configurable:** Uses environment variables (`.env` file support) for paths, model names, and server URLs.
- **Structured Logging:** Uses `pino`.
- **Error Handling:** Custom error classes (`src/errors.ts`).
- **Containerization:** Includes a `Dockerfile` (note: requires adaptation for indexing or pre-indexed data volume).
- **Linting/Formatting:** Uses [Biome](https://biomejs.dev/) for fast, integrated linting and formatting.
- **Testing:** Setup with Vitest, includes tests for the core tool and indexing script orchestration.

## Prerequisites

- Node.js (v18 or later recommended)
- npm (usually included with Node.js)
- Git (for cloning and getting updates)
- [Docker](https://www.docker.com/products/docker-desktop/) (or another way to run a ChromaDB server instance)

## Setup and Installation

1.  **Clone the repository:**

    ```bash
    git clone <repository-url>
    cd mcp-fabric-ux-system
    ```

2.  **Install dependencies:**
    *This installs the MCP server code, embedding libraries, ChromaDB client, etc.* 
    ```bash
    npm install
    ```

3.  **Configure environment (Optional):**
    - Copy the example environment file:
      ```bash
      # On Windows (Command Prompt)
      copy .env.example .env
      # On macOS/Linux
      # cp .env.example .env 
      ```
    - Edit the `.env` file if needed (see [Configuration](#configuration)). Default paths usually work if running ChromaDB locally.

4.  **Start ChromaDB Server:**
    *The server needs a running ChromaDB instance to connect to. The easiest way is often via Docker.* 
    ```bash
    # Pull the latest ChromaDB image
    docker pull chromadb/chroma 
    
    # Run ChromaDB, exposing port 8000 and mounting a volume for persistence
    # Replace '/path/on/host/to/chroma-data' with an actual path on your machine
    docker run -d -p 8000:8000 -v /path/on/host/to/chroma-data:/chroma/chroma --name chroma_server chromadb/chroma
    ```
    *Ensure Docker Desktop is running. Verify the container is running with `docker ps`.* 
    *If you stop the container (`docker stop chroma_server`), you can restart it later with `docker start chroma_server`.* 

5.  **Index Documentation:**
    *This crucial step scans the source documents in `_docs_fabric_ux`, generates embeddings, and populates the running ChromaDB server.* 
    ```bash
    npm run index-docs
    ```
    *This might take some time, especially on the first run, as it downloads the embedding model and processes all documents.* 

## Configuration

Configuration is managed via environment variables, loaded from `.env`. Key options:

- `LOG_LEVEL`: Logging level (Default: `info`).
- `NODE_ENV`: Set to `production` for optimized builds/JSON logs (Default: `development`).
- `DOCS_PATH`: Path to the directory containing source documentation files (Default: `_docs_fabric_ux`).
- `VECTOR_DB_PATH`: **(Deprecated/Unused)** Path for local ChromaDB files (No longer used as we connect to a server).
- `CHROMA_SERVER_URL`: URL of the running ChromaDB server (Default: `http://127.0.0.1:8000`).
- `EMBEDDING_MODEL_NAME`: Name of the sentence transformer model from Hugging Face Hub (via Xenova) (Default: `Xenova/all-MiniLM-L6-v2`).
- `CHROMA_COLLECTION_NAME`: Name for the collection within ChromaDB (Default: `fabric_ux_docs`).

## Running the Server

**Important:** Ensure you have run `npm run index-docs` at least once *while the ChromaDB server is running* before starting the MCP server.

### Development Mode (with Hot-Reload and Pretty Logs)
*Requires the ChromaDB server to be running.* 
```bash
npm run dev
```

### Production Mode (Compiled JavaScript)
*Requires the ChromaDB server to be running.* 
1.  **Build the TypeScript code:**

    ```bash
    npm run build
    ```

2.  **Run the server:**
    ```bash
    # On Windows (Command Prompt)
    set NODE_ENV=production
    npm start
    # On macOS/Linux
    # NODE_ENV=production npm start
    ```
    _Logs will be in JSON format._

## Updating Content

To update the information the server uses:

1.  **Update source docs:** Make changes within the `_docs_fabric_ux` directory or pull latest changes if versioned in Git.
2.  **Ensure ChromaDB server is running.**
3.  **Re-index the documentation:** This clears the existing collection in ChromaDB and repopulates it with the latest content.
    ```bash
    npm run index-docs
    ```
4.  **Restart the MCP server** if it was running.

## Available MCP Tools

- **`askFabricDocs`**
  - **Description:** Queries the indexed Fabric UX documentation in ChromaDB using semantic search.
  - **Arguments:**
    - `query` (string, required): The natural language question or topic to search for.
    - `resultCount` (number, optional, default: 3): The maximum number of relevant document chunks to return.
  - **Returns:** An array of objects, each containing:
    - `text`: The content of the relevant document chunk.
    - `metadata`: Information about the chunk's source (e.g., `filePath`, `title`, `area`, `chunkId`).
    - `score`: A similarity score (lower is better for ChromaDB's default L2 distance).

## Extending the Boilerplate

*(This section focuses on the RAG implementation)*

1.  **Modify Chunking:** Improve the logic in `scripts/indexDocs.ts` (specifically how `unified` is used to parse and split Markdown into chunks).
2.  **Add Metadata:** Extract more metadata during indexing (e.g., using `remark-frontmatter` or custom logic) and store it in ChromaDB to enable filtered searches.
3.  **Create Filtered Tools:** Add new MCP tools that query `chromadb` using metadata filters (e.g., `getComponentExamples(componentName: string)`).
4.  **Change Embedding Model:** Update `EMBEDDING_MODEL_NAME` in `.env` and re-run `npm run index-docs`.
5.  **Tune Search:** Adjust the `resultCount` or explore different search parameters in the `askFabricDocs` tool handler (`src/tools/askFabricDocs.ts`).
6.  **Change Vector DB:** Modify `scripts/indexDocs.ts` and `src/tools/askFabricDocs.ts` to use a different vector database client (e.g., LanceDB).

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

1.  **Ensure ChromaDB server is running.**
2.  Ensure you have run `npm run build` and `npm run index-docs` successfully.
3.  Ensure the `start:stdio` script exists and is correct in `package.json`:
    ```json
    "scripts": {
      // ... other scripts
      "start:stdio": "cross-env NODE_ENV=production node dist/index.js --stdio"
    }
    ```
    *(If `cross-env` is not installed: `npm install --save-dev cross-env`)* 
4.  Configure the server in Cursor's `mcp.json` (e.g., `C:\Users\<username>\.cursor\mcp.json`):

    ```json
    {
      "mcpServers": {
        "mcp_fabricux": {
          "displayName": "Fabric UX System",
          "command": "npm",
          "args": [
            "run",
            "start:stdio",
            "--prefix",
            "C:\\path\\to\\your\\project" // Use YOUR absolute project path
          ],
          "cwd": "C:\\path\\to\\your\\project", // Use YOUR absolute project path
          "env": {
            "NODE_ENV": "production"
            // Optionally override CHROMA_SERVER_URL etc. if needed
          },
          "enabled": true
        }
      }
    }
    ```

    - **Important:** Replace `C:\path\to\your\project` with the correct **absolute path** to this project directory. Use double backslashes (`\\`) on Windows.
    - This configuration uses `npm run start:stdio` which correctly sets `NODE_ENV` via `cross-env` and runs the compiled code with the `--stdio` flag.

## Basic Security Considerations

- **Input Validation:** Zod schemas validate tool inputs.
- **Source Data:** Be aware of any sensitive information within the source documentation (`_docs_fabric_ux`) being indexed.
- **ChromaDB Access:** If ChromaDB is exposed beyond localhost, ensure appropriate network security/authentication.
- **Dependencies:** Regularly audit dependencies (`npm audit`).
- **Error Handling:** Avoid leaking excessive detail in errors.

## Testing

- Run tests using Vitest: `npm test`
- Tests cover the `askFabricDocs` tool and the orchestration logic of the indexing script (`main` function).

## Linting and Formatting

- Check formatting & linting: `npm run format` & `npm run lint`
- Apply fixes: `npm run format:fix` & `npm run lint:fix`
- Uses Biome.

## Limitations

- **Local Execution & Setup:** This server is designed to run locally, requiring manual setup of a ChromaDB server and manual re-indexing for updates.
- **Indexing Time:** Initial indexing can take time depending on documentation size and machine specs.
- **AI Model Compatibility:** The ability for the Cursor AI agent to automatically use or be prompted to use custom MCP tools can be **model-dependent**. Some models may have difficulty initiating calls to dynamically discovered tools even if they are listed correctly in the settings. Testing with different AI models within Cursor may be necessary if you encounter issues with AI tool invocation.
- **Tool Quantity:** Some MCP servers, or user's with many MCP servers active, may have many tools available for Cursor to use. Currently, Cursor will only send the first 40 tools to the Agent.
- **Remote Development:** Cursor directly communicates with MCP servers from your local machine, either directly through `stdio` or via the network using `sse`. Therefore, MCP servers may not work properly when accessing Cursor over SSH or other development environments. We are hoping to improve this in future releases.
- **MCP Features Support:** MCP servers offer three main capabilities: tools, resources, and prompts. Currently, Cursor only supports tools. Resources and prompts are defined in the protocol and implemented in this server, but are not yet accessible through Cursor. We are hoping to see support for these additional capabilities in future Cursor releases.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
