---
title: "Fabric UX Components Overview"
id: "concept.components"
area: "concepts"
tags: ["components", "overview", "web-components", "frameworks", "performance", "documentation"]
lastUpdated: 2025-04-10 # Placeholder date - Update as needed
---

# Fabric UX Components Overview

<!-- BEGIN-SECTION: Overview -->
The Fabric UX System provides a comprehensive set of UI components designed to enable developers to create consistent, accessible, and high-performance user experiences within Microsoft Fabric and related workloads. These components serve as the building blocks for interfaces, ensuring alignment with Microsoft's design language while catering to the specific needs of data-intensive applications.
<!-- END-SECTION: Overview -->

## Technology Foundation: Web Components

<!-- BEGIN-SECTION: Technology Foundation: Web Components -->
Fabric UX System components are built using **Web Components** technology. This standards-based approach offers several key advantages:

*   **Framework Agnostic:** Components work natively in modern browsers and integrate seamlessly with various frameworks like React, Angular, or even vanilla JavaScript.
*   **Integration:** Easily adopt components incrementally into existing codebases without major rewrites.
*   **Resilience:** Components are less susceptible to breaking changes during framework upgrades, as the core functionality relies on stable web standards.
*   **Consistency:** Delivers identical code and behavior to the browser regardless of the consuming framework.
<!-- END-SECTION: Technology Foundation: Web Components -->

## Design Principles

<!-- BEGIN-SECTION: Design Principles -->
All components adhere to the following core principles:

1.  **Consistency:** Maintain uniform behavior, appearance, and interaction patterns across the system.
2.  **Accessibility:** Designed to meet WCAG 2.2 guidelines by default.
3.  **Performance:** Optimized for speed, minimal dependencies, and efficient rendering.
4.  **Flexibility:** Allow customization to meet specific needs while preserving overall consistency.
5.  **Composability:** Designed to be combined effectively to build more complex UI elements and patterns.
<!-- END-SECTION: Design Principles -->

## Performance Benefits

<!-- BEGIN-SECTION: Performance Benefits -->
Leveraging native browser capabilities through Web Components provides significant performance advantages:

*   **Faster Load Times:** More efficient browser parsing and rendering.
*   **Smoother Interactions:** Utilizes the browser's native rendering pipeline.
*   **Lower Memory Usage:** Smaller memory footprint compared to many framework-specific component implementations.
*   **Bundle Size Optimization:** Supports techniques like tree-shaking and code-splitting, allowing applications to load only the necessary component code.
<!-- END-SECTION: Performance Benefits -->

## Framework Compatibility & Integration

<!-- BEGIN-SECTION: Framework Compatibility & Integration -->
The system provides specific support for common frameworks:

*   **React:** Use the `@fabric-msft/react` package for React-friendly wrapper components, primarily beneficial for React versions 18 and earlier. React 19+ has improved native Custom Element support, allowing direct usage of `@fabric-msft/web-components` similar to Angular.
*   **Angular:** Use the standard `@fabric-msft/web-components` package directly. Angular's support for Custom Elements allows seamless integration, typically managed by importing desired component definitions within specific Angular modules or standalone components. See [Integration Guide](/guides/integration).

This Web Component-based architecture simplifies framework upgrades (e.g., React 18 -> 19) as only the thin wrapper layer (for React <=18) may require updates, significantly reducing migration effort compared to traditional framework-specific libraries.
<!-- END-SECTION: Framework Compatibility & Integration -->

## Component Documentation

<!-- BEGIN-SECTION: Component Documentation -->
Each component is thoroughly documented, covering:

*   Usage guidelines (when and how to use)
*   API reference (properties, attributes, events, slots, CSS parts)
*   Accessibility considerations
*   Code examples for implementation
*   Best practices for effective use

Refer to the individual component pages within the `/components` section for detailed information.
<!-- END-SECTION: Component Documentation -->
