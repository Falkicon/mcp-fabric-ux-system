---
title: "Fabric UX Documentation Guide"
id: "internal.documentation-guide" # Using 'internal' as the area for meta-docs
area: "internal"
tags: ["documentation", "guide", "standards", "rag", "frontmatter", "styleguide", "meta"]
lastUpdated: 2024-08-01 # Use today's date
---

# Fabric UX Documentation Guide

This guide provides standards and best practices for creating and maintaining documentation within the `_docs_fabric_ux` directory. Adhering to these guidelines ensures consistency, maintainability, and optimal performance for the Retrieval-Augmented Generation (RAG) capabilities of the Fabric UX MCP server.

## 1. Purpose and Audience

- **Purpose:** To provide comprehensive, accurate, and easily accessible documentation for the Fabric UX System, covering concepts, usage guides, component references, and internal details.
- **Audience:** Primarily developers and designers building experiences with the Fabric UX System. The documentation should cater to various levels of expertise.

## 2. Directory Structure

The `_docs_fabric_ux` directory is organized into the following areas:

- **`/concepts`:** Foundational principles, core ideas, and high-level overviews (e.g., `overview.md`, `design-tokens.md`, `accessibility.md`).
- **`/guides`:** How-to articles, step-by-step tutorials, and practical implementation advice (e.g., `getting-started.md`, `theming.md`, `polyfilling.md`).
- **`/components`:** Detailed reference documentation for individual UI components (e.g., `button.md`, `card.md`, `dialog.md`). Each component should have its own file.
- **`/internals`:** Deeper dives into the architecture, component building, and underlying technologies (e.g., `architecture.md`, `creating-components.md`).
- **`/community`:** (Optional/Future) Information related to contributing, support channels, etc.

## 3. File Format and Frontmatter

All documentation files MUST be Markdown (`.md`). Each file MUST begin with YAML frontmatter containing the following fields:

```yaml
---
title: "Clear and Concise Title" # Sentence case preferred
id: "area.unique-identifier" # e.g., concept.overview, guide.getting-started, component.button
area: "concepts | guides | components | internals | community" # The top-level directory name
tags: ["relevant", "keywords", "lowercase"]
lastUpdated: YYYY-MM-DD # Date of the last significant content update
---
```

- **`title`:** The primary heading for the document.
- **`id`:** A unique identifier, prefixed with the `area`. Used for linking and potential future features.
- **`area`:** Matches the top-level directory the file resides in.
- **`tags`:** Lowercase keywords relevant to the content. Aids search and discovery.
- **`lastUpdated`:** Helps users understand the freshness of the content.

## 4. Content Style and Tone

- **Style:** Follow the principles outlined in the `copywriting-styleguide` rule (e.g., business casual tone, sentence case for titles/headings, active voice).
- **Clarity:** Write clearly and concisely. Avoid jargon where possible or explain it.
- **Code Blocks:** Use appropriate language identifiers for syntax highlighting (e.g., ` ```typescript`, ` ```html`, ` ```css`, ` ```bash`).
- **Links:** Use relative links for connecting documents within `_docs_fabric_ux`. Use full URLs for external resources.

## 5. RAG Optimization Principles

To ensure the documentation works effectively with the RAG system:

- **Structure:** Use semantic headings (`##`, `###`, etc.) to break down content logically.
- **Chunking:** Keep paragraphs focused on a single topic. This helps the indexing process create meaningful chunks.
- **Keywords:** Naturally incorporate relevant keywords (especially those likely to be used in search queries) in headings and text.
- **Explicitness:** Be explicit. Define acronyms or system-specific terms on first use.
- **Atomicity:** While linking is encouraged, try to make sections reasonably self-contained where possible.

## 6. Adding or Updating Documentation

1.  **Identify Location:** Determine the correct `area` (directory) for the new or updated content.
2.  **Create/Modify File:** Create a new `.md` file or edit an existing one.
3.  **Add Frontmatter:** Ensure all required frontmatter fields are present and accurate.
4.  **Write Content:** Follow the style, tone, and RAG optimization guidelines.
5.  **Review:** Proofread for errors and clarity.
6.  **Update Index (If Applicable):** If modifying the structure significantly or tracking progress, update `document.index.md` (though this file's primary use was for the initial rebuild).
7.  **Re-index:** After making changes, run the indexing script (`npm run index-docs` - *once implemented*) to update the vector database for the MCP server.
