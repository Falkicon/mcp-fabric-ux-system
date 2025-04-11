---
title: "Component Library Overview"
id: "component.overview"
area: "components"
tags: ["components", "overview", "fabric-ux", "web-components"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Component Library Overview

<!-- BEGIN-SECTION: Library Introduction -->
The Fabric UX System provides a comprehensive set of UI components that enable developers to create consistent, accessible, and high-performance experiences across Microsoft Fabric applications. These components are built on web standards and designed to work seamlessly across different frameworks including React and Angular.
<!-- END-SECTION: Library Introduction -->

<!-- BEGIN-SECTION: Available Components -->
## Available Components

The Fabric UX System component library includes:

*   **[Accordion](/components/accordion)**: Vertically stacked interactive headings that toggle content display (includes Accordion Item).
*   **[Anchor Button](/components/anchor-button)**: Clickable elements styled as buttons that navigate.
*   **[Avatar](/components/avatar)**: Graphical representations of users, teams, or entities.
*   **[Badge](/components/badge)**: Visual descriptors for UI elements (includes Counter Badge).
*   **[Button](/components/button)**: Elements that enable users to commit changes or complete tasks.
*   **[Checkbox](/components/checkbox)**: UI elements for selecting or deselecting options.
*   **[Compound Button](/components/compound-button)**: Buttons with a primary label and an optional secondary description.
*   **Data Grid**: (Not yet documented) Advanced table/grid component for displaying complex datasets.
*   **[Dialog](/components/dialog)**: Modal windows that prompt users for decisions or confirmations.
*   **[Divider](/components/divider)**: Visual separators to segment groups of content.
*   **[Drawer](/components/drawer)**: Panels that slide in from the edge of the screen (includes Drawer Body).
*   **[Dropdown](/components/dropdown)**: Displays a listbox or combobox for selecting options.
*   **[Field](/components/field)**: Provides layout and labeling structure for form controls.
*   **[Image](/components/image)**: Elements for displaying visual representations.
*   **Item Card**: (Not yet documented) Card-based layout for displaying summary information about an item.
*   **[Label](/components/label)**: Text elements providing names or titles for components or groups.
*   **[Link](/components/link)**: Standard inline hyperlinks.
*   **[Listbox](/components/listbox)**: Internal container for managing listbox options (used by Dropdown, etc.).
*   **[Menu](/components/menu)**: Contextual components displaying lists of options or actions (includes Menu Item, Menu List, Menu Button).
*   **[Message Bar](/components/message-bar)**: Displays inline messages for status or feedback.
*   **Multi-View**: (Not yet documented) Containers that display multiple views with switching capabilities.
*   **[Option](/components/option)**: Represents a selectable item within listbox-based components.
*   **[Progress Bar](/components/progress-bar)**: Visual indicators showing the progress of an operation.
*   **[Radio Group](/components/radio-group)**: Components allowing users to select one option from a set (includes Radio).
*   **[Rating Display](/components/rating-display)**: Non-interactive visual representation of a rating value.
*   **[Slider](/components/slider)**: Controls for selecting a value from a continuous or discrete range.
*   **[Spinner](/components/spinner)**: Indicators providing feedback during loading or processing states.
*   **[Switch](/components/switch)**: Toggle controls for turning options on or off.
*   **SVG Icon**: (Not yet documented) Components for rendering SVG icons.
*   **[Tab List](/components/tablist)**: Container components that organize content into selectable sections (includes Tab, Tab Panel).
*   **Teaching Bubble**: (Not yet documented) Callouts providing contextual information or guidance.
*   **[Text](/components/text)**: Elements for displaying static text content.
*   **[Text Input](/components/text-input)**: Controls allowing users to enter text.
*   **[Textarea](/components/textarea)**: Multi-line text editing controls.
*   **[Toggle Button](/components/toggle-button)**: Buttons that can be toggled between two states.
*   **[Tooltip](/components/tooltip)**: Contextual popups providing brief information about an element.
*   **[Tree](/components/tree)**: Hierarchical navigation or display structures (includes Tree Item).
*   **Wizard**: (Not yet documented) Step-by-step controls guiding users through multi-stage processes.

Each component is designed with accessibility in mind and follows consistent patterns for properties, events, and styling.
<!-- END-SECTION: Available Components -->

<!-- BEGIN-SECTION: Design Principles -->
## Component Design Principles

All Fabric UX System components adhere to key design principles:

1. **Consistency**: Components maintain consistent behavior, appearance, and interaction patterns across the system.
2. **Accessibility**: Components are designed to be accessible by default, meeting WCAG 2.2 guidelines.
3. **Performance**: Components are optimized for performance, with minimal dependencies and efficient rendering.
4. **Flexibility**: Components can be customized to meet specific needs while maintaining consistency.
5. **Composability**: Components can be combined to create more complex UI elements and patterns.
<!-- END-SECTION: Design Principles -->

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

Components work seamlessly with any framework, including React and Angular, or even without a framework.

- **React**: `@fabric-msft/react` provides React-friendly component wrappers.
- **Angular & Others**: The standard `@fabric-msft/web-components` package is used directly. Angular supports Custom Elements, allowing seamless integration (see [Getting Started](/guides/getting-started) and [Integration Guide](/guides/integration)).

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
<!-- Import '@fabric-msft/web-components/button/define.js' in your module/component -->
<!-- Ensure CUSTOM_ELEMENTS_SCHEMA is added to your module -->
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

<!-- BEGIN-SECTION: Performance Benefits -->
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
<!-- END-SECTION: Performance Benefits -->

## Using Components with Patterns

Components are the building blocks of the [UX patterns](/guides/patterns/overview) used throughout the Fabric UX System. While components themselves serve as standalone UI elements, patterns describe how these components work together to create standardized solutions for common user scenarios.

For example, an [empty state pattern](/guides/patterns/empty-states) might use a combination of text, illustrations, and buttons to create a consistent experience when there's no data to display.

<!-- BEGIN-SECTION: Getting Started -->
## Getting Started

To start using Fabric UX System components in your application:

1. **Install the appropriate package**:
   ```bash
   # For React applications
   npm install @fabric-msft/react @fabric-msft/tokens
   
   # For Angular or vanilla JavaScript applications
   npm install @fabric-msft/web-components @fabric-msft/tokens
   ```

2. **Import the components**:
   ```js
   // React
   import { FabricButton } from '@fabric-msft/react';
   
   // Angular / Vanilla JS
   // Import component definition for side effects (registers custom element)
   import '@fabric-msft/web-components/button/define.js';
   ```

3. **Use the components in your application**:
   See individual component documentation for specific usage examples.
<!-- END-SECTION: Getting Started -->

<!-- BEGIN-SECTION: Learn More -->
## Learn More

Explore detailed documentation for each component, including properties, events, accessibility considerations, and code examples:

- [Fluent UI Core Components](/components/)
- [Fabric-Specific Components](/components/)
- [Framework Integration](/guides/framework-integration)
- [Shared UX Patterns](/guides/patterns/overview)
<!-- END-SECTION: Learn More -->
