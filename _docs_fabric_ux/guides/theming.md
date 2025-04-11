---
title: "Theming Components"
id: "guide.theming"
area: "guides"
tags: ["theming", "styling", "design-tokens", "css", "fabric-ux"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Theming Components

<!-- BEGIN-SECTION: Overview -->
Fabric UX System components are styled using [Design Tokens](/concepts/design-tokens), which are implemented as CSS Custom Properties (variables). Theming involves applying different sets of token values to change the overall look and feel (e.g., light mode, dark mode).

The `@fabric-msft/tokens` package provides pre-defined themes for Fabric UX.

*(Ensure you have installed the `@fabric-msft/tokens` package: `npm install @fabric-msft/tokens`)*
<!-- END-SECTION: Overview -->

## How Themes are Applied

<!-- BEGIN-SECTION: How Themes are Applied -->
Design tokens are resolved to CSS variables (e.g., `colorBrandBackground` becomes `var(--colorBrandBackground)`). A `Theme` object from `@fabric-msft/tokens` contains key-value pairs mapping token names to their specific values for that theme (e.g., `{ colorBrandBackground: '#0078d4', ... }`).

The `setTheme` utility (Placeholder: Confirm exact utility name and import path from Fabric UX package, e.g., `@fabric-msft/web-components/theming` or similar) is used to apply these token values as CSS variables in the DOM.

**Applying a Theme Globally:**

Apply `setTheme` at the root of your application (e.g., on `document.body` or your main app container) and pass in a theme object.

```javascript
// Placeholder: Replace with actual Fabric UX setTheme import
import { setTheme } from '@fabric-msft/web-components/theming'; 
// Placeholder: Replace with actual Fabric UX theme import
import { fabricLightTheme } from '@fabric-msft/tokens';

// Apply the light theme to the entire document
setTheme(fabricLightTheme);
```

**Applying a Theme to a Specific Section:**

To apply a theme only to a specific part of your application, pass the container element as the second argument to `setTheme`.

```javascript
// Placeholder: Replace with actual Fabric UX setTheme import
import { setTheme } from '@fabric-msft/web-components/theming';
// Placeholder: Replace with actual Fabric UX theme import
import { fabricDarkTheme } from '@fabric-msft/tokens';

const darkSectionElement = document.getElementById('dark-section');
if (darkSectionElement) {
  // Apply the dark theme only to the #dark-section element and its children
  setTheme(fabricDarkTheme, darkSectionElement);
}
```

**Unsetting a Theme:**

To remove theme variables previously set by `setTheme`, pass `null` as the theme argument.

```javascript
// Placeholder: Replace with actual Fabric UX setTheme import
import { setTheme } from '@fabric-msft/web-components/theming';

// Remove global theme variables set by setTheme
setTheme(null);

// Remove theme variables specifically set on darkSectionElement
const darkSectionElement = document.getElementById('dark-section');
if (darkSectionElement) {
  setTheme(null, darkSectionElement);
}
```
<!-- END-SECTION: How Themes are Applied -->

## Available Themes

<!-- BEGIN-SECTION: Available Themes -->
Pre-defined themes available from `@fabric-msft/tokens` (Placeholder: Confirm exact theme names):

- `fabricLightTheme` (Example name)
- `fabricDarkTheme` (Example name)
- *(Potentially others specific to Fabric contexts)*
<!-- END-SECTION: Available Themes -->

## High Contrast Mode

<!-- BEGIN-SECTION: High Contrast Mode -->
Fabric UX components are designed to automatically adapt to Windows High Contrast mode (using the CSS `forced-colors` media query). Applying specific high-contrast theme objects via `setTheme` is generally **not** required or recommended for standard High Contrast Mode support.
<!-- END-SECTION: High Contrast Mode -->

## Using Tokens in Custom Styles

<!-- BEGIN-SECTION: Using Tokens in Custom Styles -->
Within your application's CSS or component styles, you can access the applied theme's token values using their CSS Custom Property names.

```css
.my-custom-element {
  /* Use the brand background color from the current theme */
  background-color: var(--colorBrandBackground);
  
  /* Use horizontal spacing token for padding */
  padding: var(--spacingVerticalM) var(--spacingHorizontalM);
  
  /* Use base font size and family */
  font-size: var(--fontSizeBase300);
  font-family: var(--fontFamilyBase);
  
  /* Use neutral foreground color */
  color: var(--colorNeutralForeground1);
}
```

Refer to the [Common Design Tokens](/concepts/common-tokens) guide for a list of frequently used token names.
<!-- END-SECTION: Using Tokens in Custom Styles -->

## Finding Available Tokens

<!-- BEGIN-SECTION: Finding Available Tokens -->
The complete list of available token names and the structure of the `Theme` object are defined within the `@fabric-msft/tokens` package.

- **Token Definitions:** Explore the source code of the `@fabric-msft/tokens` package (Placeholder: Link to Fabric UX repository tokens package when available).
<!-- END-SECTION: Finding Available Tokens -->

## Learn More

<!-- BEGIN-SECTION: Learn More -->
- [Design Tokens Overview](/concepts/design-tokens)
- [Common Design Tokens](/concepts/common-tokens)
- [Styling Components](/guides/styling-components)
<!-- END-SECTION: Learn More -->
