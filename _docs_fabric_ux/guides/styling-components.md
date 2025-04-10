---
title: "Styling Components"
id: "guide.styling-components"
area: "guides"
tags: ["styling", "theming", "css", "customization", "web-components", "fabric-ux"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Styling Components

The Fabric UX System components are built using Web Components and leverage shadow DOM for style encapsulation. This allows for controlled customization while preventing global style conflicts.

## Understanding Shadow DOM and Styling

Shadow DOM creates a boundary between a component's internal structure and the rest of the document (the "light DOM"). Styles defined outside the component generally don't affect elements inside its shadow DOM, and vice versa.

However, Fabric UX components provide specific mechanisms for customization:

1.  **CSS Custom Properties (Design Tokens)**: Components are built using CSS variables that align with [Design Tokens](/concepts/design-tokens). You can override these variables to theme components.
2.  **Inherited CSS Properties**: Certain CSS properties like `color`, `font-family`, and `font-size` naturally inherit from the parent element into the shadow DOM.
3.  **CSS Shadow Parts (`::part`)**: Components expose specific internal elements for styling using the `::part()` pseudo-element.
4.  **Slotted Content Styling (`::slotted`)**: You can style elements that you pass into a component's slots using the `::slotted()` pseudo-element.

## Styling with Design Tokens (CSS Custom Properties)

This is the primary method for theming and applying broad style changes. Components use CSS variables derived from the design token system. By redefining these variables at a higher level in your CSS, you can change the appearance of components.

**Example: Changing the primary button background color**

```css
/* Define a new value for the primary button background token */
:root {
  --fabric-button-primary-background: #005a9e; /* A different shade of blue */
  --fabric-button-primary-background-hover: #004578;
  --fabric-button-primary-background-pressed: #002d57;
}

/* This will affect all <fabric-button appearance="primary"> instances */
```

To discover which tokens a component uses, inspect the component's styles in your browser's developer tools or refer to the specific component's documentation.

**Applying themes:**
You can scope token overrides to specific parts of your application by applying them to a container element instead of `:root`.

```css
.dark-theme {
  --colorNeutralForeground1: #ffffff;
  --colorNeutralBackground1: #201f1e;
  /* ... other dark theme token overrides */
}
```

```html
<div class="dark-theme">
  <!-- Components inside this div will use the dark theme tokens -->
  <fabric-button>Dark Theme Button</fabric-button>
</div>
```

See the [Design Tokens](/concepts/design-tokens) guide for a complete list of available tokens.

## Styling Specific Parts (`::part`)

Components expose specific internal elements as "parts" that you can target with the `::part()` pseudo-element. This allows for more granular styling of component internals without breaking encapsulation.

**Example: Making the button's label bold**

Assume the `<fabric-button>` component exposes its internal label span as `part="label"`.

```css
fabric-button::part(label) {
  font-weight: bold;
  text-decoration: underline;
}
```

**Important:**
- You can only style parts that the component explicitly exposes.
- Check the component's documentation to see which parts are available.
- Overuse of `::part` can make your styles brittle if the component's internal structure changes.

## Styling Slotted Content (`::slotted`)

When you pass your own HTML elements into a component's `<slot>`, you can style those specific elements from outside the component using the `::slotted()` pseudo-element.

**Example: Styling an icon passed into a button**

```html
<fabric-button>
  <span slot="start" class="icon icon-save"></span>
  Save
</fabric-button>
```

```css
/* Style the span element slotted into the 'start' slot of fabric-button */
fabric-button::slotted(span.icon-save) {
  color: green;
  font-size: 1.2em;
  margin-right: var(--spacingHorizontalXS);
}
```

`::slotted()` only targets the top-level elements passed into the slot. It cannot style nested elements within the slotted content.

## Styling Approaches in Frameworks

These fundamental CSS mechanisms work within popular frameworks.

### CSS Modules (React, etc.)

You can use CSS variables and `::part` within CSS Modules.

```css
/* ButtonStyles.module.css */
.customButton::part(label) {
  font-style: italic;
}

.customButton {
  /* Override a token for this specific button instance */
  --fabric-button-primary-background: purple;
}
```

```jsx
import styles from './ButtonStyles.module.css';
import { FabricButton } from '@fabric-msft/react';

function CustomStyledButton() {
  return (
    <FabricButton 
      appearance="primary" 
      className={styles.customButton}
    >
      Custom Style
    </FabricButton>
  );
}
```

### Styled Components (React)

CSS variables can be easily used within styled-components. Styling parts requires targeting the component tag.

```jsx
import styled from 'styled-components';
import { FabricButton } from '@fabric-msft/react';

// Target the component tag and use ::part
const StyledFabricButton = styled(FabricButton)`
  /* Override tokens directly on the instance */
  --fabric-button-primary-border-radius: 10px;

  &::part(label) {
    text-transform: uppercase;
  }
`;

function MyComponent() {
  return (
    <StyledFabricButton appearance="primary">
      Styled Button
    </StyledFabricButton>
  );
}
```

### Angular Component Styles

Angular's component styles are typically scoped. To style component parts or override tokens globally for a component instance, you might need to use `:host` or `:ng-deep` (use with caution) or define global styles.

```css
/* In your component's CSS file */
:host fabric-button::part(label) {
  font-family: 'Courier New', Courier, monospace;
}

:host fabric-button {
  --fabric-button-primary-background: orange;
}

/* Or, less recommended due to potential global scope leakage: */
/* :ng-deep fabric-button::part(label) { ... } */
```

## Best Practices

- **Prefer Design Tokens**: Use CSS Custom Property overrides (Design Tokens) for theming and broad changes. This is the most robust and maintainable approach.
- **Use `::part` Sparingly**: Only use `::part` for specific, targeted overrides that cannot be achieved with tokens. Be aware that changes to the component's internal structure could break these styles.
- **Check Documentation**: Always refer to the specific component's documentation to understand available tokens and exposed parts.
- **Avoid Global Overrides**: Scope your style overrides as much as possible to avoid unintended side effects.
- **Test Thoroughly**: Test your custom styles across different themes (light/dark/high contrast) and component states (hover, focus, disabled).

## Troubleshooting

- **Styles not applying?** Check if you are targeting the correct element, using the correct CSS variable name, or if the part name is correct. Remember shadow DOM boundaries.
- **Specificity issues?** Ensure your selectors are specific enough, but avoid overly complex selectors.
- **High contrast mode issues?** Test specifically in high contrast mode; some styles might need adjustments using media queries (`@media (forced-colors: active)`).

## Learn More

- [Design Tokens](/concepts/design-tokens)
- [Web Components: Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/API/Web_Components/Using_shadow_DOM)
- [CSS Shadow Parts (`::part`)](https://developer.mozilla.org/en-US/docs/Web/CSS/::part)
- [CSS Slotted (`::slotted`)](https://developer.mozilla.org/en-US/docs/Web/CSS/::slotted)
