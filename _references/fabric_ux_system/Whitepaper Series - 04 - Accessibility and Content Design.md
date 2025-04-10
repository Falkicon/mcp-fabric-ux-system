# Fabric UX System: Accessibility and Content Design

*Ensuring inclusive experiences and clear communication for all users*

> **Author:** Jason Falk & The Fabric UX Team  
> **Last Updated:** February 28, 2025  
> **Version:** 0.1  
> **Status:** Draft  

## Executive Summary

The Fabric UX System prioritizes accessibility and content design as core principles, ensuring that experiences built with the system are usable by everyone, including people with disabilities. This whitepaper provides comprehensive guidance on accessibility standards, WCAG 2.2 implementation, content design principles, terminology guidelines, and writing style recommendations.

By following these guidelines, teams can create experiences that are not only compliant with accessibility standards but also provide clear, consistent, and user-centered content that enhances the overall user experience within Microsoft Fabric.

## Accessibility Overview

Accessibility is a core principle of the Fabric UX System, ensuring that experiences built with the system are usable by everyone, including people with disabilities. The system is designed to meet or exceed the Web Content Accessibility Guidelines (WCAG) 2.2 Level AA standards and Microsoft's internal accessibility requirements.

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

### Understanding Assistive Technologies

Assistive technologies are hardware or software that help people with disabilities use computers and digital products. The Fabric UX System is designed to work seamlessly with these technologies, including:

#### Screen Readers

Screen readers are software programs that read digital content aloud to users who are blind or have low vision. The Fabric UX System components are designed to provide appropriate information to screen readers, including:

- **Semantic HTML**: Using the correct HTML elements to convey meaning and structure
- **ARIA attributes**: Adding ARIA (Accessible Rich Internet Applications) attributes to provide additional information to screen readers
- **Focus management**: Ensuring that focus is managed appropriately for keyboard navigation
- **Text alternatives**: Providing text alternatives for non-text content

Popular screen readers include:
- JAWS (Job Access With Speech)
- NVDA (NonVisual Desktop Access)
- VoiceOver (built into macOS and iOS)
- TalkBack (built into Android)
- Narrator (built into Windows)

#### Keyboard Navigation

Many users with motor disabilities rely on keyboard navigation rather than a mouse or touchscreen. The Fabric UX System components are designed to be fully keyboard accessible, including:

- **Focus indicators**: Visible focus indicators that show which element has keyboard focus
- **Logical tab order**: A logical tab order that follows the visual layout of the page
- **Keyboard shortcuts**: Keyboard shortcuts for common actions
- **No keyboard traps**: Ensuring that users can navigate to and from all interactive elements using the keyboard

#### Speech Recognition

Speech recognition software allows users to control computers and digital products using voice commands. The Fabric UX System components are designed to work with speech recognition software, including:

- **Visible labels**: Visible labels for all interactive elements
- **Unique names**: Unique names for all interactive elements
- **Simple commands**: Simple commands for common actions

#### Screen Magnifiers

Screen magnifiers enlarge portions of the screen for users with low vision. The Fabric UX System components are designed to work with screen magnifiers, including:

- **Responsive design**: Responsive design that adapts to different zoom levels
- **High contrast**: High contrast modes that make content easier to see
- **Text scaling**: Text that scales appropriately when zoomed

### Microsoft Accessibility Standards

Microsoft has established internal accessibility standards that go beyond WCAG requirements in some areas. The Fabric UX System is designed to meet or exceed these standards, including:

- **Inclusive design**: Designing for a diverse range of users with different abilities and needs
- **Accessible by default**: Making accessibility a core part of the design and development process
- **Testing with assistive technologies**: Testing with a variety of assistive technologies to ensure compatibility
- **User research with people with disabilities**: Including people with disabilities in user research and testing

The Fabric UI Web Components adhere to Microsoft accessibility standards, aligning closely with Power BI specifications. This alignment ensures that experiences built with the Fabric UX System meet Microsoft's high standards for accessibility and provide a consistent experience across Microsoft products.

### High Contrast Mode Support

The Fabric UX System includes comprehensive support for high contrast mode, which is essential for users with low vision or light sensitivity. High contrast mode increases the color contrast of the user interface, making it easier to distinguish between different elements.

All components in the Fabric UX System are designed to work well in high contrast mode, with ongoing improvements and fixes for specific high-contrast issues. This ensures that users who rely on high contrast mode can effectively use applications built with the Fabric UX System.

Key aspects of high contrast mode support include:

- **Proper contrast ratios**: Ensuring sufficient contrast between text and background
- **Border visibility**: Making sure borders and boundaries are visible in high contrast mode
- **Focus indicators**: Providing clear focus indicators that are visible in high contrast mode
- **Icon visibility**: Ensuring that icons are visible and recognizable in high contrast mode

### Compliance with WCAG Guidelines

The Web Content Accessibility Guidelines (WCAG) are the industry standard for web accessibility. The Fabric UX System is designed to meet or exceed WCAG 2.2 Level AA standards, which include:

#### Perceivable

Information and user interface components must be presentable to users in ways they can perceive:

- **Text alternatives**: Provide text alternatives for non-text content
- **Time-based media**: Provide alternatives for time-based media
- **Adaptable**: Create content that can be presented in different ways without losing information or structure
- **Distinguishable**: Make it easier for users to see and hear content

#### Operable

User interface components and navigation must be operable:

- **Keyboard accessible**: Make all functionality available from a keyboard
- **Enough time**: Provide users enough time to read and use content
- **Seizures and physical reactions**: Do not design content in a way that is known to cause seizures or physical reactions
- **Navigable**: Provide ways to help users navigate, find content, and determine where they are
- **Input modalities**: Make it easier for users to operate functionality through various inputs beyond keyboard

#### Understandable

Information and the operation of the user interface must be understandable:

- **Readable**: Make text content readable and understandable
- **Predictable**: Make web pages appear and operate in predictable ways
- **Input assistance**: Help users avoid and correct mistakes

#### Robust

Content must be robust enough that it can be interpreted by a wide variety of user agents, including assistive technologies:

- **Compatible**: Maximize compatibility with current and future user agents, including assistive technologies
- **Parsing**: Ensure that content can be parsed by assistive technologies
- **Name, role, value**: Ensure that the name, role, and value of user interface components are available to assistive technologies

### Developer Guidelines for Accessibility

Developers implementing the Fabric UX System should follow these guidelines to ensure accessibility:

#### Semantic HTML

Use semantic HTML elements to convey meaning and structure:

- Use `<button>` for buttons, not `<div>` or `<span>`
- Use `<a>` for links, not `<div>` or `<span>`
- Use heading elements (`<h1>` through `<h6>`) for headings
- Use list elements (`<ul>`, `<ol>`, `<li>`) for lists
- Use table elements (`<table>`, `<thead>`, `<tbody>`, `<tr>`, `<th>`, `<td>`) for tabular data
- Use form elements (`<form>`, `<fieldset>`, `<legend>`, `<label>`, `<input>`, `<select>`, `<textarea>`) for forms

#### ARIA Attributes

Use ARIA attributes to provide additional information to assistive technologies:

- Use `aria-label` to provide a label for elements that don't have visible text
- Use `aria-labelledby` to associate an element with its label
- Use `aria-describedby` to associate an element with its description
- Use `aria-expanded` to indicate whether a collapsible element is expanded or collapsed
- Use `aria-hidden` to hide elements from assistive technologies
- Use `aria-live` to announce dynamic content changes
- Use `role` to define the role of an element

#### Keyboard Accessibility

Ensure that all interactive elements are keyboard accessible:

- Ensure that all interactive elements can receive keyboard focus
- Ensure that focus is visible and high-contrast
- Ensure that the tab order follows the visual layout of the page
- Provide keyboard shortcuts for common actions
- Ensure that keyboard focus is managed appropriately for modals and other interactive elements

#### Focus Management

Manage focus appropriately for interactive elements:

- Set initial focus appropriately when a modal or dialog opens
- Return focus to the triggering element when a modal or dialog closes
- Trap focus within modals and dialogs while they are open
- Provide a way to skip repetitive navigation
- Ensure that focus is visible at all times

#### Color and Contrast

Ensure that color and contrast meet accessibility standards:

- Ensure that text has sufficient contrast against its background
- Do not rely on color alone to convey information
- Provide alternative visual cues for color-based information
- Test color combinations for color blindness
- Provide high contrast modes for users with low vision

#### Text Alternatives

Provide text alternatives for non-text content:

- Provide alt text for images
- Provide captions and transcripts for audio and video
- Provide descriptions for complex visualizations
- Ensure that icons and other visual elements have text alternatives

#### Testing

Test for accessibility throughout the development process:

- Use automated testing tools to identify basic accessibility issues
- Conduct manual testing with keyboard navigation
- Test with screen readers and other assistive technologies
- Include people with disabilities in user testing
- Validate against WCAG 2.2 Level AA standards

### Common Accessibility Pitfalls and Solutions

#### Pitfall: Non-semantic HTML

**Problem**: Using non-semantic HTML elements like `<div>` and `<span>` for interactive elements.

**Solution**: Use semantic HTML elements like `<button>`, `<a>`, and `<input>` for interactive elements.

#### Pitfall: Missing Text Alternatives

**Problem**: Images, icons, and other non-text content without text alternatives.

**Solution**: Provide alt text for images, aria-label for icons, and descriptions for complex visualizations.

#### Pitfall: Insufficient Color Contrast

**Problem**: Text with insufficient contrast against its background.

**Solution**: Ensure that text has a contrast ratio of at least 4.5:1 for normal text and 3:1 for large text.

#### Pitfall: Keyboard Inaccessibility

**Problem**: Interactive elements that cannot be accessed or operated using the keyboard.

**Solution**: Ensure that all interactive elements can receive keyboard focus and be operated using the keyboard.

#### Pitfall: Missing Focus Indicators

**Problem**: No visible indication of which element has keyboard focus.

**Solution**: Provide visible focus indicators with sufficient contrast.

#### Pitfall: Improper Heading Structure

**Problem**: Headings used for styling rather than structure, or skipping heading levels.

**Solution**: Use headings to create a logical document structure, and do not skip heading levels.

#### Pitfall: Form Labels

**Problem**: Form fields without associated labels.

**Solution**: Use the `<label>` element to associate labels with form fields, or use aria-label or aria-labelledby.

#### Pitfall: Dynamic Content

**Problem**: Dynamic content changes that are not announced to screen reader users.

**Solution**: Use aria-live regions to announce dynamic content changes.

### WCAG 2.2 Updates

The Fabric UX system incorporates the latest Web Content Accessibility Guidelines (WCAG) 2.2 updates. The two most significant changes affecting component design are:

#### Dragging Movements (2.5.7, Level AA)

This criterion requires that dragging functionality also works with single pointer clicks. This helps users with motor disabilities, limited hand mobility, older adults, and those using assistive technologies.

Key implementations include:
- Dialog-based options to set width/height for resizable drawers and panels
- Context menu resize options with input fields for table column resizing
- Input fields alongside sliders for setting values directly

#### Target Size Minimum (2.5.8, Level AA)

This criterion requires interactive elements to be at least 24×24 CSS pixels, with exceptions for spacing, equivalent controls, inline text, user agent controls, and essential presentations. This makes targets easier to activate for users with motor disabilities, limited dexterity, and older adults.

Key implementations include:
- Sizing all buttons, controls, and interactive elements to at least 24×24 pixels
- Adding adequate spacing around smaller controls
- Using padding to extend interactive areas
- Enlarging small elements like chevrons, swatches, and tags

The Fabric UX system components receive continuous updates to meet these requirements, ensuring accessibility for the widest possible audience.

## Content Design

Content design is about delivering timely, relevant information to users so they can get their jobs done. It involves creating and organizing written content on-screen, while also considering visual design elements such as placement and appearance of the content in relation to the icons and controls. Guided by user experience principles, content design is about creating engaging, accessible, and easy-to-understand experiences.

### Focus Areas

Content design in the Fabric UX System focuses on:

- **User-centered approach**: Using research on user behavior and scenarios to prioritize the needs and preferences of the target audience.
- **Clarity and accessibility**: Ensuring the content is clear, coherent, concise, and accessible to all users.
- **Content strategy**: Aligning content, including terminology, with organizational goals, target audience, messaging, and distribution channels.
- **Consistency and usability**: Ensuring that the language is consistent and easily understood within your workload and across workloads within Fabric.

### Best Practices

- **Know your audience**: Fabric audiences vary from business decision makers to developers, and business consumers, admins, data scientists, and data analysts in between. Understand who you're designing for and what they're trying to do.
- **Know the names of the Fabric UX elements**: Just as Fabric uses a distinct color palette, iconography and layout language, we have an established, distinct vocabulary that is used consistently throughout the product.
- **Know how language is used in Fabric**: The language in Fabric is simple and plain, in an informal voice. We follow the Microsoft Writing Style guide, unless stated otherwise, content:
  - Is in the present tense. For example, select the option vs. you will select an option.
  - Uses active voice. For example, Update group settings vs The group settings can be updated.
  - Is in the second person. For example, use 'you,' not 'we' or 'they'.
  - Avoids jargon and acronyms, for example, use continuous integration/continuous deployment instead of CI/CD pipeline.

### Writing Style and Voice

The Fabric UX System uses a consistent writing style and voice across all content:

#### Voice

The voice of the Fabric UX System is:

- **Friendly but professional**: Approachable and helpful, but not overly casual or informal
- **Clear and concise**: Direct and to the point, without unnecessary words or jargon
- **Confident but humble**: Authoritative without being condescending or arrogant
- **Inclusive**: Respectful of all users, regardless of background or ability

#### Style

The style of the Fabric UX System content is:

- **Simple and direct**: Using simple words and sentence structures
- **Active voice**: Using active voice rather than passive voice
- **Present tense**: Using present tense rather than future tense
- **Second person**: Using "you" to address the user directly
- **Consistent terminology**: Using consistent terminology across all content
- **Concise**: Using as few words as possible to convey the message

### Terminology

Microsoft Fabric uses dedicated terminology to describe its functionality and surfaces. When developing applications for Fabric, it's important to use consistent terminology. Key terms include:

| Term | Definition |
|------|------------|
| Admin center | The Microsoft Fabric Admin center contains system-wide settings used by administrators to manage Fabric functionality within their organizational tenant. |
| Apps | Collections of Power BI dashboards and reports packaged together in one easy-to-find place. |
| Canvas | The area within the Fabric window where users manage, create, and interact with their items. |
| Capacity | The actual or potential ability of a resource to perform an activity or produce output in a specified time period (e.g., CPU count, memory, storage). |
| Default item | An item generated automatically when a user creates a different item, dependent on the other item. |
| Domain | A logical unit for aggregating workspaces at a sub-tenant level, containing sets of workspaces that can be mapped to business units, regions, or other divisional hierarchies. |
| Item type | A file created by a user containing metadata that instructs Fabric on how to manage data (storing, transporting, cleaning, analyzing, etc.). |
| OneLake | A single, unified, logical data lake for all an organization's analytics data, with each Microsoft Fabric tenant having its own instance. |
| Shortcut | A link users create to make external data available via OneLake in the Explorer tree. |
| Task flow | A template guiding users on how to create, organize, and manage their solution and items within it. |
| Workload | A collection of related capabilities packaged together under a single name and logo, targeting a specific persona. |
| Workspace | A user interface area designed for collaboration with assigned compute capabilities, capacity, and license where users develop end-to-end data solutions. |

Using consistent terminology ensures clear communication and helps users understand the system more easily.

### Content Guidelines for UI Elements

#### Buttons

- Use clear, concise action verbs
- Be specific about the action
- Use sentence case (capitalize only the first word)
- Avoid punctuation
- Examples: "Save", "Cancel", "Create workspace"

#### Labels

- Be concise and descriptive
- Use sentence case
- Avoid punctuation
- Examples: "Name", "Description", "Created date"

#### Error Messages

- Be clear about what went wrong
- Provide guidance on how to fix the issue
- Use a friendly, non-blaming tone
- Examples: "Unable to save. Check your connection and try again."

#### Empty States

- Explain why the state is empty
- Provide guidance on what to do next
- Use a friendly, encouraging tone
- Examples: "No items found. Try adjusting your search or filter."

#### Tooltips

- Provide additional context or explanation
- Be concise and focused
- Use sentence case and end with a period
- Examples: "Sort items by name, date, or type."

#### Notifications

- Be clear about what happened
- Provide context and next steps if needed
- Use a friendly, informative tone
- Examples: "Workspace created successfully. You can now add items to it."

### Resources

#### Spelling and Definitions

The Fabric UX System uses the [American Heritage Dictionary (AHD)](https://www.ahdictionary.com/) for spelling and definitions.

#### Style Guide

The Fabric UX System follows the [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/) for all content creation.

## Testing and Validation

### Accessibility Testing

Accessibility testing should be conducted throughout the design and development process:

#### Automated Testing

Automated testing tools can identify many accessibility issues, but they cannot catch everything. Use tools like:

- Axe
- Lighthouse
- WAVE
- Microsoft Accessibility Insights

#### Manual Testing

Manual testing is essential for identifying issues that automated tools cannot catch:

- Keyboard navigation testing
- Screen reader testing
- Color contrast testing
- Zoom testing
- High contrast mode testing

#### User Testing

Testing with real users, including people with disabilities, is the most effective way to identify accessibility issues:

- Include people with different disabilities in user testing
- Test with different assistive technologies
- Test in different environments and contexts
- Gather feedback on usability and accessibility

### Content Testing

Content testing helps ensure that content is clear, concise, and effective:

#### Readability Testing

Readability testing assesses how easy it is to read and understand content:

- Use readability formulas like Flesch-Kincaid
- Test with real users to assess comprehension
- Review for jargon, complex language, and unnecessary words

#### Consistency Testing

Consistency testing ensures that terminology and style are consistent across the application:

- Review for consistent terminology
- Check for consistent capitalization and punctuation
- Ensure that voice and tone are consistent

#### Localization Testing

Localization testing ensures that content can be effectively translated and localized:

- Avoid idioms and culturally specific references
- Use simple, clear language
- Allow for text expansion in translations
- Test with localized content to identify issues

## Requirements Addressed

This whitepaper addresses the following key requirements of the Fabric UX System:

✅ **WCAG 2.2 Compliance**: Components must meet or exceed WCAG 2.2 Level AA accessibility standards and Microsoft's internal accessibility requirements.
> **Met by**: Accessibility built into components from the ground up, with testing against WCAG 2.2 standards.

✅ **High Contrast Mode**: Components must support high contrast mode for users with low vision or light sensitivity.
> **Met by**: Comprehensive high contrast mode support with ongoing improvements for specific issues.

✅ **Keyboard Accessibility**: Components must be designed with keyboard accessibility as a core requirement.
> **Met by**: All interactive elements designed to be fully keyboard accessible with proper focus management.

✅ **ARIA and Semantic HTML**: Components must provide appropriate ARIA attributes and semantic HTML elements.
> **Met by**: Proper use of semantic HTML and ARIA attributes to provide information to assistive technologies.

✅ **Screen Reader Support**: Components must support screen reader announcements for dynamic content changes.
> **Met by**: Use of aria-live regions and proper focus management for dynamic content changes.

✅ **Color Contrast**: Components must ensure sufficient color contrast ratios that meet WCAG 2.2 standards.
> **Met by**: Color contrast ratios of at least 4.5:1 for normal text and 3:1 for large text and UI components.

✅ **Color Independence**: Components must not rely on color alone to convey information.
> **Met by**: Additional visual cues beyond color to convey information for users with color vision deficiencies.

✅ **Target Size**: Interactive elements must have a minimum target size of 24×24 CSS pixels as per WCAG 2.2.
> **Met by**: Sizing all buttons, controls, and interactive elements to at least 24×24 pixels.

✅ **Dragging Alternatives**: Dragging functionality must have single pointer alternatives as per WCAG 2.2.
> **Met by**: Alternative methods for dragging operations, such as dialog-based options and input fields.

✅ **Content Design Guidelines**: The system must provide content design guidelines that align with Microsoft's writing style guide.
> **Met by**: Content design guidelines based on Microsoft Writing Style Guide for clear, consistent content.

✅ **Internationalization**: Components must support internationalization and localization of content.
> **Met by**: Components designed to support globalization, responsiveness, and multiple input methods.

✅ **Clear Content Guidance**: The system must provide guidance on writing clear, concise, and accessible content.
> **Met by**: Best practices for creating effective content that is clear, coherent, and accessible.

✅ **RTL Support**: Components must support right-to-left (RTL) languages and bidirectional text.
> **Met by**: Components designed to adapt to varied regions and languages, including RTL support.

✅ **Terminology Guidelines**: The system must provide terminology guidelines for consistent language across applications.
> **Met by**: Consistent terminology guidelines for Microsoft Fabric functionality and surfaces.

✅ **Text Expansion**: Components must accommodate text expansion in translations without breaking layouts.
> **Met by**: Flexible layouts that accommodate text expansion in translations without breaking.

✅ **Error Messages**: The system must provide guidance on creating accessible error messages and notifications.
> **Met by**: Guidelines for creating clear, actionable error messages and notifications.

✅ **Accessibility Testing**: Components must undergo rigorous testing for accessibility compliance.
> **Met by**: Comprehensive accessibility testing including automated tools and manual testing.

✅ **User Testing**: Components must be tested with real users, including people with disabilities.
> **Met by**: User testing with diverse users, including people with disabilities.

For a complete list of all requirements and how they are met, please refer to the "[Requirements and Compliance](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/ETE64EeUg1JNnFtDgVCRDkcBMycPFYojTGl-naYTcQ4qEg?e=h2yW46)" whitepaper (07).

## About This Whitepaper Series

This whitepaper is part of a series that provides comprehensive information about the Fabric UX System:

1. **[Executive Overview](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EVLsz1jmMEFIkoxdbsBvb0cBkRq41NcyKzeiknQv-LJuKQ?e=PEAJPy)**: High-level introduction to the Fabric UX System, its purpose, and key benefits.
2. **[Design Language and Tokens](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EViEdV3OoJ9PkRDZRDmouCwB4S_GCDoK2h-F8rmUHuWS0A?e=Nkzfgy)**: Detailed information about the design language, design tokens, and theming capabilities.
3. **[Component Library and Patterns](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EaRRL-BAezdNnC2-MfPB1HABeuqSWYraEwQLTXCK6OH4eg?e=b0tfqO)**: Overview of the component library, including available components and UX patterns.
4. **Accessibility and Content Design** (this document): Guidance on accessibility compliance and content design best practices.
5. **[Implementation Guide](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EY3v1PN_bd9Cr_AiAQk0-XABUiXOeGui2DCwV4ysw9tLAQ?e=qUjgWc)**: Technical details for implementing the Fabric UX System in your applications.
6. **[Question and Answer](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/Edvsa9nrjC9PhdWkCMBWPv8BMORBHhHWs1YnucOSl4mVTQ?e=2QRZjU)**: Answers to common questions about the Fabric UX System.
7. **[Requirements and Compliance](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/ETE64EeUg1JNnFtDgVCRDkcBMycPFYojTGl-naYTcQ4qEg?e=h2yW46)**: Comprehensive specification of system requirements and compliance verification.

## Conclusion

Accessibility and content design are core principles of the Fabric UX System, ensuring that experiences built with the system are usable by everyone and provide clear, consistent, and user-centered content. By following the guidelines in this whitepaper, teams can create experiences that are not only compliant with accessibility standards but also provide an excellent user experience for all users.

### Key Takeaways

- Accessibility is a core principle of the Fabric UX System, with components designed to meet or exceed WCAG 2.2 Level AA standards.
- Content design focuses on delivering timely, relevant information to users in a clear, concise, and consistent manner.
- Following accessibility and content design guidelines helps create experiences that are usable by everyone, including people with disabilities.
- Testing and validation are essential parts of the process, ensuring that experiences meet accessibility standards and provide effective content.

### Next Steps

For more information on implementing accessibility and content design in the Fabric UX System, refer to the following resources:

- **Design Language & Tokens Whitepaper**: Learn about the design language and tokens that form the foundation of accessible design.
- **Component Library & Patterns Whitepaper**: Get detailed information on the accessible components and patterns available in the Fabric UX System.
- **Implementation Guide Whitepaper**: Find practical guidance on implementing accessibility and content design in your applications.
- **Microsoft Accessibility Standards**: Access Microsoft's comprehensive accessibility standards and guidelines.
- **Microsoft Writing Style Guide**: Access Microsoft's comprehensive writing style guide for content creation. 