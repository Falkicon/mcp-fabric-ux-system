# Creating a Custom Component

This guide outlines the basic steps and patterns for creating a new custom web component consistent with the Fluent UI Web Components v3 architecture, built on `@microsoft/fast-element`.

We'll use a hypothetical `<fluent-counter>` component as an example.

## 1. File Structure

A typical structure for a new component:

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

## 2. Component Class (`counter.ts`)

Define the component's logic and properties.

```typescript
import { FASTElement, attr, observable } from '@microsoft/fast-element';

// Define the base class inheriting from FASTElement
export class Counter extends FASTElement {
    // Attribute-backed property with reflection
    @attr({ mode: 'numeric' }) start: number = 0;

    // Internal reactive state
    @observable count: number = 0;

    // Lifecycle callback
    connectedCallback() {
        super.connectedCallback();
        this.count = this.start; // Initialize count when connected
    }

    // Method to increment the counter
    increment() {
        this.count++;
        this.$emit('change'); // Emit a custom event
    }

    // Method to decrement the counter
    decrement() {
        this.count--;
        this.$emit('change');
    }
}
```

*   **`@attr`**: Links the `start` HTML attribute to the `start` property. `mode: 'numeric'` handles coercion.
*   **`@observable`**: Makes the `count` property reactive. Changes will trigger template updates.
*   **`connectedCallback`**: Standard Custom Element lifecycle hook. `super.connectedCallback()` is important.
*   **Methods**: Define component behavior (`increment`, `decrement`).
*   **`$emit('change')`**: Dispatches a `CustomEvent` named `change` from the component host.

## 3. Template (`counter.template.ts`)

Define the component's Shadow DOM structure.

```typescript
import { html, ref } from '@microsoft/fast-element';
import type { Counter } from './counter';

// Define the template using the html tagged template literal
export const template = html<Counter>`
    <button
        ${ref('decrementButton')}
        aria-label="Decrement" <!-- Always provide accessible labels, especially for icon-only buttons -->
        @click="${x => x.decrement()}"
        part="button decrement-button"
    >
        -
    </button>
    <span part="count" class="count">${x => x.count}</span>
    <button
        aria-label="Increment" <!-- Always provide accessible labels -->
        @click="${x => x.increment()}"
        part="button increment-button"
    >
        +
    </button>
    <slot></slot> <!-- Default slot for user content -->
`;
```

*   **`html<Counter>`**: Provides type context for the template bindings (`x` is typed as `Counter`).
*   **`${x => x.count}`**: Binds the text content of the `<span>` to the `count` property.
*   **`@click="${x => x.increment()}"`**: Binds the button's click event to the `increment` method.
*   **`part="..."`**: Exposes elements for external styling via `::part()`.
*   **`<slot>`**: Allows users to project content into the component's Shadow DOM.
*   **`${ref('decrementButton')}`**: Captures a reference to the decrement button element onto `this.decrementButton` in the component class (if needed).

## 4. Styles (`counter.styles.ts`)

Define the component's encapsulated styles.

```typescript
import { css } from '@microsoft/fast-element';
// Import tokens if needed
// TODO: Verify correct import path for tokens - Removing TODO, path confirmed
import { spacingHorizontalM } from '@fluentui/tokens';
// import { colorNeutralForeground1 } from '@fluentui/tokens';

// Example assuming direct dependency:
// import { FluentDesignSystem } from '@fluentui/web-components/internal';

// If building outside the main repo, you might import a default export:
// TODO: Verify correct import path for FluentDesignSystem - Removing TODO, path confirmed
import { FluentDesignSystem } from '@fluentui/web-components';

import { Counter } from './counter.js';
import { template } from './counter.template.js';
import { styles } from './counter.styles.js';

export const styles = css`
    :host {
        display: inline-flex;
        align-items: center;
        gap: var(--spacingHorizontalM, 8px); /* Use design token with fallback */
        font-family: var(--fontFamilyBase);
        color: var(--colorNeutralForeground1); /* Use design token */
    }

    button {
        /* Basic button styling */
        min-width: 32px;
        min-height: 32px;
        padding: 0;
        border-radius: var(--borderRadiusMedium);
        border: 1px solid var(--colorNeutralStroke1);
        background: var(--colorNeutralBackground1);
        cursor: pointer;
    }

    button:hover {
        background: var(--colorNeutralBackground1Hover);
    }

    .count {
        min-width: 2ch; /* Ensure minimum width for count */
        text-align: center;
        font-variant-numeric: tabular-nums;
    }
`;
```

*   **`:host`**: Styles the component element itself.
*   **Design Tokens**: Use CSS Custom Properties defined by the theme (e.g., `var(--colorNeutralForeground1)`). Provide fallbacks if necessary.
*   Standard CSS applies within the Shadow DOM.

## 5. Definition (`definition.ts`)

Compose the component definition.

```typescript
// Import the registry provider (e.g., FluentDesignSystem) from the installed package
// The exact path may vary based on your project setup.
// Example assuming direct dependency:
// import { FluentDesignSystem } from '@fluentui/web-components/internal';

// If building outside the main repo, you might import a default export:
// TODO: Verify correct import path for FluentDesignSystem - Removing TODO, path confirmed
import { FluentDesignSystem } from '@fluentui/web-components';

import { Counter } from './counter.js';
import { template } from './counter.template.js';
import { styles } from './counter.styles.js';

// Compose the definition
export const CounterDefinition = Counter.compose({
    baseName: 'counter', // Will register as <fluent-counter>
    template,
    styles,
    // Optional: Specify shadow root options
    // shadowOptions: { delegatesFocus: true }
});
```

## 6. Index & Define (`index.ts`, `define.ts`)

Provide convenient exports.

**`index.ts` (Barrel File)**

```typescript
export * from './counter.js';
export * from './counter.template.js';
export * from './counter.styles.js';
export * from './definition.js';
```

**`define.ts` (Side-effect Import)**

```typescript
// Import the registry provider as in definition.ts
// TODO: Verify correct import path for FluentDesignSystem - Removing TODO, path confirmed
import { FluentDesignSystem } from '@fluentui/web-components'; // Example path
import { CounterDefinition } from './definition.js';

CounterDefinition.define(FluentDesignSystem.registry);
```

## 7. Usage

```html
<!-- If using define.ts side-effect import -->
<script type="module" src="./components/counter/define.js"></script>

<fluent-counter start="10"></fluent-counter>
```

Or define manually:

```javascript
import { CounterDefinition, FluentDesignSystem } from './components/counter/index.js';

CounterDefinition.define(FluentDesignSystem.registry);
```

## 8. Accessibility Considerations

Accessibility is crucial for all components. Key considerations include:

*   **Semantic HTML:** Use appropriate native elements where possible (e.g., `<button>`, `<input>`).
*   **ARIA Roles:** Assign the correct ARIA role via `ElementInternals` (`this.elementInternals.role = 'button'`) or directly in the template if necessary. Choose the role that best describes the component's function (e.g., `listbox`, `menuitem`, `dialog`).
*   **ARIA Attributes:** Set relevant ARIA state and property attributes (`aria-checked`, `aria-disabled`, `aria-expanded`, `aria-labelledby`, `aria-describedby`). Use property bindings in the template or `elementInternals.aria*` properties.
*   **Focus Management:** Ensure logical focus order and manage focus appropriately, especially for composite components or dialogs. `delegatesFocus: true` in `shadowOptions` can be helpful.
*   **Keyboard Navigation:** Implement expected keyboard interactions (e.g., arrow keys for menus/lists, Enter/Space for activation).
*   **Accessible Labels:** Provide labels for interactive elements, especially icon-only buttons, using `aria-label` or `aria-labelledby`.

This guide covers the basics. Real-world components often involve more complex state management, form association ([`ElementInternals`](https://developer.mozilla.org/en-US/docs/Web/API/ElementInternals)), more sophisticated styling, and thorough **accessibility implementation**.

## Key FAST Concepts in Action

This example utilizes several core FAST concepts:

*   **`FASTElement`:** The base class providing the component lifecycle.
*   **`@observable`:** Making `count` reactive.
*   **`html` Literal:** Defining the structure with `${}` bindings.
*   **`css` Literal:** Encapsulating styles.
*   **`$emit`:** Dispatching custom events.
*   **`ElementDefinitionContext.define`:** Registering the component.

### Advanced FAST Bindings & Directives (Brief Examples)

While the example above uses basic text binding (`\${}`), FAST offers more:

*   **Boolean Attributes:** `?disabled="\${x => x.isDisabled}"` (Adds/removes the attribute)
*   **Event Handling:** `@click="\${(x, c) => x.handleClick(c.event)}"`
*   **Property Binding:** `:value="\${x => x.inputValue}"` (Sets the JS property, not the attribute)
*   **Conditional Rendering:** `\${when(x => x.showContent, html\`<p>Content</p>\`)}`
*   **List Rendering:** `\${repeat(x => x.items, html\`<li>\${x => x.name}</li>\`)}`
*   **Slot Content:** `<slot \${slotted("slottedItems")}></slot>` (Captures slotted nodes into the `slottedItems` property)

*Refer to the official [FAST HTML Templates](https://fast.design/docs/templates/html-templates) and [FAST HTML Directives](https://fast.design/docs/templates/html-directives) documentation for full details.*

### Decoratorless Definition (Alternative)

If you prefer not to use decorators, FAST allows defining attributes and properties via a static `definition` object on the class. *See the [FAST documentation on working without decorators](https://fast.design/docs/advanced-concepts/working-without-decorators) for this approach.*

## Considerations & Best Practices

*   **FOUC Prevention:** To prevent a "flash of unstyled content" before your component definition is loaded and registered, consider adding this global CSS:
    ```css
    /* Hide elements until they are defined */
    :not(:defined) {
      visibility: hidden;
    }
    ```
*   **Keep Components Focused:** Aim for components with clear, single responsibilities.
*   **Leverage Composition:** Build complex UIs by composing simpler components.
*   **Use Design Tokens:** Rely on `@fluentui/tokens` for consistent styling.

This guide provides a foundational pattern. Real-world components may involve more complex state management, interaction logic, and accessibility considerations.
