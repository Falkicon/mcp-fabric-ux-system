## Milestone 1: Core Hosted RAG MVP (VS Code Focus)

**Date Completed:** 2025-04-12

**Goal:** Establish a basic, functional hosted MCP server using SSE transport, querying a hosted Pinecone vector database, with API key authentication.

**Key Decisions & Outcomes:**

*   **Vector DB:** Chose **Pinecone** (existing free tier). Provisioned index `fabric-ux-system` (384 dims, cosine metric).
*   **Hosting:** Chose **Vercel** Serverless Functions for hosting the Node.js server.
*   **Transport:** Chose **SSE (Server-Sent Events)** for network accessibility.
*   **Authentication:** Implemented **`X-API-Key` header authentication**, reading the expected key from the `MCP_API_KEY` environment variable on Vercel.
*   **Indexing:**
    *   Refactored `scripts/indexDocs.ts` for Pinecone and successfully populated the index manually.
    *   **Process:** Ran `npm run index-docs`. Requires environment variables for Pinecone credentials (`PINECONE_API_KEY`, `PINECONE_ENVIRONMENT`, `PINECONE_INDEX_NAME`), typically set via `.env` for local execution.
*   **Deployment:**
    *   Server deployed manually to Vercel.
    *   **Process:** Used standard Vercel deployment methods (e.g., Vercel CLI `vercel --prod` or Git integration triggering a build).
*   **Build/Runtime Issues Resolved:**
    *   Overcame Vercel build issues related to TypeScript module resolution (`TS2307`) by switching `tsconfig.json` to `"moduleResolution": "NodeNext"` and using **deep imports** for the `@modelcontextprotocol/sdk` (e.g., `.../server/mcp.js`, `.../server/sse.js`).
    *   Resolved Vercel environment variable loading issues by reading `process.env.MCP_API_KEY` directly within the request handler instead of relying solely on the initially loaded config module value.
*   **Local Execution (Development/Testing):** Server run locally using `npm run dev` (hot-reload) or `npm run build` then `npm start` (production mode), requiring access to Pinecone (via `.env`).
*   **Client Compatibility Findings:**
    *   **Cursor:** Extensive testing revealed that the Cursor client (as of Apr 2025) **does not send custom headers** defined in `mcp.json` when using SSE transport. It also incorrectly attempts **HTTP POST requests** after the initial SSE handshake. This prevents successful authenticated connections and tool usage with Cursor for this server configuration.
    *   **VS Code:** Based on VS Code documentation, it *should* support sending headers with SSE. The current strategy prioritizes compatibility with VS Code.
*   **Final M1 State:** Server deployed to Vercel with SSE transport and **header authentication enabled**. Connection and tool usage assumed functional with VS Code (pending testing in M4). Connection fails with Cursor due to client-side issues.

**Next Steps Influenced by M1:**

*   Need to perform E2E testing specifically with VS Code (M4-TASK-02).
*   Need to verify Pinecone API key permissions are tightly scoped (M4-TASK-0X).
*   Need to configure Vercel rate limiting as a security measure (M4-TASK-04).
*   Need to submit the drafted issue regarding Cursor's SSE client behavior to the Cursor team (Ref: `cursor-mcp-header-support-issue.issue.md`).
*   Need to update user-facing documentation (`README.md`) to reflect VS Code as the primary supported client for now. 