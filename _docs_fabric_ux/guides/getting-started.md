---
title: "Getting Started with Fabric UX System"
id: "guide.getting-started"
area: "guides"
tags: ["getting-started", "guide", "setup", "installation", "usage", "fabric-ux"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Getting Started with Fabric UX System

This guide provides practical steps for both designers and developers to begin using the Fabric UX System in their workflows.

Fabric UX System components help build web applications using standards-based Web Components styled with the Microsoft Fabric design language. They are built on W3C standards and `@microsoft/fast-element`, ensuring interoperability with native HTML and modern JavaScript frameworks.

**Key Goals:**

- **Customizable:** Fabric-styled by default, adaptable via [Design Tokens](/concepts/design-tokens).
- **Performant:** Optimized for minimal overhead.
- **Small Bundle Size:** Individual component exports allow fine-grained dependency management.
- **Accessible:** Designed for [WCAG 2.2 AA compliance](/concepts/accessibility).
- **Interoperable:** Framework-agnostic (React, Angular, Vanilla JS, etc.).

## For Designers

Designers use the Fabric UX System to create consistent, accessible, and cohesive user experiences that align with Microsoft Fabric.

### Prerequisites

- Access to Figma ([figma.com](https://figma.com))

### Key Resources

1. **[Fabric UI Kit (Figma)](https://aka.ms/fabricuikit)**: Your primary design tool, including components, styles, variables (tokens), and templates.
2. **[Fabric Visuals Kit (Figma)](https://aka.ms/fabricvisualskit)**: Contains icons, illustrations, and patterns.
3. **[Fluent Iconography (Figma)](https://www.figma.com/community/file/836835755999342788/microsoft-fluent-system-iconography)**: The base icon set.

### Getting Started Steps

1. **Access Figma Kits**: Duplicate the [Fabric UI Kit](https://aka.ms/fabricuikit) and [Fabric Visuals Kit](https://aka.ms/fabricvisualskit) to your workspace.
2. **Explore Resources**: Familiarize yourself with components, styles, variables, icons, etc.
3. **Design**: Use kit components and apply variables (tokens) for colors, type, and spacing.
4. **Follow Guidelines**: Adhere to embedded kit guidelines, plus project-wide [Accessibility](/concepts/accessibility) and [Content Style](/concepts/content-style) guides.
5. **Collaborate**: Share designs and iterate based on feedback.
6. **Handoff**: Document component and token usage clearly for developers.

### Design Best Practices

- Prioritize consistency with Fabric UX.
- Design for accessibility from the start.
- Keep designs simple and user-focused.
- Use provided components/patterns first.
- Document decisions and token usage.

## For Developers

Developers use Fabric UX System component libraries to implement designs efficiently.

### Prerequisites

- **Node.js**: Version 18 or later recommended.
- **Package Manager**: npm, yarn, or pnpm.
- A project using React, Angular, or Vanilla JS/other frameworks.

### Installation

Install the necessary packages for your framework and for theming:

1.  **Component Package**: Choose the package matching your framework.
    *   **React**: `@fabric-msft/react`
    *   **Angular**: `@fabric-msft/angular`
    *   **Other/No Framework**: `@fabric-msft/web-components`
2.  **Tokens Package**: Needed for applying themes.
    *   `@fabric-msft/tokens`

**Example Installation (using npm):**

```bash
# For React applications
npm install @fabric-msft/react @fabric-msft/tokens

# For Angular applications
npm install @fabric-msft/angular @fabric-msft/tokens

# For other frameworks or vanilla JS
npm install @fabric-msft/web-components @fabric-msft/tokens
```

*(Replace `npm install` with `yarn add` or `pnpm add` if using those package managers)*

**Note on Versions:** While `@latest` or `@beta` might be used during development, always pin to a specific, stable version (e.g., `^1.0.0`) for production builds to ensure stability.

### Applying a Theme

Before using components, apply a theme using the `setTheme` utility.

```javascript
// Placeholder: Replace with actual Fabric UX setTheme import path
import { setTheme } from '@fabric-msft/web-components/theming'; 
// Placeholder: Replace with actual Fabric UX theme import path
import { fabricLightTheme } from '@fabric-msft/tokens';

// Apply the light theme globally (e.g., in your main application entry point)
setTheme(fabricLightTheme);
```

See the [Theming Components](/guides/theming) guide for more details on applying themes to specific sections or switching themes.

### Using Components

Register and use components in your application:

**1. Side Effect Imports (Easiest)**

Import the component file directly. This automatically registers the custom element (e.g., `<fabric-button>`) for use in your HTML/templates.

```javascript
// Example: Import the button component to register <fabric-button>
// Placeholder: Verify actual import path in Fabric UX package
import '@fabric-msft/web-components/button'; 
```

```html
<!-- Now you can use the component -->
<fabric-button appearance="primary">Save</fabric-button>
```

**2. Named Definition Imports (Manual Registration)**

Import the component *definition* and register it manually with the design system registry. This offers more control, especially in complex setups.

```javascript
// Placeholder: Replace with actual Fabric UX DesignSystem/definition imports
import { FabricButtonDefinition, FabricDesignSystem } from '@fabric-msft/web-components/button'; // Example import

// Register the component definition
FabricButtonDefinition.define(FabricDesignSystem.registry);
```

```html
<!-- Now you can use the component -->
<fabric-button appearance="primary">Save</fabric-button>
```

**3. Framework Wrappers (React / Angular)**

If using the React or Angular packages (`@fabric-msft/react` or `@fabric-msft/angular`), import components directly from the package. The wrappers handle registration and provide framework-specific bindings.

```jsx
// React Example
import { FabricButton, FabricTextField } from '@fabric-msft/react';

function MyForm() {
  return (
    <form>
      <FabricTextField label="Username" required />
      <FabricButton appearance="primary" type="submit">Login</FabricButton>
    </form>
  );
}
```

```typescript
// Angular Example (Module Import)
import { FabricButtonModule, FabricTextFieldModule } from '@fabric-msft/angular';

@NgModule({
  imports: [ FabricButtonModule, FabricTextFieldModule ],
  // ...
})
export class MyFeatureModule { }
```
```html
<!-- Angular Example (Template Usage) -->
<form>
  <fabric-text-field label="Username" required></fabric-text-field>
  <fabric-button appearance="primary" type="submit">Login</fabric-button>
</form>
```

### Usage via CDN (Prototyping)

For quick prototyping, components and themes can be loaded via CDN (like unpkg). **Note:** This is generally not recommended for production due to potential performance and stability issues. Always use specific version numbers.

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <!-- Placeholder: Replace with actual Fabric UX CDN URLs and versions -->
  <script type="module" src="https://unpkg.com/@fabric-msft/web-components@1.0.0/dist/web-components.min.js"></script>
  <script type="module" src="https://unpkg.com/@fabric-msft/tokens@1.0.0/dist/index.js"></script> 
</head>
<body>
  <fabric-button>CDN Button</fabric-button>

  <script type="module">
    // Placeholder: Replace with actual Fabric UX setTheme import from CDN bundle
    // import { setTheme } from 'https://unpkg.com/@fabric-msft/web-components@1.0.0/dist/index.js'; 
    // Placeholder: Replace with actual Fabric UX theme import from CDN bundle
    // import { fabricLightTheme } from 'https://unpkg.com/@fabric-msft/tokens@1.0.0/dist/index.js';
    // setTheme(fabricLightTheme);
  </script>
</body>
</html>
```

### Development Best Practices

- Follow component usage guidelines from specific component docs.
- Implement [Accessibility Guidelines](/concepts/accessibility).
- Optimize performance (e.g., use side-effect imports for only needed components).
- Test across browsers and devices.
- Stay updated with package versions.

## Next Steps

- Explore the [Component Library Overview](/components/overview).
- Dive deeper into [Design Tokens](/concepts/design-tokens).
- Learn about [Theming Components](/guides/theming).
- Understand [Styling Components](/guides/styling-components).
- Review the [Architecture Overview](/internals/architecture).
- Browse specific [Component Documentation](/components/) (when available).
