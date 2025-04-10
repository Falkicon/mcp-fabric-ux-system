# Introduction

Fluent UI Web Components v3 helps build web applications using Web Components styled with the [Fluent Design Language](https://github.com/microsoft/fluentui).

This library provides a set of standards-based components built directly on W3C Web Component standards, without a custom component model. This ensures interoperability with native HTML elements and modern JavaScript frameworks.

**Key Goals:**

*   **Customizable:** Fluent-styled by default, easily adaptable via Design Tokens.
*   **Performant:** Optimized for minimal overhead.
*   **Small Bundle Size:** Individual component exports allow fine-grained dependency management.
*   **Accessible:** Designed for WCAG 2.1 compliance.
*   **Interoperable:** Framework-agnostic.

This documentation focuses on v3 (version 3.x and later). For migration details from v2, see the [Migration Guide](../migration-v2-to-v3.md).

## Core Concepts

Fluent UI Web Components leverage the capabilities of `@microsoft/fast-element` and standard Web Component APIs. Key concepts include:

*   **Custom Elements:** Defining new HTML tags (e.g., `<fluent-button>`).
*   **Shadow DOM:** Encapsulated rendering and styling.
*   **Templates:** Declarative HTML definition (`html` tagged template literal).
*   **Styles:** Encapsulated CSS (`css` tagged template literal).
*   **Design Tokens:** CSS Custom Properties for theming.

Further details on component architecture and building patterns are available in the [Architecture Overview](../concepts/architecture.md).

## Resources

*   [GitHub Repository](https://github.com/microsoft/fluentui/tree/master/packages/web-components)
*   [Report an Issue](https://github.com/Microsoft/fluentui/issues/new/choose)
