# Fabric UX System MCP Server Specification and Work Plan

## 1. Introduction

### 1.1. Goal

To create a dedicated, **hosted** Model Context Protocol (MCP) server that acts as an expert source for the Fabric UX System. This server will provide developers using MCP-enabled AI clients (initially focusing on VS Code Copilot Chat Agent Mode, then Cursor once client issues are resolved) with up-to-date information related to Fabric UX by indexing a curated set of RAG-optimized documentation files (`_docs_fabric_ux`). This hosted approach aims for easier adoption and maintenance.

### 1.2. Background

This project adapts the MCP server boilerplate to specifically serve information about the Fabric UX System by indexing the curated documentation in `_docs_fabric_ux` using a Retrieval-Augmented Generation (RAG) approach. The focus is shifting to a hosted model using a **hosted vector database** (Pinecone) and **SSE transport** to improve accessibility and automate updates via CI/CD.

### 1.3. Target audience

Developers using AI clients with MCP support (e.g., Cursor) who are building or maintaining user interfaces and experiences based on the Fabric UX System.

## 2. Specification

### 2.1. Core requirements

- **Language:** TypeScript
- **Framework/SDK:** Utilize the official Anthropic TypeScript MCP SDK.
- **Transport:** Primarily support **Server-Sent Events (SSE) over HTTP** for broader client compatibility.
- **Architecture:** Retrieval-Augmented Generation (RAG).
  - Indexing: Parse, chunk, and create vector embeddings for local documentation files.
  - Retrieval: Use vector similarity search to find relevant document chunks based on user queries.
  - Generation: Rely on the MCP client's AI agent to synthesize answers based on retrieved chunks.
- **Primitives:** Develop MCP primitives focused on RAG:
  - Core Tool: `askFabricDocs(query: string)` - Takes a natural language query, retrieves relevant documentation chunks using vector search, and returns them as context.
  - *Potential Future Primitives: More specific tools leveraging metadata search (e.g., `getComponentAccessibility(componentName: string)`), or Resource/Prompt primitives if supported by clients.*
- **Data Source:** Local, RAG-optimized documentation files (primarily Markdown) located within the `_docs_fabric_ux` directory. These files will also serve as the source for a companion static documentation site.
- **Indexing Engine:** Utilize a **hosted vector database** (Pinecone) populated by an indexing script run via CI/CD.
- **Embedding Model:** Use a suitable sentence transformer model (`@xenova/transformers` running locally during indexing/CI) for creating text embeddings.
- **Configuration:**
  - Primarily via environment variables (especially for API keys, DB URLs, etc.).
  - Secrets managed securely (e.g., GitHub Secrets for CI/CD, Vercel Env Vars).
- **Validation:** Implement input validation for tool arguments using `zod`.
- **Error handling:** Maintain a consistent error handling strategy suitable for a hosted service.
- **Logging:** Utilize structured logging (`pino`), potentially integrating with a logging service for the hosted server.
- **Static Site:** A companion static documentation site built with Astro, sourced from `_docs_fabric_ux` and deployed to GitHub Pages.
- **CI/CD:** Automate indexing, site deployment (GitHub Pages), and server deployment (Vercel) using GitHub Actions.
- **Testing:** Develop tests for indexing, the `askFabricDocs` tool (against hosted DB), and potentially SSE transport.
- **Linting/Formatting:** Maintain Biome integration.

### 2.2. Non-goals (Initial version)

- Support for clients with known SSE implementation issues (e.g., Cursor header/POST bug) beyond basic connection testing.
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

#### 2.3.3. Client SSE Implementation Differences

- **VS Code Header Support:** VS Code Copilot Chat Agent Mode appears to correctly support sending custom headers defined in `mcp.json` for SSE transport, enabling header-based authentication.
- **Cursor Header/POST Issues:** As of Apr 2025, testing indicates that the Cursor client does *not* send custom headers defined in `mcp.json` for SSE transport and incorrectly uses HTTP POST requests after the initial SSE handshake. This prevents its use with this server until the client is fixed. (See Issue #TBD).

## 3. Decisions to be Made

- **Vector Database:** Choose specific hosted vector database provider (e.g., Pinecone, Weaviate, Zilliz, Chroma Cloud, Supabase). Research free tiers, limits, TS clients, performance.
- **MCP Server Hosting:** Choose specific hosting platform for the Node.js/SSE server (e.g., Cloudflare Workers, Vercel Functions, Netlify Functions, Render, Fly.io). Research free tiers, limits, Node.js support, environment variable management, ease of deployment.
- **Server Authentication:** Implement basic server auth via `X-API-Key` header. Verified working with VS Code client. (Required for security).
- **Logging Service:** Evaluate need for and choose a centralized logging service (e.g., Logtail, Axiom, Datadog). Research options and free tiers.

## 4. Development Process Notes

- **Branching Strategy:** Use feature branches for each milestone (e.g., `feat/M1-core-mvp`). Merge to `main` (or `develop`) after completion and code review.
- **Code Reviews:** Each milestone's completion implies a code review before merging the feature branch.
- **Secrets Policy:** Production secrets (API keys, tokens) must *only* reside in the hosting platform's secrets manager (Vercel) and GitHub Actions Secrets. `.env` is for local development overrides only. Document required vars in `.env.example`.
- **Logging:** Add ample, contextual logging during development using the structured logger (`pino`) to aid debugging and understanding.
- **TSDoc:** Add TSDoc comments to exported functions, classes, types, and complex internal logic as code is written, not just at the end.

## 5. Work plan Milestones

*(MVP-First Approach: Functional hosted server for VS Code, track Cursor compatibility)*

| Milestone | Task ID       | Description                                                            | Status    | Notes                                                                                                              |
| :-------- | :------------ | :--------------------------------------------------------------------- | :-------- | :----------------------------------------------------------------------------------------------------------------- |
| **M1**    | **Core Hosted RAG MVP (VS Code Focus)** |                                                        | Done      | *Goal: Basic, functional hosted MCP server (SSE) with header auth, querying Pinecone, compatible with VS Code.* |
|           | M1-TASK-00    | Verify `.gitignore` includes `.env`, `node_modules`, `dist/`, etc.     | Done      | Ensure no secrets or generated files are committed.                                                              |
|           | M1-DECISION-01| **Chosen:** Provision **Pinecone** as hosted vector DB.                | Done      | Use existing account. Free tier suitable for initial phase.                                                      |
|           | M1-DECISION-02| **Chosen:** Setup **Vercel** as server hosting platform.               | Done      | Leverage platform features for deployment, env vars.                                                             |
|           | M1-DECISION-03| **Chosen:** Implement basic server auth via `X-API-Key` header.        | Done      | Server reads `MCP_API_KEY` env var. Auth check **enabled**. Assumed working with VS Code based on docs; Cursor connection fails due to client issues. | 
|           | M1-TASK-01    | Refactor `scripts/indexDocs.ts` for **Pinecone** client & auth         | Done      | Requires Pinecone API key/environment. Handle via env vars.                                                    |
|           | M1-TASK-02    | Update essential config (`.env.example`, `src/config.ts`)            | Done      | Add `PINECONE_API_KEY`, `PINECONE_ENVIRONMENT`, `PINECONE_INDEX_NAME`, `MCP_API_KEY`. |
|           | M1-TASK-03    | **Manually run** `indexDocs.ts` to populate **Pinecone** index         | Done      | Requires M1-TASK-01 complete. Index 'fabric-ux-system' populated.                                                |
|           | M1-TASK-04    | Refactor server (`index.ts`, tools) for **SSE**, **Pinecone**, & **Auth** | Done      | Auth check enabled. Build issues resolved. SSE transport uses standard Node HTTP server integration.             |
|           | M1-TASK-05    | **Manually deploy** server to **Vercel**                                | Done      | Vercel build/deployment successful.                                                                              |
|           | M1-TASK-06    | Basic E2E test: Connect MCP client (VS Code / Cursor)                | Done      | Assumed working with VS Code (requires testing). **Cursor connection confirmed failing (401/404)** due to client header/POST issues. |
|           | M1-TASK-07    | Add M1 notes to `DEVELOPMENT_NOTES.md`                               | Done      | Includes final strategy details, VS Code focus, Cursor limitations, etc.                                           |
| **M2**    | **Automation Basics & Site Foundation** |                                                        |           | *Goal: Automate indexing/deployments (manual trigger), basic static site setup (GitHub Pages). Requires code review.* |
|           | M2-DECISION-01| **Chosen:** Docs will be moved to **`site/src/content/docs`**.         | Decision  | Aligns with Astro Content Collections best practices. Affects M2-TASK-01, M2-TASK-03 path.                     |
|           | M2-TASK-01    | Set up Astro project (`site/`), configure docs collection, basic layout | To Do     | Use `npm create astro@latest site -- --template minimal`. Define collection schema in `site/src/content/config.ts`. |
|           | M2-TASK-02    | Set up GitHub Action: Astro build & deploy to **GitHub Pages**         | To Do     |                                                                                                                    |
|           | M2-TASK-03    | Set up GitHub Action: Run indexing script (use Secrets, manual trigger) | To Do     | Update script to read from `site/src/content/docs`. Include lint/format checks.                                |
|           | M2-TASK-04    | Set up GitHub Action: MCP server build & deploy **to Vercel**          | To Do     | Use Secrets, manual trigger. Include lint/format checks.                                                         |
|           | M2-TASK-05    | Review M1/M2 changes, basic cleanup (e.g., stdio remnants)           | To Do     |                                                                                                                    |
|           | M2-TASK-06    | Add M2 notes to `DEVELOPMENT_NOTES.md`                               | To Do     | Include docs location decision, Astro setup, CI action details.                                                |
| **M3**    | **Production Readiness - Robustness & Structure** |                                                        |           | *Goal: Enhance server reliability, maintainability, observability. Requires code review before merge.*           |
|           | M3-TASK-01    | Implement Health Check endpoint (`/healthz`)                           | To Do     | Check server status & optionally DB connection.                                                                  |
|           | M3-TASK-02    | Improve `indexDocs.ts` robustness (error handling, idempotency)      | To Do     | Handle file errors, ensure safe reruns.                                                                          |
|           | M3-TASK-03    | Implement new tool structure (`src/tools/[toolName]/...`)              | To Do     | Apply to `askFabricDocs`.                                                                                        |
|           | M3-TASK-04    | Define & implement pattern for shared tool dependencies/utilities      | To Do     | E.g., `src/lib/` for shared clients/functions.                                                                 |
|           | M3-DECISION-01| Choose & Integrate Centralized Logging Service (if desired)            | Decision  | See Decisions section.                                                                                             |
|           | M3-TASK-05    | Update CI Actions for **automatic triggering** (optional)              | To Do     | E.g., trigger on docs/code changes.                                                                              |
|           | M3-TASK-06    | Review M3 changes, perform more thorough cleanup                       | To Do     |                                                                                                                    |
|           | M3-TASK-07    | Add M3 notes to `DEVELOPMENT_NOTES.md`                               | To Do     | Include health check details, robustness improvements, tool structure, logging integration.                        |
| **M4**    | **Security, Testing & Documentation** |                                                        |           | *Goal: Secure endpoint, comprehensive testing, final docs, final cleanup. Requires code review before merge.*     |
|           | M4-TASK-04    | Configure Platform-Level **Rate Limiting** on Vercel (IP-based)       | To Do     | Still recommended, though less critical now that auth is enabled.                                                  |
|           | M4-TASK-0X    | Verify Pinecone API Key Permissions (Scoped)                         | To Do     | Ensure key in Vercel has minimum required permissions (query index only?). **Still CRITICAL.**                 |
|           | M4-TASK-01    | Write/Update tests using **mocked DB client**                          | To Do     | Adapt paused `TEST-01`. Focus on mocking Vector DB client.                                                     |
|           | M4-TASK-02    | Perform thorough E2E testing with MCP client (**VS Code**)           | To Do     | Use hosted SSE endpoint with header auth.                                                                        |
|           | M4-TASK-03    | Create platform config files (e.g., `vercel.json`)                     | To Do     | As needed for Vercel deployment (may include rate limit config).                                                |
|           | M4-TASK-05    | Update `README.md`, `mcp-server.plan.md` status                        | To Do     | Reflect hosted setup, SSE, enabled auth, VS Code focus, Cursor issues.                                            |
|           | M4-TASK-06    | Update `CHANGELOG.md`                                                  | To Do     | Document changes since v1.0.0.                                                                                 |
|           | M4-TASK-07    | Final review and cleanup pass across the project                       | To Do     | Includes dependency review (`npm audit`, consider `npm update`).                                                  |

### 5.1. Effort estimation key

- **S:** Small (<= 2 hours)
- **M:** Medium (2-4 hours)
- **L:** Large (4-8 hours)
- **XL:** Extra Large (> 8 hours)

## 6. Future considerations

- **Advanced RAG Enhancements:** Improve retrieval accuracy and relevance beyond the initial implementation.
  - *Chunking Strategy:* Explore semantic chunking, overlapping chunks, or context-aware splitting.
  - *Metadata Filtering:* Extract richer metadata during indexing and implement pre/post-search filtering.
  - *Query Transformation:* Implement query expansion or decomposition.
  - *Re-ranking:* Add a cross-encoder or other re-ranking step after initial retrieval.
  - *Hybrid Search:* Combine vector search with keyword search (e.g., BM25).
  - *Embedding Model Evaluation:* Experiment with different embedding models optimized for technical docs.
- **Optimize Documentation Format for RAG:** (Related to above) Enhance the documentation format itself with structural elements that improve chunking and retrieval.
- **Real-time or more frequent documentation updates.**
- **Integration with specific CI/CD platforms.**
- **Adding more sophisticated AuthN/AuthZ examples if access needs control.**
- **Providing IaC templates (Terraform, etc.).**
- **Developing more complex interactive tools (e.g., code snippet generation based on Fabric UX).**
- Consider more sophisticated config management (e.g., `node-config`) if environment complexity increases.
- Monitor Astro build times in CI/CD for potential optimization needs.

This plan provides a starting point. We can adjust the scope, priorities, and details as needed.
