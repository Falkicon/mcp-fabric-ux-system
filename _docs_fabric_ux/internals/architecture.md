---
title: "Architecture Overview"
id: "internals.architecture"
area: "internals"
tags: ["architecture", "internals", "fast-element", "web-components", "fabric-ux"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Architecture Overview

<!-- BEGIN-SECTION: Overview -->
Fabric UX System components are built upon `@microsoft/fast-element`, a lightweight library from Microsoft for creating standards-compliant, performant web components. FAST is designed to help efficiently tackle common challenges in website and application development.
<!-- END-SECTION: Overview -->

## The Foundation: Web Components

<!-- BEGIN-SECTION: The Foundation: Web Components -->
FAST itself is built directly on the Web Components v1 standard. Web Components refer to a collection of web standards focused on enabling the creation of custom, reusable, encapsulated HTML elements. Key standards involved include:

*   **Custom Elements:** Defining new HTML tags with associated JavaScript classes.
*   **Shadow DOM:** Encapsulating a component's internal structure and styles, preventing conflicts with the surrounding page.
*   **HTML Templates (`<template>`):** Defining inert chunks of markup to be cloned and used later.

Because Fabric UX components leverage these standards via FAST, they function similarly to native HTML elements, integrate well with various frameworks, and benefit from browser-native performance.
<!-- END-SECTION: The Foundation: Web Components -->

## The Role of `@microsoft/fast-element`

<!-- BEGIN-SECTION: The Role of @microsoft/fast-element -->
While Web Components provide the foundation, `@microsoft/fast-element` adds a layer of convenience and opinion to streamline development. It offers features like:

*   Simplified attribute/property synchronization (`@attr`).
*   Reactive state management (`@observable`).
*   Efficient and expressive HTML templating (`html` tagged literal).
*   Composable and encapsulated CSS styling (`css` tagged literal).
*   Helpful template directives (e.g., `ref`, `slotted`, `when`, `repeat`).

FAST is designed to be lightweight (around 10kb minified/gzipped before tree-shaking, potentially as low as 4.5kb after) and highly tree-shakable, ensuring that only the features you use are included in the final bundle.
<!-- END-SECTION: The Role of @microsoft/fast-element -->

## Core Concepts for Fabric UX Development

<!-- BEGIN-SECTION: Core Concepts for Fabric UX Development -->
Understanding these core concepts from FAST is essential for effectively using and contributing to Fabric UX System components:

- **`FASTElement`:** The base class for all Fabric UX web components, providing lifecycle management, attribute/property synchronization, and templating capabilities. (See [FASTElement Documentation](https://fast.design/docs/fast-element/fast-element)).

- **HTML Templates (`html` tagged literal):** Defines the Shadow DOM structure. FAST templates support efficient rendering and data-binding syntax (`${...}`). (See [FAST HTML Templates Documentation](https://fast.design/docs/templates/html-templates)).

- **CSS Templates (`css` tagged literal):** Defines encapsulated styles using `adoptedStyleSheets`. Standard CSS features like `:host`, `::part`, and `::slotted` are used. (See [FAST CSS Templates Documentation](https://fast.design/docs/templates/css-templates)).

- **Attributes (`@attr` decorator):** Links component properties with HTML attributes, handling reflection and type conversion.

- **Observables (`@observable` decorator):** Makes component properties reactive, triggering template updates on value changes.

- **Directives:** Special template helpers for common scenarios like DOM access (`ref`), slotted content (`slotted`), child node management (`children`), conditional rendering (`when`), and list rendering (`repeat`). (See [FAST HTML Directives Documentation](https://fast.design/docs/templates/html-directives)).

These concepts form the foundation of Fabric UX System components.
<!-- END-SECTION: Core Concepts for Fabric UX Development -->

## HTML Template Features

<!-- BEGIN-SECTION: HTML Template Features -->
- **Data Binding:** One-way binding: `${x => x.property}`.
- **Event Binding:** `@event`: `<button @click="${x => x.handleClick()}">`.
- **Boolean Attribute Binding:** `?attr`: `<button ?disabled="${x => x.isDisabled}">`.
- **Directives:** Enhanced template capabilities (see below).
<!-- END-SECTION: HTML Template Features -->

## CSS Template Features

<!-- BEGIN-SECTION: CSS Template Features -->
- **`:host`:** Selects the component's host element for styling.
- **`::part`:** Styles elements exposed via the `part` attribute (e.g., `part="control"`). See [Styling Components](/guides/styling-components).
- **`::slotted`:** Styles top-level nodes passed into a `<slot>`. See [Styling Components](/guides/styling-components).
<!-- END-SECTION: CSS Template Features -->

## Key Directives

<!-- BEGIN-SECTION: Key Directives -->
Directives control rendering behavior within `html` templates:

- **`ref('propertyName')`:** Captures an element reference onto `this.propertyName`.
  `<div ${ref('myDivElement')}></div>`
- **`slotted('propertyName')`:** Collects nodes assigned to a slot into `this.propertyName` (array).
  `<slot ${slotted('slottedItems')}></slot>`
- **`children('propertyName', filter)`:** Collects child elements matching a CSS selector filter into `this.propertyName`.
  `<div ${children('items', { filter: ':scope > fabric-item'} )}></div>`
- **`when(condition, template)`:** Conditionally renders a template.
  `${when(x => x.isLoggedIn, html`<span>Welcome!</span>`)}`
- **`repeat(items, template, options)`:** Renders a template for each item in an array.
  `${repeat(x => x.data, html`<p>${item => item.text}</p>`)}`
<!-- END-SECTION: Key Directives -->

## Component Definition

<!-- BEGIN-SECTION: Component Definition -->
Components are registered with the `CustomElementRegistry`. The static `compose` method assembles the definition (base name, template, styles, options).

```typescript
// Placeholder: Replace with actual Fabric UX DesignSystem import path
import { FabricDesignSystem } from '@fabric-msft/web-components/design-system';
import { MyComponent } from './my-component'; // Your component class
import { template } from './my-component.template.js';
import { styles } from './my-component.styles.js';

export const MyComponentDefinition = MyComponent.compose({
    baseName: 'my-component', // The registry adds the 'fabric-' prefix
    template,
    styles,
    // ... other options like shadowOptions, elementOptions
});

// Definition is typically done via side-effect import in define.ts
// or explicitly: MyComponentDefinition.define(FabricDesignSystem.registry);
```
<!-- END-SECTION: Component Definition -->

## Fabric UX Architectural Patterns

<!-- BEGIN-SECTION: Fabric UX Architectural Patterns -->
Beyond core FAST features, Fabric UX components use common patterns:

### Component Composition & Orchestration

Parent components often manage or coordinate child components passed via slots.

- **Example:** `<fabric-accordion>` manages multiple `<fabric-accordion-item>` children using `@slotted` to query them and enforce `expandmode` behavior.
- **Pattern:** Parents query slotted children to apply settings or manage state (like selection in `<fabric-radio-group>`).

### Base Classes for Shared Logic

`.base.ts` files (e.g., `button.base.ts`) encapsulate common logic, properties (including form-association via `ElementInternals`), and methods shared across related components (e.g., `<fabric-button>`, `<fabric-anchor-button>`).

- **Benefits:** Code reuse, API consistency, separation of concerns (base handles core function, final class handles appearance/template).

Developers contributing to Fabric UX should leverage these patterns.

This overview covers foundational aspects. For deeper dives, consult the [`@microsoft/fast-element` documentation](https://www.fast.design/docs/fast-element/overview/) and the source code of existing Fabric UX components (Placeholder: Link to Fabric UX repository when available).
<!-- END-SECTION: Fabric UX Architectural Patterns -->
