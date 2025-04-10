---
title: "Common Design Tokens"
id: "concept.common-tokens"
area: "concepts"
tags: ["tokens", "design-tokens", "styling", "reference", "fabric-ux"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Common Design Tokens

This document highlights some of the most commonly used design tokens from the `@fabric-msft/tokens` package when building or styling Fabric UX System components. It is intended as a quick reference and is not exhaustive.

These tokens form the basis of the Fabric UX design language and ensure visual consistency.

For the complete list of token names and the full `Theme` structure, please refer to the source files within the Fabric UX System repository (Placeholder: Link to Fabric UX repository tokens package when available).

## Color Tokens

Colors are categorized primarily by usage (Neutral, Brand, Status) and layer (Foreground, Background, Border).

### Neutral Colors (Grays)

Used for standard UI surfaces, text, borders, and interactive states.

- `colorNeutralForeground1`: Primary text color.
- `colorNeutralForeground2`: Secondary text color (e.g., placeholder text, descriptions).
- `colorNeutralForegroundDisabled`: Text color for disabled elements.
- `colorNeutralBackground1`: Default page/surface background.
- `colorNeutralBackground2`: Subtle background for elements like cards or menus.
- `colorNeutralBackgroundDisabled`: Background for disabled elements.
- `colorNeutralStroke1`: Default border color for controls like inputs, buttons (outline).
- `colorNeutralStrokeAccessible`: Border color ensuring accessibility against backgrounds. Often used for focus outlines.
- `colorNeutralStrokeDisabled`: Border color for disabled elements.

### Brand Colors (Primary Theme Color)

Used for primary actions, accents, and highlighting active states. Values depend on the specific theme (e.g., Fabric Light, Fabric Dark).

- `colorBrandForeground1`: Brand color text (e.g., on primary buttons).
- `colorBrandBackground`: Primary brand background color (e.g., primary button background).
- `colorBrandBackgroundHover`: Hover state for brand backgrounds.
- `colorBrandBackgroundPressed`: Pressed state for brand backgrounds.
- `colorBrandStroke1`: Brand color border (less common, sometimes for focused brand elements).

### Status Colors

Used to indicate success, warning, danger, or informational states.

- `colorStatusSuccessBackground1`: Background for success indicators (e.g., MessageBar).
- `colorStatusSuccessForeground1`: Foreground/text for success indicators.
- `colorStatusWarningBackground1`: Background for warning indicators.
- `colorStatusWarningForeground1`: Foreground/text for warning indicators.
- `colorStatusDangerBackground1`: Background for danger/error indicators.
- `colorStatusDangerForeground1`: Foreground/text for danger/error indicators.
- `colorStatusInfoBackground1`: Background for informational indicators.
- `colorStatusInfoForeground1`: Foreground/text for informational indicators.

## Typography Tokens

- `fontFamilyBase`: Default font family for UI text.
- `fontSizeBase300`: Standard body text size (often 14px). Other sizes (`100` - `600`) available.
- `fontSizeHero700` - `fontSizeHero1000`: Larger sizes for headings.
- `fontWeightRegular`: Standard font weight.
- `fontWeightSemibold`: Common weight for titles, labels, bold text.
- `lineHeightBase300`: Standard line height corresponding to `fontSizeBase300`.

## Spacing Tokens

Used for margins, padding, and gaps between elements.

- `spacingHorizontalS`: Small horizontal spacing.
- `spacingHorizontalM`: Medium horizontal spacing (common default).
- `spacingHorizontalL`: Large horizontal spacing.
- `spacingVerticalS`: Small vertical spacing.
- `spacingVerticalM`: Medium vertical spacing.
- `spacingVerticalL`: Large vertical spacing.
- *(Various sizes from `XXS` to `XXXL` and `SNudge`/`MNudge` exist).*

## Border Radius Tokens

Used for rounding corners of elements like buttons, inputs, cards.

- `borderRadiusMedium`: Default rounded corner size.
- `borderRadiusSmall`: Smaller radius.
- `borderRadiusLarge`: Larger radius.
- `borderRadiusCircular`: Fully rounded (e.g., for circular buttons).
- `borderRadiusNone`: No rounding (square corners).

## Stroke Width Tokens

Used for border thickness.

- `strokeWidthThin`: Standard border width (typically 1px).
- `strokeWidthThick`: Thicker border, often used for focus indicators.

## Shadow Tokens

Used for elevation effects on elements like cards, menus, dialogs.

- `shadow4`: Subtle shadow.
- `shadow8`: Medium shadow (common for floating elements like menus).
- `shadow16`: Deeper shadow.
- `shadow28`, `shadow64`: Very deep shadows (e.g., for dialogs).

Remember to use these tokens semantically via their CSS Custom Property names (e.g., `var(--colorNeutralForeground1)`) within your component styles to ensure consistency and theme adaptability.

## Learn More

- [Design Tokens Overview](/concepts/design-tokens)
- [Styling Components](/guides/styling-components)
