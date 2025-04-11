---
title: "Creating Custom Components"
id: "internals.creating-components"
area: "internals"
tags: ["components", "internals", "development", "fast-element", "fabric-ux"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Creating Custom Components

<!-- BEGIN-SECTION: Overview -->
This guide outlines the basic steps and patterns for creating a new custom web component consistent with the Fabric UX System architecture, which is built on `@microsoft/fast-element`.

We'll use a hypothetical `<fabric-counter>` component as an example.
<!-- END-SECTION: Overview -->

## 1. File Structure

<!-- BEGIN-SECTION: 1. File Structure -->
A typical structure for a new component within the Fabric UX System repository:

```
src/
└── components/
    └── counter/
        ├── counter.styles.ts       # Component CSS styles
        ├── counter.template.ts     # Component HTML template
        ├── counter.ts              # Component class logic
        ├── definition.ts           # Component definition export
        ├── index.ts                # Barrel file for component exports
        ├── counter.options.ts      # (Optional) Type definitions for options/variants
        ├── counter.base.ts         # (Optional) Base class if sharing logic with related components
        └── define.ts               # Side-effect import for auto-definition
```
<!-- END-SECTION: 1. File Structure -->

## 2. Component Class (`counter.ts`)

<!-- BEGIN-SECTION: 2. Component Class (`counter.ts`) -->
Define the component's logic and properties using FASTElement.

```typescript
import { FASTElement, attr, observable } from '@microsoft/fast-element';

// Define the base class inheriting from FASTElement
export class FabricCounter extends FASTElement {
    /**
     * The starting value for the counter.
     * Linked to the 'start' HTML attribute.
     * @public
     * @remarks
     * HTML Attribute: start
     */
    @attr({ mode: 'numeric' }) start: number = 0;

    /**
     * The current value of the counter.
     * This is internal reactive state.
     * @public
     */
    @observable count: number = 0;

    // Lifecycle callback - see Lifecycle section below
    connectedCallback() {
        super.connectedCallback(); // IMPORTANT: Always call super
        this.count = this.start; // Initialize count when connected
    }

    // Method to increment the counter
    increment() {
        this.count++;
        // Emit a custom event named 'change' with the new count as detail
        this.$emit('change', this.count);
    }

    // Method to decrement the counter
    decrement() {
        this.count--;
        this.$emit('change', this.count);
    }

    /**
     * Example of an observable property changed callback.
     * This method is automatically called when 'count' changes.
     * @param oldValue - The previous value.
     * @param newValue - The current value.
     */
    protected countChanged(oldValue: number | undefined, newValue: number): void {
        console.log(`Counter changed from ${oldValue} to ${newValue}`);
        // Perform actions based on count change if needed
    }
}
```

- **`FASTElement`**: The required base class for all Fabric UX components.
- **`@attr`**: Links a class property to an HTML attribute. 
    - **Configuration:**
        - `attribute`: Specify a different HTML attribute name (e.g., `{ attribute: 'initial-count' }`). Defaults to lowercase property name.
        - `mode`: Controls reflection behavior.
            - `"reflect"` (Default): Property changes update the attribute, attribute changes update the property.
            - `"boolean"`: For boolean attributes (e.g., `disabled`). Adds/removes the attribute based on truthiness.
            - `"fromView"`: Only updates the property from attribute changes; property changes do not update the attribute.
        - `converter`: An object with `toView(value)` and `fromView(value)` methods for custom string<->type conversions (e.g., for numbers, dates, complex objects stored as JSON strings). FAST provides `booleanConverter`, `nullableBooleanConverter`, `nullableNumberConverter`.
- **`@observable`**: Makes properties reactive. Changes trigger template updates. Use for non-primitive types (objects, arrays) or internal state not reflected as attributes.
    - **Changed Callbacks:** You can define a method named `propertyNameChanged(oldValue, newValue)` which will be automatically called when the `@observable` property changes.
    - **Manual Tracking:** For complex getters/setters, you can manually track changes using `Observable.track(this, 'propertyName')` in the getter and `Observable.notify(this, 'propertyName')` in the setter, instead of using `@observable`.
- **`$emit('event-name', detail?)`**: Dispatches a standard `CustomEvent` from the component host. Ensures the component is connected, sets `bubbles: true` and `composed: true`. Use lowercase event names for framework compatibility. The optional `detail` argument is accessible via `event.detail` in the listener.
<!-- END-SECTION: 2. Component Class (`counter.ts`) -->

## 3. Template (`counter.template.ts`)

<!-- BEGIN-SECTION: 3. Template (`counter.template.ts`) -->
Define the component's Shadow DOM structure using FAST's `html` tagged template literal. This defines the internal DOM and how it binds to the component's state.

```typescript
import { html, ref } from '@microsoft/fast-element';
// Import the component class for type safety in the template
import type { FabricCounter } from './counter';

// Define the template using the html tagged template literal
// Specify the component type <FabricCounter> for type checking bindings
export const template = html<FabricCounter>`
    <button
        ${ref('decrementButton')} <!-- Capture element reference -->
        aria-label="Decrement" <!-- Accessibility -->
        ?disabled="${x => x.count <= 0}" <!-- Boolean attribute binding -->
        @click="${(x, c) => x.decrement()}" <!-- Event binding -->
        part="button decrement-button" <!-- Styling hook -->
    >
        -
    </button>

    <span 
        part="count" 
        class="count" 
        :value="${x => x.count}" <!-- Property binding -->
    >
        ${x => x.count} <!-- Text content binding -->
    </span>

    <button
        aria-label="Increment"
        @click="${x => x.increment()}"
        part="button increment-button"
    >
        +
    </button>

    <!-- Default slot for user-provided content -->
    <slot></slot> 
`;
```

- **`html<FabricCounter>`**: Provides type context (`x` is typed as `FabricCounter`), enabling TypeScript checks for bindings.
- **Binding Syntax:** Uses arrow functions `(x, c) => ...`, where `x` is the component instance and `c` is the execution context (useful in directives like `repeat`).
    - **Text Content:** `${x => x.propertyName}` - Binds property value as text.
    - **Attribute:** `attr-name="${x => x.propertyName}"` - Binds property value as a string attribute. Updates when the property changes.
    - **Boolean Attribute:** `?attr-name="${x => x.booleanProperty}"` - Adds/removes the attribute based on the property's truthiness. Ideal for attributes like `disabled`, `checked`, `readonly`.
    - **Event:** `@event-name="${(x, c) => x.handler(c.event)}"` - Binds a DOM event to a component method. `c.event` provides access to the event object. `preventDefault()` is called automatically unless the handler returns `true`.
    - **Property:** `:property-name="${x => x.propertyName}"` - Binds directly to a DOM element's JavaScript property (not attribute). Useful for properties like `value` on inputs or complex data.
- **Directives:** Special attributes prefixed with `${...}` that provide advanced template logic (see Section 10).
- **`<slot>`**: Standard Web Component slot element. Allows consumers to project their own HTML content into the component's Shadow DOM.

### Modifying Host Attributes from Template

If you need to bind attributes directly to the component's host element (e.g., for ARIA roles or states), you can use a `<template>` element as the root of your `html` template. Bindings placed on this root `<template>` tag will be applied to the host itself.

```typescript
import { html } from '@microsoft/fast-element';
import type { FabricProgress } from './progress'; // Example component

export const template = html<FabricProgress>`
    <template 
        role="progressbar" 
        aria-valuenow="${x => x.value}"
        aria-valuemin="${x => x.min}"
        aria-valuemax="${x => x.max}"
        class="${x => x.indeterminate ? 'indeterminate' : ''}"
    >
        <!-- The actual Shadow DOM structure goes here -->
        <div class="progress-bar" style="width: ${x => x.percentComplete}%"></div>
    </template>
`;
```
In this example, `role`, `aria-*`, and `class` attributes are applied directly to the `<fabric-progress>` host element based on the component's properties.
<!-- END-SECTION: 3. Template (`counter.template.ts`) -->

## 4. Styles (`counter.styles.ts`)

<!-- BEGIN-SECTION: 4. Styles (`counter.styles.ts`) -->
Define the component's encapsulated styles using FAST's `css` template literal and Fabric UX design tokens.

```typescript
import { css } from '@microsoft/fast-element';
// Import design tokens from the Fabric UX tokens package
// Placeholder: Replace with actual Fabric UX token import path
import { spacingHorizontalM, colorNeutralForeground1, fontFamilyBase, borderRadiusMedium, colorNeutralStroke1, colorNeutralBackground1, colorNeutralBackground1Hover } from '@fabric-msft/tokens';

export const styles = css`
    :host {
        display: inline-flex;
        align-items: center;
        gap: var(${spacingHorizontalM}); /* Use design token CSS variable */
        font-family: var(${fontFamilyBase});
        color: var(${colorNeutralForeground1});
    }

    /* Use ::part() to style exposed parts */
    [part="button"] {
        /* Basic button styling using tokens */
        min-width: 32px;
        min-height: 32px;
        padding: 0;
        border-radius: var(${borderRadiusMedium});
        border: 1px solid var(${colorNeutralStroke1});
        background: var(${colorNeutralBackground1});
        cursor: pointer;
        color: inherit; /* Inherit text color from host */
        font-size: inherit; /* Inherit font size from host */
    }

    [part="button"]:hover {
        background: var(${colorNeutralBackground1Hover});
    }

    [part="count"] {
        min-width: 2ch; /* Ensure minimum width */
        text-align: center;
        font-variant-numeric: tabular-nums;
    }
`;
```

- **`:host`**: Styles the component element itself.
- **Design Tokens**: Import tokens and use their corresponding CSS Custom Property names (e.g., `var(${spacingHorizontalM})`).
- **`[part="..."]`**: Selectors target exposed parts for styling.
<!-- END-SECTION: 4. Styles (`counter.styles.ts`) -->

## 5. Definition (`definition.ts`)

<!-- BEGIN-SECTION: 5. Definition (`definition.ts`) -->
Compose the component definition, associating the class, template, and styles. This object is then used to register the component with the browser's `CustomElementRegistry`.

```typescript
// Import the FabricDesignSystem registry provider
// Placeholder: Replace with actual Fabric UX DesignSystem import path
import { FabricDesignSystem } from '@fabric-msft/web-components/design-system';

import { FabricCounter } from './counter.js';
import { template } from './counter.template.js';
import { styles } from './counter.styles.js';

// Compose the definition object
export const FabricCounterDefinition = FabricCounter.compose({
    baseName: 'counter', // Registers as <fabric-counter> via registry prefix
    template,          // The html template definition
    styles,            // The css styles definition (or array)
    
    // --- Optional FASTElement Definition Options ---
    shadowOptions: { 
        // Standard ShadowRootInit options (mode defaults to 'open')
        delegatesFocus: true // Delegates focus to first focusable element in shadow DOM
    },
    elementOptions: {
        // Standard ElementDefinitionOptions for customElements.define()
        // extends: 'button' // Use if extending a built-in element (less common with FASTElement)
    }
});
```

- **`baseName` (Required):** The base name for the custom element tag. The `FabricDesignSystem.registry` will automatically prepend its prefix (e.g., `fabric-`) during the `define` step.
- **`template` (Optional):** The `HTMLTemplateResult` created by the `html` literal.
- **`styles` (Optional):** An `ElementStyles` object created by the `css` literal, or an array containing `ElementStyles`, CSS strings, or `CSSStyleSheet` instances.
- **`shadowOptions` (Optional):** Configuration for the Shadow DOM. Set to `null` to render in Light DOM (not recommended for Fabric UX components). See [MDN ShadowRootInit](https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/ShadowRoot#options).
- **`elementOptions` (Optional):** Options passed to `customElements.define()`, primarily useful if extending built-in elements. See [MDN ElementDefinitionOptions](https://developer.mozilla.org/en-US/docs/Web/API/CustomElementRegistry/define#options).
- **`registry` (Optional in compose):** Can specify a custom registry here, but typically definition uses the registry passed to `.define()` (see next section).
<!-- END-SECTION: 5. Definition (`definition.ts`) -->

## 6. Index & Define (`index.ts`, `define.ts`)

<!-- BEGIN-SECTION: 6. Index & Define (`index.ts`, `define.ts`) -->
Provide convenient exports and a side-effect import for automatic registration. The `define.ts` file is crucial as importing it registers the component.

**`index.ts` (Barrel File)**

```typescript
export * from './counter.js';
export * from './counter.template.js';
export * from './counter.styles.js';
export * from './definition.js';
```

**`define.ts` (Side-effect Import for Auto-Definition)**

```typescript
// Import the FabricDesignSystem registry provider
// Placeholder: Replace with actual Fabric UX DesignSystem import path
import { FabricDesignSystem } from '@fabric-msft/web-components/design-system';
import { FabricCounterDefinition } from './definition.js';

// Define the component in the Fabric design system registry
FabricCounterDefinition.define(FabricDesignSystem.registry);
```
<!-- END-SECTION: 6. Index & Define (`index.ts`, `define.ts`) -->

## 7. Usage

<!-- BEGIN-SECTION: 7. Usage -->
If using the `define.ts` side-effect import in your application setup:

```html
<fabric-counter start="10"></fabric-counter>
```

Or, define manually if needed:

```javascript
// Import the definition and registry
// Placeholder: Replace with actual Fabric UX DesignSystem import path
import { FabricDesignSystem } from '@fabric-msft/web-components/design-system';
import { FabricCounterDefinition } from './components/counter/definition.js'; // Adjust path

// Define manually
FabricCounterDefinition.define(FabricDesignSystem.registry);

// Now you can use <fabric-counter> in your HTML
```
<!-- END-SECTION: 7. Usage -->

## 8. Accessibility Considerations

<!-- BEGIN-SECTION: 8. Accessibility Considerations -->
Accessibility is crucial. Ensure:

- **Semantic HTML:** Use native elements (`<button>`) where appropriate.
- **ARIA Roles:** Use `ElementInternals` (`this.elementInternals.role = '...'`) or template roles.
- **ARIA Attributes:** Set states/properties (`aria-checked`, `aria-disabled`, `aria-label`) via `elementInternals` or template bindings.
- **Focus Management:** Ensure logical focus order, manage focus in composite components, consider `delegatesFocus: true`.
- **Keyboard Navigation:** Implement expected keyboard interactions (Enter/Space, Arrow keys).
- **Accessible Labels:** Provide labels, especially for icon-only controls, using `aria-label` or `aria-labelledby`.
<!-- END-SECTION: 8. Accessibility Considerations -->

## 9. Component Lifecycle

<!-- BEGIN-SECTION: 9. Component Lifecycle -->
`FASTElement` hooks into the standard Web Component lifecycle callbacks. When extending `FASTElement`, you can override these methods, but **always call `super.<methodName>()`** to ensure FAST's internal setup/cleanup runs correctly.

- **`constructor()`:** Runs when the element instance is created. `FASTElement` attaches the Shadow DOM here. Avoid complex logic or DOM access.
- **`connectedCallback()`:** Runs each time the element is inserted into the DOM. 
    - **First connect:** FAST hydrates the HTML template, connects bindings, and adopts styles.
    - Use this for setup requiring DOM access (e.g., adding event listeners, initial measurements). Injected dependencies (DI) are typically available *after* `super.connectedCallback()`.
- **`disconnectedCallback()`:** Runs each time the element is removed from the DOM.
    - FAST disconnects bindings and cleans up resources.
    - Use this for cleanup (e.g., removing event listeners added in `connectedCallback`).
- **`attributeChangedCallback(name, oldValue, newValue)`:** Runs when an *observed* attribute changes. FAST uses this internally for `@attr` synchronization. You rarely need to override this directly; use the `propertyNameChanged` callback for `@attr` or `@observable` properties instead.
- **`adoptedCallback()`:** Runs if the element is moved to a new document (e.g., via `document.adoptNode`). Rare use case.

**Example:**

```typescript
import { FASTElement } from '@microsoft/fast-element';

export class LifecycleDemo extends FASTElement {
    private resizeListener = () => console.log('Resized!');

    constructor() {
        super();
        console.log('Component Constructed');
    }

    connectedCallback() {
        super.connectedCallback(); // Essential!
        console.log('Component Connected to DOM');
        window.addEventListener('resize', this.resizeListener);
    }

    disconnectedCallback() {
        super.disconnectedCallback(); // Recommended, though less critical than connected
        console.log('Component Disconnected from DOM');
        window.removeEventListener('resize', this.resizeListener);
    }
}
```
<!-- END-SECTION: 9. Component Lifecycle -->

## 10. Using FAST Directives

<!-- BEGIN-SECTION: 10. Using FAST Directives -->
Directives are special functions used within `html` templates to handle common, complex scenarios beyond simple binding. They are used like attribute bindings: `${directive(...)}`.

### `ref('propertyName')`

Captures a direct reference to the decorated DOM element onto the specified component property.

```typescript
// In template:
<canvas ${ref('canvasElement')}></canvas>

// In component class:
export class MyCanvas extends FASTElement {
    canvasElement: HTMLCanvasElement;

    connectedCallback() {
        super.connectedCallback();
        // canvasElement is assigned after super.connectedCallback()
        const ctx = this.canvasElement.getContext('2d');
        // ... use context ...
    }
}
```
- Useful for interacting with element APIs directly (e.g., `<video>`, `<canvas>`, focus management).
- The property is assigned during the `connectedCallback`.

### `slotted('propertyName', options?)`

Collects all nodes assigned to a specific `<slot>` into an array property on the component.

```typescript
// In template:
<slot name="items" ${slotted('slottedItems')}></slot>

// In component class:
export class ItemContainer extends FASTElement {
    @observable slottedItems: HTMLElement[]; // Use @observable to react to changes

    slottedItemsChanged(oldValue: HTMLElement[] | undefined, newValue: HTMLElement[]) {
        console.log(`Slotted items changed: ${newValue.length} items`);
        // React to added/removed slotted elements
    }
}
```
- Essential for components that need to inspect or manage their slotted content (e.g., accordions managing items, tab lists managing tabs).
- Use `@observable` and the `propertyNameChanged` callback to react dynamically as slotted content changes.
- Options object can include a `filter` (e.g., `elements('fabric-item')`) to only collect specific elements.

### `children('propertyName', options?)`

Collects child nodes or elements of the decorated element into an array property. Useful for querying Light DOM children or children within the Shadow DOM.

```typescript
// In template (collecting <li> children of <ul>):
<ul ${children({ property: 'listItems', filter: elements('li') })}>
    ${repeat(x => x.data, html`<li>...</li>`)}
</ul>

// In component class:
export class ListComponent extends FASTElement {
    @observable listItems: HTMLLIElement[];

    listItemsChanged(...) { /* React to changes */ }
}
```
- Options include `property` (required), `filter` (function or convenience filters like `elements(selector)`), and MutationObserver options (`subtree`, `childList`, etc.).
- If querying a subtree, a `selector` must be used instead of `filter` for performance.
- Use `@observable` to react to changes.

### `when(condition, templateOrBinding)`

Conditionally renders a block of HTML.

```typescript
// In template:
${when(x => x.isLoading, html`<fabric-spinner></fabric-spinner>`)}
${when(x => x.hasError, html`<div class="error">${x => x.errorMessage}</div>`)}
```
- Renders the template when the condition is truthy, removes it when falsy.
- Can be performance-intensive if used heavily; consider component composition as an alternative.

### `repeat(itemsArray, templateOrBinding, options?)`

Iterates over an array and renders a template for each item.

```typescript
// In template:
<ul>
    ${repeat(x => x.users, html<User>`
        <li>${user => user.name} (@${user => user.id})</li>
    `)}
</ul>

// Example with index access:
${repeat(x => x.data, html<DataItem>`
    <div>Item ${(item, ctx) => ctx.index}: ${item => item.value}</div>
`, { positioning: true })}
```
- The template context (`ctx`) provides access to `index`, `length`, `isFirst`, `isLast`, etc. (requires `options.positioning: true` which has a performance cost).
- Can recycle views for performance (default) or disable recycling (`options.recycle: false`).
- Often better handled by slotting individual child components rather than using `repeat` for complex lists, improving maintainability and performance.

These directives provide powerful tools for building dynamic and interactive Fabric UX components.
<!-- END-SECTION: 10. Using FAST Directives -->

## 11. Advanced Styling with CSS Templates

<!-- BEGIN-SECTION: 11. Advanced Styling with CSS Templates -->
While Section 4 demonstrated the basic use of the `css` tagged literal from `@microsoft/fast-element` to define styles, FAST offers more advanced capabilities for managing and composing styles within your Fabric UX components.

### Style Encapsulation

The styles defined using the `css` helper are automatically encapsulated within the component's Shadow DOM using `adoptedStyleSheets`. This ensures:
- Component styles do not leak out and affect the rest of the page.
- Global page styles do not unintentionally break the component's internal layout or appearance (unless explicitly designed using CSS Custom Properties or `::part`).

### Composing Styles

You can compose multiple style sources together. This is useful for sharing common styles (like resets or base styles) across components.

**Example: Sharing Base Button Styles**

```typescript
// _common/base-button.styles.ts
import { css } from '@microsoft/fast-element';
// Placeholder: Import relevant tokens
import { borderRadiusMedium, colorNeutralStroke1, /* ... */ } from '@fabric-msft/tokens';

export const baseButtonStyles = css`
    :host {
        /* Shared layout and base appearance */
        display: inline-flex;
        align-items: center;
        justify-content: center;
        vertical-align: middle;
        padding: 0 10px; /* Example */
        min-width: 32px;
        min-height: 32px;
        border-radius: var(${borderRadiusMedium});
        border: 1px solid var(${colorNeutralStroke1});
        /* ... other base styles */
    }

    /* Potentially shared internal part styles */
    [part="content"] {
        /* Styles for a common content container part */
    }
`;

// components/fancy-button/fancy-button.styles.ts
import { css } from '@microsoft/fast-element';
import { baseButtonStyles } from '../../_common/base-button.styles.ts';
// Placeholder: Import component-specific tokens
import { colorBrandBackground, colorNeutralForegroundOnBrand, /* ... */ } from '@fabric-msft/tokens';

export const styles = css`
    ${baseButtonStyles} /* Compose the base styles first */

    :host {
        /* Override or add specific styles for FancyButton */
        background: var(${colorBrandBackground});
        color: var(${colorNeutralForegroundOnBrand});
    }

    /* Style specific parts or states for FancyButton */
    [part="icon"] {
        /* Styles for an icon specific to FancyButton */
        margin-inline-end: 8px;
    }
`;
```

The `css` helper recognizes when you embed another `ElementStyles` object (like `baseButtonStyles`) and efficiently reuses the underlying `CSSStyleSheet` instance, improving performance.

### Using Style Arrays

You can also pass an array of style sources to the component definition. This array can contain `ElementStyles` objects (from `css`), raw CSS strings, or `CSSStyleSheet` instances.

```typescript
// components/another-button/definition.ts
import { FabricDesignSystem } from '@fabric-msft/web-components/design-system'; // Placeholder
import { AnotherButton } from './another-button.js';
import { template } from './another-button.template.js';
import { styles as componentStyles } from './another-button.styles.js';
import { baseButtonStyles } from '../../_common/base-button.styles.ts';

const utilityStyles = `
  .visually-hidden {
    position: absolute;
    width: 1px;
    height: 1px;
    margin: -1px;
    padding: 0;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
  }
`;

export const AnotherButtonDefinition = AnotherButton.compose({
    baseName: 'another-button',
    template,
    styles: [ baseButtonStyles, componentStyles, utilityStyles ] // Array of styles
});
```

This allows flexibility in combining shared styles, component-specific styles, and utility CSS strings.

### Key CSS Selectors for Encapsulation

When writing component styles, remember these important selectors:
- **`:host`**: Selects the custom element itself.
- **`::part(name)`**: Styles an internal element explicitly exposed via the `part="name"` attribute. (See [Styling Components Guide](/guides/styling-components)).
- **`::slotted(selector)`**: Styles top-level nodes assigned to a `<slot>`. Note that it only styles the direct children slotted in, not their descendants. (See [Styling Components Guide](/guides/styling-components)).

Leveraging style composition and understanding these selectors helps create maintainable and reusable styles within the Fabric UX System.
<!-- END-SECTION: 11. Advanced Styling with CSS Templates -->

## 12. Key FAST Concepts Used

<!-- BEGIN-SECTION: 12. Key FAST Concepts Used -->
- **`FASTElement`:** Base class.
- **`@observable` / `@attr`:** Reactive properties.
- **`html` Literal:** Structure and data binding.
- **`css` Literal:** Encapsulated styles.
- **`$emit`:** Custom events.
- **`*.compose()`:** Creating the definition.
- **`*.define()`:** Registering the custom element.

*Refer to the official [FAST documentation](https://fast.design/docs/introduction) for more advanced bindings, directives, and concepts.*

### Preventing Flash of Unstyled Content (FOUC)

To prevent users briefly seeing unstyled components before they are fully defined and rendered, add the following global CSS rule to your application:

```css
/* Hide elements until they are defined */
:not(:defined) {
  visibility: hidden;
}
```
This ensures custom elements remain hidden until the browser has processed their definition and applied their initial styles.
<!-- END-SECTION: 12. Key FAST Concepts Used -->
