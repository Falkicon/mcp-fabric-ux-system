# Architecture Overview

Fluent UI Web Components v3 are built upon `@microsoft/fast-element`, a lightweight library for building standards-compliant web components.

## Core Concepts from `@microsoft/fast-element`

Fluent UI Web Components are built upon the `@microsoft/fast-element` library. Understanding these core concepts from FAST is essential for effectively using and extending Fluent UI components:

*   **`FASTElement`:** The base class for all Fluent UI web components, providing lifecycle management, attribute/property synchronization, and templating capabilities. (See [FASTElement Documentation](https://fast.design/docs/fast-element/fast-element) for detailed API).
*   **HTML Templates (`html` tagged literal):** Used to define the Shadow DOM structure of a component. FAST templates support efficient rendering and data-binding syntax to connect component properties to the view. This includes bindings for text content, attributes, booleans (`?`), events (`@`), and properties (`:`). (See [FAST HTML Templates Documentation](https://fast.design/docs/templates/html-templates) for binding syntax details).
*   **CSS Templates (`css` tagged literal):** Used to define encapsulated styles for a component's Shadow DOM using `adoptedStyleSheets`. Standard CSS features like `:host`, `::part`, and `::slotted` are used for styling the component itself, its internal parts, and slotted content. (See [FAST CSS Templates Documentation](https://fast.design/docs/templates/css-templates) for styling details).
*   **Attributes (`@attr` decorator):** Decorator used to link component properties with HTML attributes, handling reflection and type conversion.
*   **Observables (`@observable` decorator):** Decorator used to make component properties reactive, triggering template updates when their values change.
*   **Directives:** Special template helpers for common scenarios like accessing DOM elements (`ref`), handling slotted content (`slotted`), managing child nodes (`children`), conditional rendering (`when`), and rendering lists (`repeat`). (See [FAST HTML Directives Documentation](https://fast.design/docs/templates/html-directives) for usage details).

<!-- Removed Dependency Injection for now, pending confirmation of relevance -->
<!-- *   **Dependency Injection:** A system for providing dependencies to components (if used significantly). -->

These concepts form the foundation for how Fluent UI components are built and how they function.

## HTML Template Features

*   **Data Binding:** Simple one-way binding using `${x => x.property}`.
*   **Event Binding:** Use `@event` syntax: `<button @click="${x => x.handleClick()}">`.
*   **Boolean Attribute Binding:** Use `?attr="${x => x.booleanProperty}"`: `<button ?disabled="${x => x.isDisabled}">`.
*   **Directives:** Special attributes/functions providing enhanced template capabilities.

## CSS Template Features

*   **`:host`:** Selects the component's host element.
*   **`::part`:** Styles elements exposed via the `part` attribute (e.g., `part="control"`).
*   **`::slotted`:** Styles nodes passed into a `<slot>`.

## Key Directives

Directives control rendering behavior within `html` templates:

*   **`ref('propertyName')`:** Captures a reference to the rendered element, assigning it to `this.propertyName`.
    `<div ${ref('myDivElement')}></div>`
*   **`slotted('propertyName')`:** Collects nodes assigned to a specific slot (or the default slot), assigning them as an array to `this.propertyName`.
    `<slot ${slotted('slottedItems')}></slot>`
*   **`children('propertyName', filter)`:** Collects child elements matching a CSS selector filter, assigning them to `this.propertyName`.
    `<div ${children('items', { filter: ':scope > fluent-item'} )}></div>`
*   **`when(condition, template)`:** Conditionally renders a template.
    `${when(x => x.isLoggedIn, html`<span>Welcome!</span>`)}`
*   **`repeat(items, template, options)`:** Renders a template for each item in an array.
    `${repeat(x => x.data, html`<p>${item => item.text}</p>`)}`

## Component Definition

Components are registered with the `CustomElementRegistry`. The static `compose` method is used to assemble the component definition object (including its base name, template, styles, and options) before registration.

```javascript
import { FluentDesignSystem, MyComponent } from './my-component';
import { template } from './my-component.template.js';
import { styles } from './my-component.styles.js';

export const MyComponentDefinition = MyComponent.compose({
    baseName: 'my-component',
    template,
    styles,
    // ... other options like shadowOptions, elementOptions
});

// Typically done via side-effect import or explicitly:
// MyComponentDefinition.define(FluentDesignSystem.registry);
// (`FluentDesignSystem` provides a common registry, often managing the element prefix like `fluent-`.)
```

## Fluent UI Architectural Patterns

Beyond the core FASTElement features, Fluent UI Web Components employ several common patterns to enhance structure, reusability, and maintainability:

### Component Composition & Orchestration

Many Fluent UI components are designed as compositions where a parent element manages or coordinates the behavior of its children.

*   **Example:** The `fluent-accordion` manages multiple `fluent-accordion-item` children. The parent `fluent-accordion` uses directives like `@slotted` to get references to its child items. It then controls their behavior based on its own properties, such as enforcing the `expandmode="single"` constraint (ensuring only one item is expanded at a time).
*   **Pattern:** Parent components often query their slotted children and iterate over them to apply shared settings or manage interactive states (like selection in a `fluent-radio-group`). This promotes a clear separation of concerns, where the parent handles the overall logic, and the children handle their individual rendering and state.

### Base Classes for Shared Logic

You will frequently find `.base.ts` files within component directories (e.g., `button.base.ts`, `checkbox.base.ts`). These base classes serve several purposes:

*   **Code Reusability:** They encapsulate common logic, properties (often including form-association features via `ElementInternals`), lifecycle callbacks, and methods shared across related components.
*   **Consistency:** Ensure that components within a family (e.g., `fluent-button`, `fluent-anchor-button`, `fluent-toggle-button` all potentially extending `BaseButton`) share a consistent core API and behavior.
*   **Separation of Concerns:** The base class typically handles the core *functionality*, while the final component class that extends it (e.g., `Button.ts`) focuses on adding appearance-specific logic, styling hooks, and template rendering.

Developers extending Fluent UI or building similar components should consider leveraging these patterns for robust and maintainable web components.

This overview covers the foundational aspects. For deeper dives, consult the [`@microsoft/fast-element` documentation](https://www.fast.design/docs/fast-element/overview/) and the source code of existing Fluent UI components.
