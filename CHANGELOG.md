# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Planned
- Implement Hosted Server & Connector (SSE) (`DEPLOY-01`)
- Add Unit/Integration Tests for Indexing (`TEST-01` - Currently Paused)

## [1.0.0] - 2025-04-10 

### Added
- Initial project setup with TypeScript and MCP SDK (`SETUP-01`).
- RAG architecture definition and documentation standards (`DATA-REBUILD-DEFINE`, `DATA-REBUILD-GUIDE`).
- Synthesized documentation content in `_docs_fabric_ux` (`DATA-REBUILD-EXECUTE`).
- Implemented indexing script (`scripts/indexDocs.ts`) using section markers and ChromaDB HTTP client (`IMPL-01`, `DATA-IMPROVE-CHUNKING`).
- Implemented core `askFabricDocs` MCP tool for semantic search (`IMPL-02`).
- Integrated `askFabricDocs` tool into the MCP server (`src/index.ts`) (`IMPL-03`).
- Added unit/integration tests for `askFabricDocs` tool (`TEST-02`).
- Added Biome for linting and formatting (`REFACTOR-01`).
- Comprehensive `README.md` covering setup, usage, and RAG details (`DOCS-01`).
- Initial `mcp-server.plan.md` (`DOCS-02`).

### Changed
- Refactored `src/index.ts` and tool handler for improved testability (`REFACTOR-02`).

### Fixed
- Ensured required frontmatter exists in component documentation (`DATA-UPDATE-FRONTMATTER`).
- Validated RAG pipeline through indexing script runs and MCP Inspector tests (`TEST-03`, `TEST-04`).
