---
title: "Accessibility Guidelines"
id: "concept.accessibility"
area: "concepts"
tags: ["accessibility", "a11y", "wcag", "fabric-ux"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Accessibility Guidelines

Accessibility is a core principle of the Fabric UX System, ensuring that experiences built with the system are usable by everyone, including people with disabilities. The system is designed to meet or exceed the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA standards and Microsoft's internal accessibility requirements.

## Implementation Approach

The Fabric UX System takes a holistic approach to accessibility, considering it at every stage of the design and development process:

```
            ACCESSIBILITY IMPLEMENTATION
            
┌─────────────────────────────────────────────────────┐
│                                                     │
│  DESIGN → DEVELOP → TEST → VALIDATE                 │
│                                                     │
│  ┌─────────────┐    ┌─────────────┐                 │
│  │ Inclusive   │───▶│ Semantic    │                 │
│  │ Design      │    │ HTML        │                 │
│  └─────────────┘    └──────┬──────┘                 │
│                            │                        │
│                            ▼                        │
│  ┌─────────────┐    ┌─────────────┐                 │
│  │ User        │◀───│ ARIA        │                 │
│  │ Testing     │    │ Attributes  │                 │
│  └──────┬──────┘    └──────┬──────┘                 │
│         │                  │                        │
│         ▼                  ▼                        │
│  ┌─────────────────────────────────┐                │
│  │ WCAG 2.2 AA COMPLIANCE          │                │
│  └─────────────────────────────────┘                │
│                                                     │
└─────────────────────────────────────────────────────┘
```

By following this approach, the Fabric UX System ensures that accessibility is not an afterthought but an integral part of the design and development process.

## Assistive Technologies

Assistive technologies are hardware or software that help people with disabilities use computers and digital products. The Fabric UX System is designed to work seamlessly with these technologies.

### Screen Readers

Screen readers are software programs that read digital content aloud to users who are blind or have low vision. The Fabric UX System components are designed to provide appropriate information to screen readers through:

- **Semantic HTML**: Using the correct HTML elements to convey meaning and structure
- **ARIA attributes**: Adding ARIA (Accessible Rich Internet Applications) attributes to provide additional information
- **Focus management**: Ensuring that focus is managed appropriately for keyboard navigation
- **Text alternatives**: Providing text alternatives for non-text content

Popular screen readers include:
- JAWS (Job Access With Speech)
- NVDA (NonVisual Desktop Access)
- VoiceOver (built into macOS and iOS)
- TalkBack (built into Android)
- Narrator (built into Windows)

### Keyboard Navigation

Many users with motor disabilities rely on keyboard navigation instead of a mouse or touchscreen. The Fabric UX System components support keyboard accessibility through:

- **Focus indicators**: Visible indicators showing which element has keyboard focus
- **Logical tab order**: Following the visual layout of the page
- **Keyboard shortcuts**: For common actions
- **No keyboard traps**: Ensuring users can navigate to and from all interactive elements using the keyboard

### Speech Recognition

Speech recognition software allows users to control applications using voice commands. The Fabric UX System components work with speech recognition through:

- **Visible labels**: For all interactive elements
- **Unique names**: For all interactive elements
- **Simple commands**: For common actions

### Screen Magnifiers

Screen magnifiers enlarge portions of the screen for users with low vision. The Fabric UX System components work with screen magnifiers through:

- **Responsive design**: Adapting to different zoom levels
- **High contrast**: Supporting high contrast modes
- **Text scaling**: Ensuring text scales appropriately when zoomed

## High Contrast Mode Support

The Fabric UX System includes comprehensive support for high contrast mode, which is essential for users with low vision or light sensitivity. High contrast mode increases the color contrast of the UI, making it easier to distinguish between different elements.

All components are designed to work in high contrast mode, with special attention to:

- **Proper contrast ratios**: Ensuring sufficient contrast between text and background
- **Border visibility**: Making sure borders and boundaries remain visible
- **Focus indicators**: Providing clear focus indicators that are visible in high contrast mode
- **Icon visibility**: Ensuring icons are visible and recognizable

## WCAG 2.2 Guidelines Implementation

The Fabric UX System is designed to meet or exceed WCAG 2.2 Level AA standards across these four principles:

### 1. Perceivable

Information and user interface components must be presentable to users in ways they can perceive:

- **Text alternatives**: All non-text content has text alternatives
- **Time-based media**: Alternatives are provided for time-based media
- **Adaptable**: Content can be presented in different ways without losing information
- **Distinguishable**: Content is easy to see and hear

### 2. Operable

User interface components and navigation must be operable:

- **Keyboard accessible**: All functionality is available from a keyboard
- **Enough time**: Users have enough time to read and use content
- **Seizures and physical reactions**: Content doesn't cause seizures or physical reactions
- **Navigable**: Users can navigate, find content, and determine where they are
- **Input modalities**: Multiple ways to operate functionality beyond keyboard

### 3. Understandable

Information and the operation of the user interface must be understandable:

- **Readable**: Text content is readable and understandable
- **Predictable**: Pages appear and operate in predictable ways
- **Input assistance**: Users are helped to avoid and correct mistakes

### 4. Robust

Content must be robust enough to be interpreted by various user agents, including assistive technologies:

- **Compatible**: Content is compatible with current and future user agents
- **Parsing**: Content can be parsed by assistive technologies
- **Name, role, value**: User interface component information is available to assistive technologies

## WCAG 2.2 Updates

The Fabric UX System incorporates the latest WCAG 2.2 updates, particularly focusing on two key criteria:

### Dragging Movements (2.5.7, Level AA)

This criterion requires that dragging functionality also works with single pointer clicks, helping users with motor disabilities and limited hand mobility.

Key implementations include:
- Dialog-based options to set width/height for resizable elements
- Context menu resize options with input fields for table column resizing
- Input fields alongside sliders for setting values directly

### Target Size Minimum (2.5.8, Level AA)

This criterion requires interactive elements to be at least 24×24 CSS pixels, making targets easier to activate for users with motor disabilities or limited dexterity.

Key implementations include:
- Sizing all interactive elements to at least 24×24 pixels
- Adding adequate spacing around smaller controls
- Using padding to extend interactive areas
- Enlarging small elements like chevrons, swatches, and tags

## Developer Guidelines

### Semantic HTML

Use semantic HTML elements to convey meaning and structure:

```html
<!-- Do this -->
<button type="button">Save</button>

<!-- Not this -->
<div onclick="save()">Save</div>
```

Use the correct elements for their intended purpose:
- `<button>` for buttons
- `<a>` for links
- `<h1>` through `<h6>` for headings
- `<ul>`, `<ol>`, `<li>` for lists
- `<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>` for tabular data
- `<form>`, `<fieldset>`, `<legend>`, `<label>`, `<input>` for forms

### ARIA Attributes

Use ARIA attributes to provide additional information to assistive technologies when necessary:

```html
<!-- Labels and descriptions -->
<button aria-label="Close dialog">×</button>
<div aria-labelledby="title" aria-describedby="description">...</div>

<!-- States -->
<button aria-expanded="false">Show more</button>
<div aria-hidden="true">...</div>

<!-- Live regions -->
<div aria-live="polite">Status messages appear here</div>
```

Common ARIA attributes include:
- `aria-label`: Provides a label for elements without visible text
- `aria-labelledby`: Associates an element with its visible label
- `aria-describedby`: Associates an element with its description
- `aria-expanded`: Indicates whether a collapsible element is expanded
- `aria-hidden`: Hides elements from assistive technologies
- `aria-live`: Announces dynamic content changes
- `role`: Defines the role of an element

### Keyboard Accessibility

Ensure all interactive elements are keyboard accessible:

```html
<!-- Ensure all interactive elements have tabindex="0" if they're not natively focusable -->
<div tabindex="0" role="button" onclick="doSomething()" onkeydown="handleKeyDown(event)">
  Interactive element
</div>

<script>
function handleKeyDown(event) {
  // Activate on Enter or Space key
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    doSomething();
  }
}
</script>
```

Key considerations:
- All interactive elements must be focusable
- Focus must be visible and high-contrast
- Tab order should follow the visual layout
- Provide keyboard shortcuts for common actions
- Manage focus appropriately for modals and other interactive elements

### Focus Management

Manage focus appropriately for interactive elements:

```javascript
// When opening a modal dialog
function openDialog() {
  const dialog = document.getElementById('dialog');
  dialog.setAttribute('aria-hidden', 'false');
  dialog.style.display = 'block';
  
  // Save the element that had focus before opening the dialog
  lastFocus = document.activeElement;
  
  // Set focus to the first focusable element in the dialog
  const firstFocusable = dialog.querySelector('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
  firstFocusable.focus();
}

// When closing a modal dialog
function closeDialog() {
  const dialog = document.getElementById('dialog');
  dialog.setAttribute('aria-hidden', 'true');
  dialog.style.display = 'none';
  
  // Return focus to the element that had focus before opening the dialog
  lastFocus.focus();
}
```

Key considerations:
- Set initial focus appropriately when a modal or dialog opens
- Return focus to the triggering element when a modal or dialog closes
- Trap focus within modals and dialogs while they are open
- Provide a way to skip repetitive navigation
- Ensure that focus is visible at all times

### Color and Contrast

Ensure sufficient color contrast and don't rely solely on color for information:

```css
/* Ensure text has sufficient contrast against its background */
.text {
  /* WCAG AA requires a contrast ratio of at least 4.5:1 for normal text */
  color: #333; /* Dark gray on white background */
  background-color: #fff;
}

/* Provide additional visual cues beyond color */
.error-message {
  color: #d32f2f; /* Red text for errors */
  border-left: 4px solid #d32f2f; /* Additional visual cue */
  padding-left: 8px;
}
```

Key considerations:
- Text should have a contrast ratio of at least 4.5:1 against its background
- Don't rely on color alone to convey information
- Provide additional visual cues (icons, patterns, borders)
- Test color combinations for color blindness
- Support high contrast modes

### Text Alternatives

Provide text alternatives for non-text content:

```html
<!-- Images -->
<img src="chart.png" alt="Bar chart showing sales by region for Q3 2024">

<!-- Icons -->
<span class="icon icon-delete" aria-label="Delete item"></span>

<!-- Complex visualizations -->
<div role="img" aria-label="Simple visualization description">
  <!-- Complex visualization -->
  <div aria-hidden="true">
    <!-- Visual elements -->
  </div>
  <a href="detailed-description.html">View detailed description</a>
</div>
```

Key considerations:
- Provide alt text for images that conveys their purpose
- Ensure icons have text alternatives
- Provide descriptions for complex visualizations
- Ensure that decorative elements are hidden from screen readers

## Common Accessibility Pitfalls and Solutions

### Non-semantic HTML

**Problem**: Using `<div>` or `<span>` for interactive elements.

**Solution**: Use semantic elements like `<button>`, `<a>`, and `<input>`.

### Missing Text Alternatives

**Problem**: Images and icons without text alternatives.

**Solution**: Add `alt` text for images and `aria-label` for icons.

### Insufficient Color Contrast

**Problem**: Text with poor contrast against backgrounds.

**Solution**: Ensure a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.

### Keyboard Inaccessibility

**Problem**: Elements that can't be accessed or operated with a keyboard.

**Solution**: Make all interactive elements keyboard accessible with visible focus indicators.

### Missing Focus Indicators

**Problem**: No visible indication of keyboard focus.

**Solution**: Add visible focus styles with sufficient contrast.

### Improper Heading Structure

**Problem**: Using headings for styling rather than structure, or skipping heading levels.

**Solution**: Use headings to create a logical document structure and don't skip levels.

### Form Labels

**Problem**: Form fields without associated labels.

**Solution**: Use `<label>` elements or appropriate ARIA attributes.

### Dynamic Content

**Problem**: Content changes not announced to screen reader users.

**Solution**: Use ARIA live regions to announce updates.

## Testing and Validation

To ensure your application meets accessibility standards:

### Automated Testing Tools

Use these tools to catch common issues:
- [Axe](https://www.deque.com/axe/)
- [Lighthouse](https://developers.google.com/web/tools/lighthouse)
- [Microsoft Accessibility Insights](https://accessibilityinsights.io/)
- [WAVE](https://wave.webaim.org/)

### Manual Testing

Supplement automated testing with these manual checks:
- Keyboard navigation: Test tabbing through your interface
- Screen reader testing: Use NVDA, JAWS, VoiceOver, or Narrator
- High contrast mode: Test with Windows High Contrast mode
- Zoom testing: Test at 200% zoom

### User Testing

Include people with disabilities in your testing:
- Recruit participants with diverse abilities
- Test with various assistive technologies
- Gather feedback on usability and accessibility

## Learn More

- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [Microsoft Accessibility Resources](https://www.microsoft.com/accessibility)
- [Component Accessibility](/components/overview#accessibility)
- [Content Design Guidelines](/concepts/content-style)
