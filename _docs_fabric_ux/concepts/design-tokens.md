---
title: "Design Language and Tokens"
id: "concept.design-tokens"
area: "concepts"
tags: ["design", "tokens", "colors", "typography", "spacing", "theme"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Design Language and Tokens

The Fabric UX System's design language and tokens form the foundation of a cohesive visual identity across Microsoft Fabric experiences. These design fundamentals allow teams to create experiences that align with Microsoft's broader design ecosystem while addressing the specific needs of data-intensive applications within Microsoft Fabric.

## Introduction

The Fabric UX System builds on [Fluent 2](https://fluent2.microsoft.design/)'s design language and leverages design tokens to achieve consistency and alignment across the user experience. This shared visual language makes experiences cohesive, easy to use, and accessible.

A consistent design language provides several key benefits:
- **Brand expression**: Helps express brand identity through visual and interactive elements
- **Usability**: Enhances usability and accessibility by following established patterns
- **Efficiency**: Increases productivity by enabling reuse and scalability of design components
- **Recognition**: Creates a familiar experience that users can quickly recognize
- **Cohesion**: Ensures that different parts of the product feel like they belong together

## Design Tokens

Design tokens abstract design decisions like color, typography, and spacing into a reusable system. They serve as the foundation for maintaining visual consistency while enabling flexibility for different themes and contexts.

```
                DESIGN TOKENS HIERARCHY
                
┌───────────────────────────────────────────────────┐
│                                                   │
│  ┌─────────────────┐         ┌─────────────────┐  │
│  │  GLOBAL TOKENS  │         │  ALIAS TOKENS   │  │
│  │                 │         │                 │  │
│  │  • colorRed10   │─────────▶• colorError     │  │
│  │  • colorGray20  │─────────▶• colorNeutral   │  │
│  │  • spacing4     │─────────▶• spacingS       │  │
│  │  • fontSize12   │─────────▶• fontSizeBase   │  │
│  │  • fontWeight600│─────────▶• fontWeightBold │  │
│  │                 │         │                 │  │
│  └─────────────────┘         └─────────────────┘  │
│                                                   │
│                FABRIC UX SYSTEM                   │
└───────────────────────────────────────────────────┘
```

### Types of Design Tokens

The Fabric UX System uses two primary types of design tokens:

#### Global Tokens

Global tokens represent the most basic visual values in the design system, such as specific colors, spacing units, or typography values. They serve as the foundation but are not typically used directly in implementation.

Example:
```css
--globalColorBrand100: "#2899f5"
```

#### Alias Tokens

Alias tokens are contextual and relate to specific use cases or components. They reference global tokens and provide semantic meaning, making them more intuitive to use in implementation.

Example:
```css
--colorBrandForegroundInverted: var(--globalColorBrand100)
```

Alias tokens help communicate the intended purpose and allow for swapping values when applying different themes. When styling UI elements, alias tokens should be used rather than global tokens.

### Alias Token Naming Convention

Alias tokens follow a structured naming convention that identifies their intended use:

1. **Token type** (e.g., color)
2. **Color palette** (e.g., neutral, brand)
3. **Application context** (e.g., foreground, background, stroke)
4. **Special conditions** (e.g., onBrand, inverted)
5. **Variation number** (e.g., 1, 2, 3)
6. **State** (e.g., hover, pressed, disabled)

For example, `colorNeutralStrokeOnBrand2Hover` breaks down as:
- **Color**: The alias is assigned a color value
- **Neutral**: The color value is from the neutral color palette
- **Stroke**: To be used as a stroke color
- **OnBrand**: To be used only on an element with a brand background color
- **2**: One of multiple variations on this alias
- **Hover**: To be used as a hover state

Common alias token types include:
- **"Color" aliases**: For color tokens (e.g., `--colorBrandForeground1: #0f6cbd;`)
- **"Neutral" aliases**: For color tokens from the neutral palette
- **"Brand" aliases**: For applying brand colors
- **"On Brand" aliases**: For foreground colors on brand backgrounds
- **"Compound" aliases**: For compound states with nested pseudo-selectors
- **"Inverted" aliases**: For applying the reverse of the current theme
- **"Static" aliases**: For values that remain unchanged between themes

### Theme Support

The Fabric UX System supports multiple themes through design tokens:
- **Light theme**: The default theme with a light background and dark text
- **Dark theme**: An inverted theme with a dark background and light text
- **High Contrast**: A theme designed for users with visual impairments

The same alias token references different global tokens in different themes:

```css
/* Light theme */
--colorBrandBackground: var(--globalColorBrand80);
--colorNeutralBackground1: var(--globalColorWhite);
--colorNeutralForeground1: var(--globalColorGrey14);

/* Dark theme */
--colorBrandBackground: var(--globalColorBrand90);
--colorNeutralBackground1: var(--globalColorGrey14);
--colorNeutralForeground1: var(--globalColorWhite);
```

This approach allows the entire UI to adapt to different themes by changing the mapping of alias tokens to global tokens, without updating individual components.

## Color System

Color is essential to Fabric's visual identity, creating consistent hierarchy and brand recognition. The colors in the framework fall into these categories:

```
                COLOR SYSTEM
                
┌─────────────────────────────────────────────────────┐
│                                                     │
│  ┌─────────────────┐   ┌─────────────────┐          │
│  │  BRAND COLORS   │   │ NEUTRAL COLORS  │          │
│  │                 │   │                 │          │
│  │  • Primary      │   │  • White        │          │
│  │  • Secondary    │   │  • Gray scale   │          │
│  │  • Accent       │   │  • Black        │          │
│  └─────────────────┘   └─────────────────┘          │
│                                                     │
│  ┌─────────────────────────────────────────┐        │
│  │           SHARED COLORS                 │        │
│  │                                         │        │
│  │  • Status: Success, Warning, Error, Info│        │
│  │  • Visualization palette                │        │
│  │  • Accent colors                        │        │
│  └─────────────────────────────────────────┘        │
│                                                     │
│  ┌─────────────────────────────────────────┐        │
│  │           THEME SUPPORT                 │        │
│  │                                         │        │
│  │  • Light theme                          │        │
│  │  • Dark theme                           │        │
│  │  • High contrast                        │        │
│  └─────────────────────────────────────────┘        │
│                                                     │
└─────────────────────────────────────────────────────┘
```

### Brand Colors

Brand colors represent the visual identity of the product and highlight specific UI elements that require focus. The primary brand color for Microsoft Fabric is a blue hue that aligns with Microsoft's broader color system while providing a distinct identity.

### Neutral Colors

A neutral palette from white to black creates consistent visual hierarchy across products. Neutral colors help create clear distinction between UI elements, especially when combined with brand colors.

### Shared Colors

These include:
- **Status colors**: Success (green), warning (yellow), error (red), and information (blue)
- **Visualization colors**: A distinct set for data visualization
- **Accent colors**: Additional colors for specific UI elements or states

### Color Accessibility

The Fabric UX System ensures color accessibility through:
- **Contrast ratios**: Meeting WCAG 2.1 AA standards for text and background colors
- **Color independence**: Not relying on color alone to convey information
- **Color blindness considerations**: Testing combinations for various types of color blindness

## Typography

The typography system uses the Segoe UI typeface and is designed for readability, usability, and accessibility. Each text style has specific font size, weight, and line height values.

### Type Ramp

The Fabric UX System's type ramp includes:
- **Hero**: Large, bold text for main headings and key messages
- **Title**: For section headings and important content
- **Subtitle**: For subheadings and secondary content
- **Body**: For main content text
- **Caption**: For supplementary information and labels

### Typography Accessibility

Key considerations include:
- **Minimum font sizes**: Ensuring text is large enough to be readable
- **Line height**: Providing sufficient spacing between lines
- **Font weight**: Using appropriate weights for different text styles
- **Text contrast**: Ensuring sufficient contrast between text and background

## Spacing

Spacing creates balance, rhythm, and harmony in UI layouts. Elements in close proximity appear meaningfully related, while adding space weakens their perceived relationship.

The Fabric UX System's spacing is built on a fundamental unit of 4 pixels, with predefined tokens for:
- **Vertical spacing**: Values from 0px to 32px (none to xxxl)
- **Horizontal spacing**: Following the same scale

The spacing scale includes values outside the 4-pixel grid (2px, 6px, 10px) to account for icon padding and alignment.

### Layout and Responsiveness

The system defines breakpoints for responsive layouts:

| Size class | Breakpoint range | Margin size | Columns |
|------------|------------------|-------------|---------|
| Small      | 320-479px        | 16px        | 4       |
| Medium     | 480-639px        | 32px        | 6       |
| Large      | 640-1023px       | 32px        | 6       |
| X-large    | 1024-1365px      | 64px        | 12      |
| XX-large   | 1366-1919px      | 64px        | 12      |
| XXX-large  | 1920px and up    | 64px        | 12      |

Different page types have specific layout considerations:
- **Hub pages**: Overviews with fixed grids above 1920px
- **List pages**: Scannable content with no maximum width

## Elevation

Elevation communicates hierarchy and focus through shadows. Surfaces requiring focus have larger shadows to bring them closer on the z-axis.

The system includes elevation levels from 0 (flat surfaces) to 4 (critical UI elements), each with specific shadow properties.

## Iconography

The Fabric UX System includes two primary icon styles:

### Fluent System Icons
Single-color icons for UI components, available in regular and filled versions. Guidelines include specific sizes (16-64px), pixel grid alignment, and proper vector composition.

### Filetype Icons
Multi-color icons for representing Fabric items that can be opened, created, or edited.

Implementation options include React components, direct SVG imports, SVG sprites, and web component integration.

## Illustration

Illustrations help tell stories and guide users. The system includes:

### Illcons
Small spot illustrations (64-128px) that use simple metaphors to quickly communicate concepts. Ideal for cards and modals.

### Illgrams
Medium-sized illustrations (186x136px or 247x180px) with a diagrammatical approach to convey stories about experiences and processes.

### Custom Spot Illustrations
Larger illustrations (up to 512x256px) for complex ideas.

### Empty State Illustrations
Grayscale illustrations designed specifically for empty state components, available in multiple sizes.

## Implementation

### In Code
Design tokens are implemented as CSS custom properties:

```css
:root {
  /* Global tokens */
  --globalColorBrand80: #0078d4;
  --globalColorWhite: #ffffff;
  --globalColorGrey14: #242424;
  
  /* Alias tokens */
  --colorBrandBackground: var(--globalColorBrand80);
  --colorNeutralBackground1: var(--globalColorWhite);
  --colorNeutralForeground1: var(--globalColorGrey14);
}

/* Using tokens in components */
.button {
  background-color: var(--colorBrandBackground);
  color: var(--colorNeutralForeground1);
}
```

### In Design Tools
In tools like Figma, design tokens are implemented as variables and styles that designers can apply to designs. The Fabric UI kit provides these tokens as variables corresponding to the alias token set used in code.

## Design-to-Code Alignment

The Fabric UX System maintains precise alignment between Figma designs and code implementations, providing:
- **Pixel-perfect implementation**: Code components match their Figma counterparts exactly
- **Shared naming conventions**: Consistent naming between design and code
- **Automatic token application**: Correct design tokens are automatically applied
- **Reduced design drift**: Minimizes the risk of implementation differences
- **Streamlined QA**: Clear reference points for comparing UI against design

This alignment reduces friction in the design-to-development handoff, allowing teams to focus on solving user problems rather than debating implementation details.

## Best Practices

- **Use alias tokens, not raw values**: Always reference appropriate alias tokens rather than direct color values
- **Maintain theme support**: Ensure components work across light, dark, and high contrast themes
- **Leverage spacing tokens**: Use the spacing scale for consistent layout and rhythm
- **Follow typography guidelines**: Stick to the defined type ramp for readability and hierarchy
- **Consider mixed design systems**: When working with multiple design systems, use tokens strategically to create visual harmony

## Learn More

Explore related topics to better understand how to apply design tokens:
- [Component Library](/components/overview)
- [Getting Started with Fabric UX](/guides/getting-started)
- [Accessibility Guidelines](/concepts/accessibility)
