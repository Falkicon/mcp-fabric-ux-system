# Quick Start

After installation, set up the theme and import components.

## Applying a Theme

Use the `setTheme` utility to apply a theme (e.g., `webLightTheme`).

```javascript
// TODO: Verify correct import path - Removing TODO, path confirmed by Storybook
import { setTheme } from '@fluentui/web-components';
import { webLightTheme } from '@fluentui/tokens'; // Assuming tokens are installed

setTheme(webLightTheme);
```

See the [Theming](./../concepts/theming.md) guide for more details.

## Using Components

There are two main ways to register and use components:

**1. Side Effect Imports (Easiest):**
Import the component file directly. This automatically registers the custom element (e.g., `<fluent-button>`).

```javascript
// TODO: Verify correct import path - Removing TODO, path confirmed by Storybook
import '@fluentui/web-components/button.js';
```

```html
<fluent-button>Click Me</fluent-button>
```

**2. Named Definition Imports (Manual Registration):**
Import the component definition and register it with the design system registry. This offers more control, especially in complex applications or micro-frontend architectures.

```javascript
// TODO: Verify correct import path - Removing TODO, path confirmed by Storybook
import { ButtonDefinition, FluentDesignSystem } from '@fluentui/web-components';

// Register the component definition with the Fluent Design System's element registry
ButtonDefinition.define(FluentDesignSystem.registry);
```

```html
<fluent-button appearance="primary">Click Me</fluent-button>
```

Refer to individual component documentation for specific APIs and usage examples.
