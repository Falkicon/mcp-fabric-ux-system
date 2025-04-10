# Fabric UX System MCP Server Specification and Work Plan

## 1. Introduction

### 1.1. Goal

To create a dedicated Model Context Protocol (MCP) server that acts as an expert source for the Fabric UX System. This server will provide developers using MCP-enabled AI clients with up-to-date information, guidance, and potentially interactive tools related to Fabric UX design, development, components, and content standards, by indexing a curated set of RAG-optimized documentation files located in the `_docs_fabric_ux` directory.

### 1.2. Background

This project adapts the MCP server boilerplate to specifically serve information about the Fabric UX System by indexing the curated documentation in `_docs_fabric_ux` using a Retrieval-Augmented Generation (RAG) approach. This enables AI agents to provide more accurate and context-aware assistance to developers working within this ecosystem.

### 1.3. Target audience

Developers using AI clients with MCP support (e.g., Cursor) who are building or maintaining user interfaces and experiences based on the Fabric UX System.

## 2. Specification

### 2.1. Core requirements

- **Language:** TypeScript
- **Framework/SDK:** Utilize the official Anthropic TypeScript MCP SDK.
- **Transport:** Primarily support standard input/output (`stdio`) for local client integration (e.g., Cursor).
- **Architecture:** Retrieval-Augmented Generation (RAG).
  - Indexing: Parse, chunk, and create vector embeddings for local documentation files.
  - Retrieval: Use vector similarity search to find relevant document chunks based on user queries.
  - Generation: Rely on the MCP client's AI agent to synthesize answers based on retrieved chunks.
- **Primitives:** Develop MCP primitives focused on RAG:
  - Core Tool: `askFabricDocs(query: string)` - Takes a natural language query, retrieves relevant documentation chunks using vector search, and returns them as context.
  - *Potential Future Primitives: More specific tools leveraging metadata search (e.g., `getComponentAccessibility(componentName: string)`), or Resource/Prompt primitives if supported by clients.* 
- **Data Source:** Local, RAG-optimized documentation files (primarily Markdown) located within the `_docs_fabric_ux` directory. This content will be synthesized and restructured from original sources (like those previously in `_references`).
- **Indexing Engine:** Utilize a local vector database (e.g., ChromaDB, LanceDB) populated by an indexing script.
- **Embedding Model:** Use a suitable sentence transformer model (local or API-based) for creating text embeddings.
- **Configuration:**
  - Primarily via environment variables.
  - Document relevant configuration options (e.g., `DOCS_PATH`, `VECTOR_DB_PATH`, `EMBEDDING_MODEL_NAME`). Example: `DOCS_PATH=_docs_fabric_ux`.
- **Validation:** Implement input validation for tool arguments using `zod`.
- **Error handling:** Maintain a consistent error handling strategy.
- **Logging:** Utilize the existing structured logging mechanism (`pino`).
- **Containerization:** Maintain the `Dockerfile` (potential V2 distribution method, may need adaptation for indexing).
- **Documentation:** Update the `README.md` comprehensively covering the RAG architecture, the indexing process (`npm run index-docs`), setup, usage (`askFabricDocs` tool), and local deployment model.
- **Testing:** Develop tests for the indexing process and the `askFabricDocs` tool.
- **Linting/Formatting:** Maintain ESLint and Prettier integration.

### 2.2. Non-goals (Initial version)

- Hosted deployment (server runs locally).
- Real-time synchronization (indexing is manual/scripted).
- Advanced authentication/authorization.
- Specific cloud deployment templates.
- Complex CI/CD pipeline definitions.
- GUI management tools.
- Database integrations beyond what's needed for caching/indexing the documentation.

### 2.3. Common Issues and Solutions

#### 2.3.1 JSON-RPC Protocol Issues

- **Logging to stdout**: Any non-JSON-RPC messages (like console.log output) sent to stdout will break the stdio transport mechanism. All debugging logs MUST be written to stderr instead.
- **Tool Name Prefixing**: Cursor automatically prefixes tool names for AI assistant calls. For example, if your server is named "mcp_minimal" and you register a tool named "add", the AI will call it as "mcp_mcp_minimal_add".
- **Tool Duplication**: Avoid registering tools with both simple and prefixed names as this creates duplicate entries in the AI's available tools.

#### 2.3.2. MCP Tool Invocation

- **AI vs User**: MCP tools are designed to be called by the AI assistant, not directly by users in chat. Users cannot invoke MCP tools using "@Tool" syntax in the chat interface.
- **Tool Discovery**: The AI automatically discovers registered tools and can call them without user configuration.

## 3. Work plan

*(Refined based on RAG architecture with local files)*

| Task ID | Description                                           | Estimated Effort | Status    | Notes                                                                                                              |
| :------ | :---------------------------------------------------- | :--------------- | :-------- | :----------------------------------------------------------------------------------------------------------------- |
| **SETUP** | **Environment & Dependencies**                        |                  |           |                                                                                                                    |
| SETUP-01| Choose & Add Dependencies (Vector DB, Embeddings Lib) | S                | Done      | `chromadb`, `@xenova/transformers`, `unified`, `remark-parse`, `remark-frontmatter` installed.                       |
| **DATA**  | **Documentation Rebuild (RAG Optimization)**          |                  |           |                                                                                                                    |
| DATA-REBUILD-DEFINE | Define Target Structure & Format for `_docs_fabric_ux` | M                | Done      | Defined in `_docs_fabric_ux/DOCUMENTATION_GUIDE.md`.                                |
| DATA-REBUILD-GUIDE | Create Documentation Standards Guide                  | S                | Done      | Created `_docs_fabric_ux/DOCUMENTATION_GUIDE.md`.                                                  |
| DATA-REBUILD-EXECUTE| Rebuild/Synthesize Docs into `_docs_fabric_ux`    | XL               | Done     | Created new `.md` files based on defined structure/format, using `_references` as source. Depends on DEFINE task. |
| **IMPL**  | **Core Implementation (RAG)**                         |                  |           | *Depends on DATA-REBUILD-EXECUTE*                                                                                  |
| IMPL-01 | Implement Indexing Script (`scripts/indexDocs.ts`)    | L                | Done      | Target `_docs_fabric_ux`. Indexes content into ChromaDB via HTTP. Requires ChromaDB server (e.g., Docker). `npm run index-docs`. |
| IMPL-02 | Implement `askFabricDocs` MCP Tool                  | M                | Done      | Connect to Vector DB (ChromaDB Server), embed query, search, return chunks. Implemented in `src/index.ts`.           |
| IMPL-03 | Integrate Tool into MCP Server (`src/index.ts`)       | S                | Done      | Registered tool via `server.tool()` in `src/index.ts`.                                                            |
| **TEST**  | **Testing**                                           |                  |           | *Depends on IMPL tasks*                                                                                            |
| TEST-01 | Add Unit/Integration Tests for Indexing             | M                | To Do     | Test parsing, chunking, embedding calls, ChromaDB add via server.                                                 |
| TEST-02 | Add Unit/Integration Tests for `askFabricDocs` Tool | M                | To Do     | Test query processing, vector search results via server.                                                           |
| **DOCS**  | **Documentation**                                     |                  |           | *Depends on IMPL tasks*                                                                                            |
| DOCS-01 | Update `README.md` with Setup & Usage Instructions    | M                | To Do     | Cover RAG, `_docs_fabric_ux`, ChromaDB server requirement (Docker), indexing script, `askFabricDocs` tool.        |
| DOCS-02 | Update `mcp-server.plan.md` (Self-updating)           | XS               | Done      | Updated for RAG rebuild plan & ChromaDB server dependency.                                                         |
| **REFACTOR**| **Refactoring & Quality Improvements**                |                  |           |                                                                                                                    |
| REFACTOR-01 | Evaluate & Implement Biome for Linting/Formatting     | M                | To Do     | Consider replacing ESLint/Prettier with Biome for potential speed/simplicity gains.                                |
| **DEPLOY**| **Future Considerations**                             |                  |           |                                                                                                                    |
| DEPLOY-01 | Implement Hosted Server & Connector (SSE)             | XL               | Future    | Support for Copilot Studio etc.                                                                                    |

### 3.1. Effort estimation key

- **S:** Small (<= 2 hours)
- **M:** Medium (2-4 hours)
- **L:** Large (4-8 hours)
- **XL:** Extra Large (> 8 hours)

## 4. Future considerations

- Real-time or more frequent documentation updates.
- Integration with specific CI/CD platforms.
- Adding more sophisticated AuthN/AuthZ examples if access needs control.
- Providing IaC templates (Terraform, etc.).
- Developing more complex interactive tools (e.g., code snippet generation based on Fabric UX).

This plan provides a starting point. We can adjust the scope, priorities, and details as needed.
