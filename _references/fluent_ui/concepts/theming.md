# Theming

Fluent UI Web Components are styled using Design Tokens, implemented as CSS Custom Properties. The `@fluentui/tokens` package provides pre-defined themes.

*(Ensure you have installed the `@fluentui/tokens` package: `npm install @fluentui/tokens` or equivalent)*

## How Theme is Applied

Tokens are resolved to CSS variables. The `setTheme` utility handles setting these variables in the DOM and updating them when the theme changes.

Apply `setTheme` at the root of your app (e.g., on `document.body` or your main app container) and pass a theme object.

```javascript
// TODO: Verify correct import path - Removing TODO, path confirmed by Storybook
import { setTheme } from '@fluentui/web-components';
import { webLightTheme } from '@fluentui/tokens';

setTheme(webLightTheme);
```

To apply a theme to a specific element subtree, pass the element as the second argument:

```javascript
import { setTheme } from '@fluentui/web-components';
import { webDarkTheme } from '@fluentui/tokens';

const myElement = document.getElementById('dark-section');
setTheme(webDarkTheme, myElement);
```

**Unsetting a Theme:** Pass `null` as the theme to remove previously set tokens.

```javascript
// Remove global theme
setTheme(null);

// Remove theme from specific element
setTheme(null, element);
```

## Available Themes

Pre-defined themes from `@fluentui/tokens`:

*   `webLightTheme`
*   `webDarkTheme`
*   `teamsLightTheme`
*   `teamsDarkTheme`

## High Contrast

Components automatically adapt to Windows High Contrast mode (Forced Colors Mode). Explicit high-contrast themes (`webHighContrastTheme`) are generally not needed and considered legacy unless specifically required by the application.

## Using Tokens in Custom Styles

Access theme tokens via their CSS Custom Property names (e.g., `var(--colorBrandBackground)`, typically prefixed like `--color...`, `--fontSize...`, `--spacing...`, etc.). Refer to the `@fluentui/tokens` package or theme definitions for available token names.

## Finding Available Tokens

The complete list of available token names is defined in the `@fluentui/tokens` package source code. While the themes apply specific values, the token names themselves represent the design system's semantic slots.

*   **Token Names:** The mapping of token names (e.g., `colorNeutralBackground1`) to CSS variable strings (`var(--colorNeutralBackground1)`) can be found in: [`packages/tokens/src/tokens.ts`](https://github.com/microsoft/fluentui/blob/master/packages/tokens/src/tokens.ts)
*   **Theme Structure:** The `Theme` interface defining all available token keys can be found in: [`packages/tokens/src/types.ts`](https://github.com/microsoft/fluentui/blob/master/packages/tokens/src/types.ts)

For a curated list of commonly used tokens and their typical applications, see the [Common Tokens](./common-tokens.md) guide.

**Note:** Avoid hardcoding token CSS variable names directly if possible. If building custom components intended to integrate deeply, consider consuming tokens programmatically where feasible, though direct CSS variable usage is standard for application-level styling.
