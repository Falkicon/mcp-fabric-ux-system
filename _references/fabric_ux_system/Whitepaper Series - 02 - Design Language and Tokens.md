# Fabric UX System: Design Language and Tokens

*Visual foundations and design system implementation*

> **Author:** Jason Falk & The Fabric UX Team  
> **Last Updated:** February 28, 2025  
> **Version:** 0.1  
> **Status:** Draft  

## Executive Summary

The Fabric UX System's design language and tokens form the foundation of a cohesive visual identity across Microsoft Fabric experiences. This whitepaper provides a comprehensive overview of the design language elements—including color, typography, spacing, iconography, and illustration—and the design tokens system that enables consistent implementation across platforms and frameworks.

By understanding and implementing these design fundamentals, teams can create experiences that align with Microsoft's broader design ecosystem while addressing the specific needs of data-intensive applications within Microsoft Fabric.

## Introduction to Design Language

The Fabric UX System builds on [Fluent 2](https://fluent2.microsoft.design/)'s design language and leverages design tokens to achieve consistency and alignment across the user experience.

This shared visual language is represented by a set of UI elements that have a formal system of definitions to enhance Fabric, making experiences cohesive, easy to use, and accessible by all.

### Why Design Language Matters

A consistent design language provides several key benefits:

- **Brand expression**: Helps express brand identity through visual and interactive elements
- **Usability**: Enhances usability and accessibility by following established patterns and conventions
- **Efficiency**: Increases efficiency and productivity by enabling reuse and scalability of design components
- **Recognition**: Creates a familiar experience that users can quickly recognize and understand
- **Cohesion**: Ensures that different parts of the product feel like they belong together

## Color

Color is an essential part of Fabric's visual identity. It helps create a consistent visual hierarchy across the product and makes the brand recognizable to users. Through the use of design tokens, the framework supports theming as each color token has several values defined depending on the theme. The colors available in the framework fall into a few categories:

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

Brand colors are the colors that represent the visual identity of our products and are often used to highlight specific UI elements that require more focus or to communicate certain interactive states.

The primary brand color for Microsoft Fabric is a blue hue that aligns with Microsoft's broader color system while providing a distinct identity for Fabric experiences.

### Neutral Colors

A neutral color palette ranging from white to black creates a consistent visual hierarchy across our products. Neutral colors help us create a clear distinction between different UI elements and make it easier for users to navigate and identify based on visual hierarchy, especially when used in combination with brand colors.

The neutral palette includes various shades of gray that are used for text, backgrounds, borders, and other UI elements.

### Shared Colors

The framework also includes shared colors in our UI that are not covered by the neutral and brand color ramps. These have lower frequency of use and may be used to represent certain status colors or visualization palettes.

Shared colors include:
- **Status colors**: Success (green), warning (yellow), error (red), and information (blue)
- **Visualization colors**: A set of distinct colors used for data visualization
- **Accent colors**: Additional colors used for specific UI elements or states

### Color Accessibility

Color accessibility is also an important part of the visual language. Fabric UX System components are accessible to all users by using color contrast ratios that meet WCAG 2.1 AA standards. When using components from this library, be sure to check contrast against the backgrounds surface colors you choose.

The system also considers color accessibility for color blind users, avoiding the use of color alone to convey information or meaning.

Key accessibility considerations include:
- **Contrast ratios**: Ensuring sufficient contrast between text and background colors
- **Color independence**: Using additional visual cues beyond color to convey information
- **Color blindness**: Testing color combinations for various types of color blindness

## Typography

The type ramp uses the Segoe UI typeface and is designed to create readable, usable, and accessible interfaces. This ramp defines a set of font attributes for different levels of text. Each level has a tokenized font attribute that specifies the font size, weight, and line height.

### Type Ramp

The Fabric UX System's type ramp includes several text styles:

- **Hero**: Large, bold text used for main headings and key messages
- **Title**: Used for section headings and important content
- **Subtitle**: Used for subheadings and secondary content
- **Body**: Used for the main content text
- **Caption**: Used for supplementary information and labels

Each text style has specific font size, weight, and line height values that ensure readability and hierarchy.

### Typography Accessibility

The typography system is designed with accessibility in mind, ensuring that text is readable for all users. Key considerations include:

- **Minimum font sizes**: Ensuring that text is large enough to be readable
- **Line height**: Providing sufficient spacing between lines for readability
- **Font weight**: Using appropriate font weights for different text styles
- **Text contrast**: Ensuring sufficient contrast between text and background

## Elevation

Elevation is present through shadows in the UI that communicate the hierarchy and focus of different elements and surfaces. The ramp includes different levels of depth and blur to create realistic and consistent shadows. Use elevation carefully and consistently to avoid visual clutter or confusion.

Generally, surfaces that require focus or are more visually prominent have larger shadows to bring it closer on the z-axis than secondary or tertiary surfaces that fall into the background.

### Elevation Levels

The Fabric UX System includes several elevation levels:

- **Level 0**: No elevation, used for flat surfaces
- **Level 1**: Slight elevation, used for cards and containers
- **Level 2**: Medium elevation, used for dialogs and popovers
- **Level 3**: High elevation, used for modals and important UI elements
- **Level 4**: Highest elevation, used for critical UI elements

Each elevation level has specific shadow properties, including blur radius, spread, and opacity.

## Spacing

Spacing is used to create balance, rhythm, and harmony in UI layouts. Elements in close proximity are perceived as being meaningfully related, while adding more space between elements weakens their perceived relationship. Elements arranged in the same spacing pattern are seen as related pieces with equal weight and implied connection.

The Fabric UX System's spacing is built on a fundamental unit of 4 pixels, which serves as the basis for the spacing scale, ensuring consistency across all products. The system includes predefined spacing tokens for:

- **Vertical spacing**: Values ranging from 0px (none) to 32px (xxxl), with intermediate values including 2px, 4px, 6px, 8px, 10px, 12px, 16px, 20px, and 24px
- **Horizontal spacing**: Following the same scale as vertical spacing

The spacing ramp includes values that fall outside of the four-pixel units (2px, 6px, and 10px) to account for extra padding in Fluent icons and help align them to the 4px grid.

### Layout and Responsiveness

The Fabric UX System emphasizes responsive design to accommodate various screen sizes and support browser zoom functionality. Content is designed to reflow appropriately without loss of information or functionality, avoiding horizontal scrolling except where two-dimensional layout is necessary (such as images, maps, data tables, etc.).

The system defines general breakpoints for responsive layouts:

| Size class | Breakpoint range | Margin size | Columns |
|------------|------------------|-------------|---------|
| Small      | 320-479px        | 16px        | 4       |
| Medium     | 480-639px        | 32px        | 6       |
| Large      | 640-1023px       | 32px        | 6       |
| X-large    | 1024-1365px      | 64px        | 12      |
| XX-large   | 1366-1919px      | 64px        | 12      |
| XXX-large  | 1920px and up    | 64px        | 12      |

Different page types have specific layout considerations:

- **Hub pages** (like Fabric home page, workload home pages): Serve as overviews for various sections or categories of content, with grids fixed above 1920px
- **List pages** (like Browse, Workspace, Create hub): Used for displaying large amounts of content in a scannable format, with no maximum width specified

Spacing in the UI should be considered carefully and consistently to ensure proper hierarchy and usability.

## Iconography

Icons are a critical part of the Fabric UX System's visual language, providing visual cues that help users navigate and interact with the interface. The system includes two primary icon styles:

### Fluent System Icons

These are single-color icons typically used for UI components. The Fluent iconography library provides both regular and filled versions for each icon. When implementing Fluent system icons:

- Icons should be built at specific sizes only: 16, 20, 24, 32, 40, 48, and 64 pixels
- Icons must align to the pixel grid
- Final icons should be composed of one vector shape, both merged and flattened
- Icons should have proper winding settings

### Filetype Icons

These are multi-color icons used for representing Fabric items that can be opened, created, or edited. When implementing filetype icons:

- Icons must align to the pixel grid
- The correct color should be assigned based on semantic categories
- The interior icon style should conform to the Fluent system

### Icon Usage Guidelines

- **Ribbon and toolbar icons**: Use single-color 20x20 Fluent system icons in all ribbon components and top-level menus in item views
- **States**: Icons should follow 'subtle' button background states, remaining in regular theme for hover, pressed, and selected states
- **Product and brands**: Use full-color icons for products, brands, and services
- **Color themes**: Different color palettes are provided for both light and dark themes, with colors chosen based on semantic categories

### Implementation

The Fabric UX System provides several methods for implementing SVG icons:
- React components for efficient loading
- Direct SVG imports
- SVG sprites for improved performance
- Web component library integration

These implementation options ensure that icons can be consistently applied across different frameworks and environments while maintaining the design language's integrity.

## Illustration

Illustrations in the Fabric UX System work alongside language content to tell simple stories and help users achieve their goals. They draw attention to specific UI areas, evoke emotion, and communicate concepts more quickly than text. The system includes several types of illustrations:

### Illcons

Illcons are small spot illustrations that use simple metaphors to quickly communicate concepts. They serve as visual companions to short headlines and labels. Key characteristics include:

- Created at 64x64px and can be scaled up to 96x96px and 128x128px
- Ideal for card and modal components
- Designed for UI areas with small footprints and minimal clearspace

### Illgrams

Illgrams are medium-sized spot illustrations with a diagrammatical narrative approach that help convey stories about experiences and processes. Their features include:

- Created at 186x136px or 247x180px based on the golden ratio
- Paired with longer, more descriptive headlines
- Not intended to be scaled from their original size

### Custom Spot Illustrations

For scenarios requiring larger illustrations or conveying complex ideas, custom spot illustrations can be created:

- Up to 512x256px in size
- Designed to communicate complex ideas in a simple, engaging way

### Empty State Illustrations

Empty state illustrations are specifically designed for Fabric's empty state component:

- Grayscale to blend into the UI surface
- Work in both light and dark mode themes
- Available in three sizes: 200x200px, 100x100px, and 48x48px

### Implementation

Illustrations from the Fabric visuals kit library are available in npm packages that can be imported into any framework:

- Public package: @fabric-msft/visuals
- Microsoft internal package: @fabric-msft/fabric-visuals

The implementation approach follows the same patterns as iconography, with the size of the illustration typically determined by the component where it will be used.

## Design Tokens

Design tokens are a method to abstract design decisions such as color, typography, and spacing into a reusable system. They serve as the foundation for maintaining visual consistency across the Fabric UX System while enabling flexibility for different themes and contexts.

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

Global tokens represent the most basic visual values in the design system, such as specific colors, spacing units, or typography values. They serve as the foundation for the design language but are not typically used directly in implementation.

For example, a global token might define a specific color value:
```
--globalColorBrand100: "#2899f5"
```

#### Alias Tokens

Alias tokens are more contextual and relate to specific use cases or components. They reference global tokens and provide semantic meaning to the values, making them more intuitive to use in implementation.

Alias tokens help communicate the intended purpose of the token and allow for swapping the values they point to when applying different themes to the UI. When styling UI elements, alias tokens should be used rather than global tokens or stored values.

For example, an alias token might reference a global token for a specific use case:
```
--colorBrandForegroundInverted: var(--globalColorBrand100)
```

### Alias Token Naming Convention

Alias tokens in the Fluent design system follow a structured naming convention that helps identify their intended use. The naming structure includes keywords that provide information about:

1. **Token type** (e.g., color)
2. **Color palette** (e.g., neutral, brand)
3. **Application context** (e.g., foreground, background, stroke)
4. **Special conditions** (e.g., onBrand, inverted)
5. **Variation number** (e.g., 1, 2, 3)
6. **State** (e.g., hover, pressed, disabled)

For example, the token `colorNeutralStrokeOnBrand2Hover` breaks down as:
- **Color**: The alias is assigned a color value
- **Neutral**: The color value is from the neutral color palette
- **Stroke**: To be used as a stroke color
- **OnBrand**: To be used only on an element with a brand background color
- **2**: One of multiple variations on this alias
- **Hover**: To be used as a hover state

Common alias token types include:
- **"Color" aliases**: For color tokens (e.g., `--colorBrandForeground1: #0f6cbd;`)
- **"Neutral" aliases**: For color tokens from the neutral palette (e.g., `--colorNeutralForeground1: var(--globalColorGrey14);`)
- **"Brand" aliases**: For applying brand colors (e.g., `--colorBrandBackgroundHover: var(--globalColorBrand70);`)
- **"On Brand" aliases**: For foreground colors on brand backgrounds (e.g., `--colorNeutralForegroundOnBrand: var(--globalColorWhite);`)
- **"Compound" aliases**: For compound states with nested pseudo-selectors (e.g., `--colorCompoundBrandBackground: var(--globalColorBrand80);`)
- **"Inverted" aliases**: For applying the reverse of the current theme (e.g., `--colorNeutralForegroundOnBrand: var(--globalColorWhite);`)
- **"Static" aliases**: For values that remain unchanged between themes (e.g., `--colorBrandBackgroundStatic: var(--globalColorBrand80);`)

### Theme Support

Design tokens enable theming by allowing the same alias token to reference different global tokens depending on the active theme. This approach ensures consistent application of the design language while supporting different visual appearances.

The Fabric UX System supports multiple themes, including:
- **Light theme**: The default theme with a light background and dark text
- **Dark theme**: An inverted theme with a dark background and light text
- **High Contrast**: A theme designed for users with visual impairments, featuring high contrast between elements

For example, the same alias token might reference different global tokens in different themes:

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

This approach allows the entire UI to adapt to different themes by changing the mapping of alias tokens to global tokens, without needing to update individual components.

## Implementation in Code and Design

Design tokens are implemented differently in code and design tools, but the underlying concept remains the same.

### In Code

In code, design tokens are typically implemented as CSS custom properties (variables) that can be referenced throughout the codebase. This approach ensures consistency and makes it easier to update values across the entire application.

Example of token implementation in CSS:
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

In design tools like Figma, design tokens are implemented as variables and styles that designers can apply to their designs. The Fabric UI kit provides these tokens as variables that correspond to the alias token set used in code.

## Designer-Specific Guidance

When preparing designs for handoff to developers, designers should use design tokens correctly:

- **Keep component styles linked**: All components in the Fabric UI kit use styles that correspond to the alias token set. Component instances linked to variables in this kit are ready for handoff, with token names extractable from Figma.

- **Use alias tokens, not hex values**: Custom components or UI elements need alias tokens, not hex values. For example, provide "Neutral Background 2" to the developer rather than "#FAFAFA," which could belong to multiple alias tokens and cause UI bugs.

- **Specify tokens properly**: Use alias tokens to define styles for design elements. For interactive states, add 'interactive' to the token name (for example, "Neutral Foreground 2 Interactive") instead of listing each interactive state separately.

### Design-to-Code Alignment

A significant benefit of the Fabric UX System is the precise alignment between Figma design components and their code implementations. This alignment provides several advantages:

- **Pixel-perfect implementation**: Code components are built to exactly match their Figma counterparts, ensuring that the final product looks identical to the design.

- **Shared naming conventions**: Component properties, variants, and states use consistent naming between design and code, reducing confusion during implementation.

- **Automatic token application**: When designers use the Fabric UI kit components, the correct design tokens are automatically applied and can be directly referenced by developers.

- **Reduced design drift**: The tight coupling between design and code components minimizes the risk of implementation differences that can lead to design drift over time.

- **Streamlined QA process**: The alignment simplifies quality assurance by providing a clear reference point for comparing the implemented UI against the design.

This alignment significantly reduces the traditional friction in the design-to-development handoff process, allowing teams to focus on solving user problems rather than debating implementation details.

### Handoff Example

When a designer prepares a design for implementation, they should use variables in Figma that correspond to alias tokens. For example, if body text uses the "Neutral Foreground 1" variable in Figma, the developer can inspect the design and understand to use the equivalent token "colorNeutralForeground1" in code.

The implemented token then references the stored value depending on the theme. If a dark theme is applied, the text color adjusts accordingly since it is using the correct token.

This approach to tokens ensures smooth transition to development and maintains design consistency across the platform.

## Working with Mixed Design Systems

In real-world scenarios, teams may need to work with multiple design systems during transition periods or when integrating with existing applications. The Fabric UX System provides guidance for these situations:

### Approaches for Different Design Contexts

When working with designs that use different design systems, follow these guidelines:

- **Fluent 2 designs**: Build with Fabric UX System components as designed, using the standard tokens and components.

- **Fluent 1 designs**: Use Fabric UX System components but adjust tokens to match the Fluent 1 design as closely as possible. This approach maintains the technical benefits of the Fabric UX System while preserving visual consistency with existing Fluent 1 interfaces.

- **Non-Fluent designs**: Use tokens to match the design as closely as possible, focusing on maintaining the core visual language while leveraging the Fabric UX System's component architecture.

### Best Practices for Mixed Design Systems

When working with mixed design systems:

1. **Maintain visual consistency**: Ensure that the user experience feels cohesive, even when mixing components from different design systems.

2. **Use design tokens strategically**: Leverage design tokens to create visual harmony between different design systems.

3. **Avoid CSS overrides**: Instead of using CSS overrides to make components match a different design system, work with designers to update the design to better align with the Fabric UX System.

4. **Plan for incremental adoption**: Create a roadmap for gradually transitioning to the Fabric UX System, focusing on high-impact areas first.

5. **Document design decisions**: Clearly document where and why different design systems are being used to help team members understand the design rationale.

## Requirements Addressed

This whitepaper addresses the following key requirements of the Fabric UX System:

✅ **Design Token Implementation**: Design tokens must be implemented to enable theming and consistent visual appearance.
> **Met by**: Design tokens system that abstracts design decisions into a reusable and scalable system.

✅ **Fluent 2 Alignment**: The system must provide design tokens that align with Fluent 2 design system.
> **Met by**: Design tokens aligned with Fluent 2 design system for visual and functional harmony.

✅ **Design-to-Code Alignment**: Components must maintain precise alignment between design specifications and code implementation.
> **Met by**: One-to-one mapping between Figma design components and code implementations.

✅ **Theme Support**: The system must support light, dark, and high contrast themes.
> **Met by**: Theme support for light, dark, and high contrast modes through design tokens.

✅ **Token Naming Convention**: Design tokens must follow a structured naming convention for clarity and consistency.
> **Met by**: Structured naming convention for design tokens that provides information about their purpose.

✅ **Theme Customization**: The system must provide a mechanism for theme customization while maintaining design integrity.
> **Met by**: Theme customization through design tokens while maintaining design system integrity.

✅ **Theme Interoperability**: Components must support theme interoperability with existing Fabric components.
> **Met by**: Using the same design tokens as Fluent UI React v9 and other existing Fabric tokens.

✅ **Mixed Design Systems Guidance**: The system must provide guidance for working with mixed design systems during transition periods.
> **Met by**: Specific guidance for working with Fluent 2, Fluent 1, and non-Fluent designs.

✅ **Designer Tools**: The system must provide tools for designers including Figma UI kits and design tokens.
> **Met by**: Figma UI kits and design tokens for designers to create consistent designs.

For a complete list of all requirements and how they are met, please refer to the "[Requirements and Compliance](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/ETE64EeUg1JNnFtDgVCRDkcBMycPFYojTGl-naYTcQ4qEg?e=h2yW46)" whitepaper (07).

## About This Whitepaper Series

This whitepaper is part of a series that provides comprehensive information about the Fabric UX System:

1. **[Executive Overview](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EVLsz1jmMEFIkoxdbsBvb0cBkRq41NcyKzeiknQv-LJuKQ?e=PEAJPy)**: High-level introduction to the Fabric UX System, its purpose, and key benefits.
2. **Design Language and Tokens** (this document): Detailed information about the design language, design tokens, and theming capabilities.
3. **[Component Library and Patterns](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EaRRL-BAezdNnC2-MfPB1HABeuqSWYraEwQLTXCK6OH4eg?e=b0tfqO)**: Overview of the component library, including available components and UX patterns.
4. **[Accessibility and Content Design](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EWRplYWZiRZHh2iLgVkUzBQBsJ90tBFrSWRQB2SRTbmgtQ?e=tvxGH4)**: Guidance on accessibility compliance and content design best practices.
5. **[Implementation Guide](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EY3v1PN_bd9Cr_AiAQk0-XABUiXOeGui2DCwV4ysw9tLAQ?e=qUjgWc)**: Technical details for implementing the Fabric UX System in your applications.
6. **[Question and Answer](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/Edvsa9nrjC9PhdWkCMBWPv8BMORBHhHWs1YnucOSl4mVTQ?e=2QRZjU)**: Answers to common questions about the Fabric UX System.
7. **[Requirements and Compliance](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/ETE64EeUg1JNnFtDgVCRDkcBMycPFYojTGl-naYTcQ4qEg?e=h2yW46)**: Comprehensive specification of system requirements and compliance verification.

## Conclusion

The Fabric UX System's design language and tokens provide a comprehensive framework for creating cohesive, accessible, and visually consistent experiences within Microsoft Fabric. By understanding and implementing these design fundamentals, teams can create experiences that align with Microsoft's broader design ecosystem while addressing the specific needs of data-intensive applications.

### Key Takeaways

- The design language defines the visual and interactive elements that make up the Fabric UX System
- Design tokens abstract design decisions into a reusable and scalable system
- Global tokens represent basic visual values, while alias tokens provide semantic meaning
- Theme support enables consistent application of the design language across different visual appearances
- Proper implementation in code and design tools ensures consistency across platforms and frameworks

### Next Steps

For more information on implementing the Fabric UX System's design language and tokens, refer to the following resources:

- **Component Library & Patterns Whitepaper**: Learn how the design language and tokens are applied to UI components and patterns
- **Implementation Guide Whitepaper**: Get practical guidance on implementing the design language and tokens in your applications
- **Fabric UI Kit**: Access the design tokens and components in Figma
- **Fluent 2 Website**: Explore the underlying design system that forms the foundation of the Fabric UX System 