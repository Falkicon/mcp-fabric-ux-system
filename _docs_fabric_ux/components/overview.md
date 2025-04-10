---
title: "Component Library Overview"
id: "component.overview"
area: "components"
tags: ["components", "overview", "fabric-ux", "web-components"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Component Library Overview

The Fabric UX System provides a comprehensive set of UI components that enable developers to create consistent, accessible, and high-performance experiences across Microsoft Fabric applications. These components are built on web standards and designed to work seamlessly across different frameworks including React and Angular.

## Component Categories

```
            FABRIC UX COMPONENT LIBRARY
            
┌─────────────────────────────────────────────────────┐
│                                                     │
│  ┌─────────────────────┐   ┌─────────────────────┐  │
│  │   FLUENT UI CORE    │   │   FABRIC-SPECIFIC   │  │
│  │    COMPONENTS       │   │     COMPONENTS      │  │
│  │                     │   │                     │  │
│  │  • Button           │   │  • Multi view       │  │
│  │  • Checkbox         │   │  • SVG icon         │  │
│  │  • Dialog           │   │  • Teaching bubble  │  │
│  │  • Menu             │   │  • Wizard           │  │
│  │  • Tabs             │   │  • Data grid        │  │
│  │  • Text input       │   │  • Item card        │  │
│  │                     │   │                     │  │
│  └─────────────────────┘   └─────────────────────┘  │
│                                                     │
└─────────────────────────────────────────────────────┘
```

The component library is organized into two main categories:

### Fluent UI Core Components

These foundational components form the building blocks of the Fabric UX System:

- **[Accordion](/components/accordion)**: Vertically stacked interactive headings that toggle content display
- **[Button](/components/button)**: Elements that enable users to commit changes or complete tasks
- **[Checkbox](/components/checkbox)**: UI elements for switching between two mutually exclusive options
- **[Dialog](/components/dialog)**: Components that ask users to confirm actions or decisions
- **[Menu](/components/menu)**: Contextual components that display lists of options
- **[Radio](/components/radio)**: Components that let users select one option from multiple choices
- **[Slider](/components/slider)**: Visual indicators of adjustable content and current settings
- **[Spinner](/components/spinner)**: Indicators that provide system feedback during processes
- **[Switch](/components/switch)**: Toggle switches for turning options on or off
- **[Tabs](/components/tabs)**: Containers that hold multiple tabs and display selected content
- **[Text Input](/components/text-input)**: Controls that allow users to enter text

### Fabric-Specific Components

These specialized components extend the core components to meet specific Fabric needs:

- **[Multi View](/components/multi-view)**: Containers that display multiple views with switching capabilities
- **[SVG Icon](/components/svg-icon)**: SVG icons for visual representation of actions or objects
- **[Teaching Bubble](/components/teaching-bubble)**: Callouts that provide contextual information or guidance
- **[Wizard](/components/wizard)**: Step-by-step controls that guide users through processes

Each component is designed with accessibility in mind and follows consistent patterns for properties, events, and styling.

## Component Design Principles

All Fabric UX System components adhere to key design principles:

1. **Consistency**: Components maintain consistent behavior, appearance, and interaction patterns across the system.
2. **Accessibility**: Components are designed to be accessible by default, meeting WCAG 2.2 guidelines.
3. **Performance**: Components are optimized for performance, with minimal dependencies and efficient rendering.
4. **Flexibility**: Components can be customized to meet specific needs while maintaining consistency.
5. **Composability**: Components can be combined to create more complex UI elements and patterns.

## Framework Compatibility

```
         FRAMEWORK COMPATIBILITY
         
┌───────────────────────────────────────────┐
│                                           │
│         FABRIC UX WEB COMPONENTS          │
│                                           │
└───────────┬───────────────┬───────────────┘
            │               │               
            ▼               ▼               ▼
┌───────────────┐  ┌───────────────┐  ┌───────────────┐
│               │  │               │  │               │
│     REACT     │  │    ANGULAR    │  │   VANILLA JS  │
│  APPLICATIONS │  │  APPLICATIONS │  │  APPLICATIONS │
│               │  │               │  │               │
└───────────────┘  └───────────────┘  └───────────────┘
```

The Fabric UX System components are built using web components technology, providing several key advantages:

### Multi-Framework Support

Components work seamlessly with any framework, including React and Angular, or even without a framework. Each framework has dedicated wrapper libraries:

- **React**: `@fabric-msft/react` provides React-friendly component wrappers
- **Angular**: `@fabric-msft/angular` provides Angular modules and directives

Example using a component in React:
```jsx
import { FabricButton } from '@fabric-msft/react';

function MyComponent() {
  return (
    <FabricButton appearance="primary" onClick={handleClick}>
      Click me
    </FabricButton>
  );
}
```

Example using a component in Angular:
```html
<fabric-button appearance="primary" (click)="handleClick()">
  Click me
</fabric-button>
```

### Framework Upgrade Resilience

When updating application frameworks (like React 18 to 19), usually no action is needed to maintain compatibility with Fabric UX System components. Since the components use web standards, they are resistant to breaking changes in framework updates.

This architecture provides significant advantages:
- **Reduced upgrade risk**: Core component functionality is implemented in framework-agnostic Web Components
- **Smaller update surface**: Only the thin wrapper layer needs updates during framework upgrades
- **Stability during transitions**: UI remains stable during framework transitions
- **Simplified testing**: Less regression testing needed after framework upgrades

## Performance Benefits

Fabric UX System components deliver several performance advantages:

- **Faster load times**: Web components are parsed and rendered more efficiently by browsers
- **Smoother interactions**: Components use the browser's native rendering pipeline
- **Lower memory usage**: Smaller memory footprint than framework-specific components
- **Better browser parsing**: Using the browser's native component model improves rendering efficiency
- **Bundle size optimization**: Components can be individually loaded using tree-shaking

The components use several performance optimization techniques:
- Lazy loading
- Tree shaking
- Code splitting
- Efficient rendering that minimizes DOM operations
- Minimal dependencies

## Using Components with Patterns

Components are the building blocks of the [UX patterns](/guides/patterns/overview) used throughout the Fabric UX System. While components themselves serve as standalone UI elements, patterns describe how these components work together to create standardized solutions for common user scenarios.

For example, an [empty state pattern](/guides/patterns/empty-states) might use a combination of text, illustrations, and buttons to create a consistent experience when there's no data to display.

## Getting Started

To start using Fabric UX System components in your application:

1. **Install the appropriate package**:
   ```bash
   # For React applications
   npm install @fabric-msft/react
   
   # For Angular applications
   npm install @fabric-msft/angular
   
   # For vanilla JavaScript applications
   npm install @fabric-msft/web-components
   ```

2. **Import the components**:
   ```js
   // React
   import { FabricButton } from '@fabric-msft/react';
   
   // Angular
   import { FabricButtonModule } from '@fabric-msft/angular';
   
   // Vanilla JS
   import '@fabric-msft/web-components/button';
   ```

3. **Use the components in your application**:
   See individual component documentation for specific usage examples.

## Learn More

Explore detailed documentation for each component, including properties, events, accessibility considerations, and code examples:

- [Fluent UI Core Components](/components/)
- [Fabric-Specific Components](/components/)
- [Framework Integration](/guides/framework-integration)
- [Shared UX Patterns](/guides/patterns/overview)
