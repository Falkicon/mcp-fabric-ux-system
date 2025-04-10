# Fabric UX System: Component Library and Patterns

*Building blocks and standardized workflows for consistent experiences*

> **Author:** Jason Falk & The Fabric UX Team  
> **Last Updated:** February 28, 2025  
> **Version:** 0.1  
> **Status:** Draft  

## Executive Summary

The Fabric UX System provides a comprehensive set of UI components and shared UX patterns that enable developers to create consistent, accessible, and high-performance experiences across Microsoft Fabric. This whitepaper details the component library's structure, framework compatibility, and performance benefits, as well as the shared UX patterns that standardize common workflows and user interactions.

By leveraging these pre-built components and established patterns, teams can accelerate development, ensure accessibility compliance, and create experiences that align with Microsoft's design language while addressing the specific needs of data-intensive applications within Microsoft Fabric.

## Component Library Overview

The Fabric UX system provides a comprehensive set of UI components that enable developers to create consistent, accessible, and high-performance experiences. These components are built on web standards and are designed to work across different frameworks.

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

### Available Components

The component library is organized into two main categories:

#### Fluent UI Components

These core components form the foundation of the Fabric UX system and include:

- **Accordion/Accordion item**: Vertically stacked interactive headings that toggle content display
- **Anchor button**: Clickable elements styled as buttons that navigate to different locations
- **Avatar**: Graphical representations of users, teams, or entities
- **Badge/Counter badge**: Visual descriptors for UI elements
- **Button**: Elements that enable users to commit changes or complete tasks
- **Checkbox**: UI elements for switching between two mutually exclusive options
- **Compound button**: Versatile buttons with main labels and additional descriptions
- **Dialog**: Components that ask users to confirm actions or decisions
- **Divider**: Elements that segment groups of content
- **Image**: Visual representations of objects or concepts
- **Label**: Elements that provide names or titles to components or groups
- **Menu/Menu button/Menu item/Menu list**: Contextual components that display lists of options
- **Progress bar**: Elements that provide system feedback during processes
- **Radio/Radio group**: Components that let users select one option from multiple choices
- **Slider**: Visual indicators of adjustable content and current settings
- **Spinner**: Indicators that provide system feedback during processes
- **Switch**: Toggle switches for turning options on or off
- **Tabs**: Containers that hold multiple tabs and display selected content
- **Text**: Elements that display static text content
- **Text input**: Controls that allow users to enter text
- **Toggle button**: Buttons that can be toggled on or off

#### Fabric UX Components

These specialized components extend the core Fluent UI components to meet specific Fabric needs:

- **Multi view group/item/controller**: Containers that display multiple views with switching capabilities
- **SVG icon**: SVG icons for visual representation of actions or objects
- **Teaching bubble**: Callouts that provide contextual information or guidance
- **Wizard**: Step-by-step controls that guide users through processes

Each component is designed with accessibility in mind and follows consistent patterns for properties, events, and styling. The components are available for both React and Angular frameworks, ensuring consistent behavior regardless of the technology stack.

### Component Design Principles

The Fabric UX System components adhere to several key design principles:

1. **Consistency**: Components maintain consistent behavior, appearance, and interaction patterns across the system.
2. **Accessibility**: Components are designed to be accessible by default, meeting WCAG 2.2 guidelines.
3. **Performance**: Components are optimized for performance, with minimal dependencies and efficient rendering.
4. **Flexibility**: Components can be customized to meet specific needs while maintaining consistency.
5. **Composability**: Components can be combined to create more complex UI elements and patterns.

### Component Documentation

Each component in the Fabric UX System is thoroughly documented, providing:

- **Usage guidelines**: When and how to use the component
- **Properties and events**: Available properties and events for customization
- **Accessibility considerations**: Specific accessibility features and requirements
- **Code examples**: Examples of how to implement the component
- **Best practices**: Recommendations for effective use of the component

## Framework Compatibility

The Fabric UX system components are built using web components technology, which provides several key advantages:

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

### Seamless Integration with Existing Code

Fabric UX System components integrate with existing codebases without requiring code rewriting. This allows teams to adopt the system incrementally, component by component, rather than needing a complete overhaul of their application.

### Multi-Framework Compatibility

The components work with any framework, including React and Angular, or even without a framework. This reduces the need for component rewrites when changing frameworks and ensures consistent behavior across different technology stacks.

#### React Integration

For React applications, the Fabric UX System provides React wrapper components that make it easy to use web components within React applications. These wrappers provide a React-friendly API and handle the integration with the underlying web components.

Example of using a Fabric UX System component in React:

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

#### Angular Integration

For Angular applications, the Fabric UX System provides Angular modules that make it easy to use web components within Angular applications. These modules provide Angular-friendly APIs and handle the integration with the underlying web components.

Example of using a Fabric UX System component in Angular:

```typescript
import { FabricButtonModule } from '@fabric-msft/angular';

@NgModule({
  imports: [FabricButtonModule],
  // ...
})
export class MyModule { }
```

```html
<fabric-button appearance="primary" (click)="handleClick()">
  Click me
</fabric-button>
```

The Angular wrappers provide compatibility with Angular-specific features including:
- **Content projection**: Supporting Angular's content projection model
- **Templating**: Working with Angular templates
- **Dynamic/lazy component creation**: Supporting dynamic and lazy-loaded components
- **Directives**: Compatibility with Angular directives

These wrappers have been tested with Angular 16 and 17, and future Angular versions are expected to remain compatible unless there are breaking changes to wrapper-specific features. The Web Component inside wrappers is unaffected by Angular version changes, providing stability across framework updates.

### Framework Update Resilience

When updating application frameworks, usually no action is needed to maintain compatibility with Fabric UX System components. Since the components use web standards, they are resistant to breaking changes in framework updates.

### Framework Upgrade Benefits

The Fabric UX System architecture provides significant advantages when upgrading to newer versions of frameworks like React or Angular:

1. **Reduced upgrade risk**: Since the core component functionality is implemented in framework-agnostic Web Components, major framework version upgrades (like React 18 to 19) have minimal impact on your UI components.

2. **Smaller update surface**: Only the thin wrapper layer needs updates during framework upgrades, which is a much smaller effort than refactoring entire component libraries. This wrapper has a smaller API surface than traditional framework-specific components and is largely automated.

3. **Stability during transitions**: Your application's UI remains stable during framework transitions because the underlying Web Components continue to function consistently regardless of framework version changes.

4. **Simplified testing**: Less regression testing is needed after framework upgrades since the core component behavior remains unchanged.

This architecture significantly reduces the technical debt and maintenance burden typically associated with keeping applications current with the latest framework versions.

### API Consistency

While the Fabric UX System API closely resembles Fluent UI React v9's API, it has some unique aspects due to each platform's capabilities. This similarity makes it easier for developers familiar with Fluent UI to adopt the Fabric UX System.

### Availability to Third-Party Developers

Fluent UI Web Components, which form the foundation of the Fabric UX System, are available in the Fluent 2 repository on GitHub. This makes them accessible to both internal Microsoft teams and external third-party developers. Fabric UX System components are available through npm packages.

### Project-Wide Consistency

The components deliver identical code to the browser regardless of the chosen framework, ensuring a unified user experience across different parts of an application, even if they use different frameworks.

## Performance Benefits

Fabric UX System components enhance application performance by delivering browser-native components instead of flat DOM structures. This results in:

### Faster Load Times

Web components are parsed and rendered more efficiently by browsers, resulting in faster initial load times. This is particularly important for large applications with many components.

### Smoother Interactions

Web components use the browser's native rendering pipeline, resulting in smoother interactions and animations. This is especially noticeable on mobile devices and lower-powered computers.

### Lower Memory Usage

Web components have a smaller memory footprint than framework-specific components, resulting in lower memory usage and better performance on memory-constrained devices.

### Better Browser Parsing and Rendering Efficiency

Web components are parsed and rendered more efficiently by browsers, resulting in better performance overall. This is because web components use the browser's native component model rather than a framework-specific implementation.

### Bundle Size Optimization

The impact on bundle size when using Fabric UX System components varies based on the application's architecture, but generally, it is minimal due to leveraging web platform efficiencies. Components can be individually loaded as needed, using techniques like tree-shaking, which eliminates unused code from the final bundle.

This approach means you don't need to load all Fabric UX System components upfront, allowing for more efficient application loading and better performance, especially for larger applications.

### Performance Optimization Techniques

The Fabric UX System components use several performance optimization techniques:

1. **Lazy loading**: Components are loaded only when needed, reducing the initial load time.
2. **Tree shaking**: Unused code is removed during the build process, reducing the bundle size.
3. **Code splitting**: Code is split into smaller chunks that can be loaded on demand, reducing the initial load time.
4. **Efficient rendering**: Components are designed to minimize DOM operations and reflows, resulting in better performance.
5. **Minimal dependencies**: Components have minimal dependencies, reducing the bundle size and improving load times.

## Shared UX Patterns

Shared UX patterns are a collection of repeatable and reusable solutions to common design problems across the Fabric UX System. Unlike basic components, which serve as building blocks without specific user tasks in mind, UX patterns address particular user scenarios and describe how components work together to help users accomplish specific tasks.

```
                SHARED UX PATTERNS
                
┌─────────────────────────────────────────────────────┐
│                                                     │
│  USER NEED → PATTERN SELECTION → IMPLEMENTATION     │
│                                                     │
│  ┌─────────┐     ┌─────────────────────┐            │
│  │ No Data │────▶│ EMPTY STATE PATTERN │            │
│  └─────────┘     └─────────────────────┘            │
│                                                     │
│  ┌─────────┐     ┌─────────────────────┐            │
│  │ Loading │────▶│ PROGRESS INDICATOR  │            │
│  └─────────┘     └─────────────────────┘            │
│                                                     │
│  ┌─────────┐     ┌─────────────────────┐            │
│  │ Feedback│────▶│ NOTIFICATION PATTERN│            │
│  └─────────┘     └─────────────────────┘            │
│                                                     │
│  ┌─────────┐     ┌─────────────────────┐            │
│  │ New Item│────▶│ ITEM CREATION FLOW  │            │
│  └─────────┘     └─────────────────────┘            │
│                                                     │
└─────────────────────────────────────────────────────┘
```

For example, an item creation flow pattern describes a standard sequence of steps for creating new items in a user's workspace, potentially including standardized dialogs, buttons, and inputs from the framework.

By establishing, documenting, and consistently using shared UX patterns, the Fabric UX System creates a cohesive user experience and reduces the time spent reinventing solutions for common challenges.

### Standardized Workflows

Shared UX patterns provide standardized workflows that ensure consistency across different parts of Microsoft Fabric. These workflows guide users through common tasks with familiar interaction models, reducing the learning curve and increasing productivity.

Key benefits of standardized workflows include:
- **Reduced cognitive load**: Users don't need to learn new interaction patterns for similar tasks
- **Increased efficiency**: Familiar patterns allow users to complete tasks more quickly
- **Improved predictability**: Users can anticipate how interactions will behave

### User-Centered Solutions

Each shared UX pattern is designed with specific user scenarios in mind, focusing on the user's goals and needs. This user-centered approach ensures that patterns effectively address real-world use cases and provide intuitive solutions.

The patterns are developed and refined based on:
- **User research**: Understanding how users approach tasks and what challenges they face
- **Usability testing**: Validating that patterns effectively support user goals
- **Iterative improvement**: Continuously refining patterns based on feedback and usage data

### Consistency Across the Platform

Shared UX patterns promote consistency across the Microsoft Fabric platform, creating a unified experience regardless of which workload or feature a user is interacting with. This consistency helps users transfer knowledge between different parts of the platform and builds confidence in their ability to accomplish tasks.

### Common Pattern Examples

#### Empty States

Empty states occur when there's no information or data to show. In the Fabric UX System, empty states are designed to be informative and actionable, helping users understand what they're seeing and what steps they can take next.

##### Anatomy of Empty States

An effective empty state includes several key elements:
1. **Illustration** (optional): Visual element that communicates the purpose of the empty state
2. **Title**: States the main action with first-word capitalization and no period
3. **Body content** (optional): Provides a short explanation or instructions
4. **Link text** (optional): Actionable text that helps users understand where the link will take them
5. **Button label** (optional): Clear, concise call to action

##### Types of Empty States

The Fabric UX System provides different approaches for common types of empty states:

- **First-use empty states**: Guide new users when they first encounter a feature
- **User-cleared empty states**: Appear after a user has removed all content
- **Search or filter empty states**: Shown when search or filter criteria return no results
- **Error empty states**: Displayed when something goes wrong

##### Empty State Variations

The system offers four primary layout options for empty states, based on the surface where they appear:

1. **Page (200 x 200px)**: Used for main content areas like dashboards, feeds, or full-page empty states
2. **Container (100 x 100px)**: Used for surfaces like dialogs or drawers
3. **Multiple containers (48 x 48px)**: Used when multiple empty states might appear simultaneously
4. **No illustration**: Used for smaller containers or surfaces with limited space

##### Implementation Guidelines

- Center empty states horizontally and vertically in the content area
- For multiple empty states on a screen, use different icons or no icon to differentiate them
- Use subtle buttons instead of primary buttons when multiple empty states are actionable
- Follow the decision tree to determine the appropriate empty state approach for each scenario

#### Progress Indicators

Progress indicators tell users that a process is running, creating the perception of shorter load times. The Fabric UX system offers three types of progress indicators:

1. **Progress bars**: Show how much of a process has completed and what remains. They can be determinate (showing percentage complete) or indeterminate (showing activity without completion information). Progress bars may include labels and status descriptions.

   For complex processes, progress bars can include:
   - Multiple substeps (5 or fewer)
   - Cancel options for longer processes
   - Status text describing the current action

   Use progress bars for processes that take 10 seconds to a few minutes, especially those with multiple steps users need to track.

2. **Skeletons**: Placeholder wireframes of the loading page, animated with light glare or opacity changes. They make loading time feel shorter than it actually is. Skeletons work well for content-heavy interfaces where you know the layout but content is still loading.

3. **Spinners**: Visual indicators that work is happening. Use them for loading states over one second when you can't use a skeleton. Since spinners don't show remaining time, use progress bars for longer processes. Position labels before, after, above, or below the spinner as needed.

When choosing progress indicators, follow these guidelines:
- For processes under 1 second: no indicator needed
- For processes between 1-10 seconds: use spinners or skeletons
- For processes over 10 seconds: use progress bars, especially when showing progress matters
- For content loading with known layout: prefer skeletons

#### Notifications

Notifications are crucial for communicating with users and providing feedback. They can range from inline responses to user actions to system-wide messages.

##### Types of Notifications

The Fabric UX System provides different types of notifications based on their purpose:

- **Success notifications**: Confirm that an action has been completed successfully
- **Informational notifications**: Provide neutral information or updates
- **Warning notifications**: Alert users to potential issues that may require attention
- **Error notifications**: Inform users about problems that need to be addressed

##### Implementation Guidelines

When implementing notifications, follow these principles:
- Ensure notifications are relevant, timely, and provide useful information
- Keep users informed about updates or changes in status that they should know about
- Use appropriate notification types based on the nature of the message
- Follow the notification decision tree to determine the best approach for each scenario

#### Item Creation

The Fabric UX System provides standardized patterns for item creation workflows, ensuring consistency across different parts of the platform. These patterns guide users through the process of creating new items, from initiating the creation process to completing and saving the item.

The item creation pattern is continuously evolving, with the latest version (V2) providing enhanced guidance for creating a consistent and intuitive experience.

Key aspects of the item creation pattern include:
- Standardized dialog layouts and interactions
- Consistent button placement and labeling
- Clear guidance for form fields and validation
- Unified approach to saving and canceling actions

## Implementation Examples

### Basic Component Implementation

Here's an example of implementing a basic button component:

```html
<fabric-button appearance="primary">Click me</fabric-button>
```

### Component Composition

Components can be composed to create more complex UI elements:

```html
<fabric-dialog>
  <fabric-dialog-title>Confirm action</fabric-dialog-title>
  <fabric-dialog-content>
    Are you sure you want to proceed?
  </fabric-dialog-content>
  <fabric-dialog-actions>
    <fabric-button appearance="secondary">Cancel</fabric-button>
    <fabric-button appearance="primary">Confirm</fabric-button>
  </fabric-dialog-actions>
</fabric-dialog>
```

### Pattern Implementation

Here's an example of implementing an empty state pattern:

```html
<fabric-empty-state
  title="No items found"
  description="Try adjusting your search or filter to find what you're looking for."
  illustration="search"
>
  <fabric-button slot="action" appearance="primary">Clear filters</fabric-button>
</fabric-empty-state>
```

## Best Practices

### Component Usage

- **Use the right component for the job**: Choose components based on their intended purpose and user needs.
- **Maintain consistency**: Use components consistently across your application.
- **Follow accessibility guidelines**: Ensure that your components are accessible to all users.
- **Optimize performance**: Use performance optimization techniques to ensure your application remains responsive.
- **Test thoroughly**: Test your components across different browsers, devices, and screen sizes.

### Pattern Implementation

- **Follow established patterns**: Use established patterns for common user tasks.
- **Adapt patterns to your needs**: Customize patterns to meet your specific requirements while maintaining consistency.
- **Document your patterns**: Document your patterns to ensure consistency across your team.
- **Test with users**: Test your patterns with real users to ensure they meet user needs.
- **Iterate and improve**: Continuously refine your patterns based on user feedback and usage data.

## Future Roadmap

The Fabric UX System component library is continuously evolving to meet the needs of Microsoft Fabric and related workloads. The roadmap includes:

- **Additional components**: New components will be added to the library based on the needs of Fabric shell and workload teams
- **Enhanced accessibility**: Ongoing improvements to accessibility features and compliance
- **Performance optimizations**: Continued focus on performance improvements
- **Framework support**: Enhanced support for React and Angular frameworks

## System Longevity and Sustainability

The Fabric UX System component library is designed as a long-term solution with a commitment to sustainability and continuous improvement.

### Technology Foundation

The component library is built on web standards through Web Components, providing several key advantages for long-term sustainability:

1. **Framework independence**: By leveraging native web platform capabilities, the components are not tied to specific framework versions or implementations that may become outdated.

2. **Browser standard support**: Web Components are supported by all major browsers, ensuring broad compatibility and future-proofing the technology foundation.

3. **Reduced technical debt**: The architecture addresses historical pain points from previous component libraries, incorporating lessons learned to ensure greater stability and longevity.

### Component Roadmap and Inclusion Criteria

The component library will continue to expand based on specific criteria:

- **Complex components**: Tables, trees, and other complex components are on the roadmap, prioritized based on demand from Fabric shell and workload teams.

- **Inclusion criteria**: Components required by more than one workload or ISV qualify for inclusion in the library, ensuring that development resources are focused on widely-needed functionality.

- **Behavioral patterns**: Reusable behavior pattern libraries (e.g., drag & drop, virtualization) are planned and will be evaluated based on existing open-source solutions versus custom development, prioritized by necessity.

### Maintenance and Evolution

The component library follows a sustainable approach to maintenance and evolution:

1. **Centralized oversight**: The UX Engineering team maintains centralized oversight to prevent uncontrolled growth and maintain system integrity.

2. **Design system alignment**: Close collaboration with the Fluent team and careful token management ensures smooth updates with minimal disruption as the design system evolves.

3. **Community contribution**: Contributions to the central library are encouraged, with support provided for developers new to Web Component development, fostering a sustainable ecosystem.

## Requirements Addressed

This whitepaper addresses the following key requirements of the Fabric UX System:

✅ **Framework Compatibility**: Components must support both React and Angular frameworks with a single implementation.
> **Met by**: Web Components core with framework-specific wrappers for React and Angular.

✅ **Consistent Behavior**: Components must provide consistent behavior regardless of the framework used.
> **Met by**: Components deliver identical code to the browser regardless of the chosen framework.

✅ **Framework Upgrade Resilience**: Components must be resilient to framework version updates (e.g., React 18 to 19).
> **Met by**: Core functionality implemented in framework-agnostic Web Components with thin framework wrappers.

✅ **Performance Optimization**: Components must be optimized for performance with minimal dependencies and efficient rendering.
> **Met by**: Components designed to minimize DOM operations and reflows with efficient rendering.

✅ **Individual Component Loading**: Components must be individually loadable to optimize bundle size through tree-shaking.
> **Met by**: Components can be individually loaded as needed, using techniques like tree-shaking.

✅ **Framework Wrappers**: The system must provide React and Angular wrappers for the web components.
> **Met by**: Framework-specific wrappers that provide React and Angular-friendly APIs.

✅ **DOM Operations Minimization**: Components must minimize DOM operations and reflows for better performance.
> **Met by**: Components designed to minimize DOM operations and reflows for better performance.

✅ **Code Splitting Support**: The system must support code splitting for on-demand loading of components.
> **Met by**: Code splitting support for loading components on demand, reducing initial load time.

✅ **Memory Footprint**: Components must have a smaller memory footprint than framework-specific implementations.
> **Met by**: Web components with smaller memory footprint than framework-specific components.

✅ **Standardized UX Patterns**: The system must provide standardized UX patterns for common workflows.
> **Met by**: Shared UX patterns for common scenarios like empty states, progress indicators, etc.

✅ **Angular-Specific Features**: Components must support content projection, templating, and dynamic component creation in Angular.
> **Met by**: Angular wrappers specifically designed to support Angular-specific features.

✅ **Component Usage Guidance**: The system must provide guidance on best practices for component usage.
> **Met by**: Best practices for using components effectively and consistently.

For a complete list of all requirements and how they are met, please refer to the "[Requirements and Compliance](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/ETE64EeUg1JNnFtDgVCRDkcBMycPFYojTGl-naYTcQ4qEg?e=h2yW46)" whitepaper (07).

## About This Whitepaper Series

This whitepaper is part of a series that provides comprehensive information about the Fabric UX System:

1. **[Executive Overview](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EVLsz1jmMEFIkoxdbsBvb0cBkRq41NcyKzeiknQv-LJuKQ?e=PEAJPy)**: High-level introduction to the Fabric UX System, its purpose, and key benefits.
2. **[Design Language and Tokens](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EViEdV3OoJ9PkRDZRDmouCwB4S_GCDoK2h-F8rmUHuWS0A?e=Nkzfgy)**: Detailed information about the design language, design tokens, and theming capabilities.
3. **Component Library and Patterns** (this document): Overview of the component library, including available components and UX patterns.
4. **[Accessibility and Content Design](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EWRplYWZiRZHh2iLgVkUzBQBsJ90tBFrSWRQB2SRTbmgtQ?e=tvxGH4)**: Guidance on accessibility compliance and content design best practices.
5. **[Implementation Guide](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EY3v1PN_bd9Cr_AiAQk0-XABUiXOeGui2DCwV4ysw9tLAQ?e=qUjgWc)**: Technical details for implementing the Fabric UX System in your applications.
6. **[Question and Answer](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/Edvsa9nrjC9PhdWkCMBWPv8BMORBHhHWs1YnucOSl4mVTQ?e=2QRZjU)**: Answers to common questions about the Fabric UX System.
7. **[Requirements and Compliance](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/ETE64EeUg1JNnFtDgVCRDkcBMycPFYojTGl-naYTcQ4qEg?e=h2yW46)**: Comprehensive specification of system requirements and compliance verification.

## Conclusion

The Fabric UX System's component library and shared UX patterns provide a comprehensive framework for creating cohesive, accessible, and high-performance experiences within Microsoft Fabric. By leveraging these pre-built components and established patterns, teams can accelerate development, ensure accessibility compliance, and create experiences that align with Microsoft's design language.

### Key Takeaways

- The component library provides a comprehensive set of UI components that work across different frameworks.
- Web components technology enables seamless integration, multi-framework compatibility, and performance benefits.
- Shared UX patterns provide standardized solutions to common design problems, ensuring consistency across the platform.
- Implementation examples and best practices guide teams in effectively using components and patterns.

### Next Steps

For more information on implementing the Fabric UX System's component library and shared UX patterns, refer to the following resources:

- **Design Language & Tokens Whitepaper**: Learn about the design language and tokens that form the foundation of the component library.
- **Accessibility & Content Design Whitepaper**: Get detailed information on creating accessible and well-designed content.
- **Implementation Guide Whitepaper**: Find practical guidance on implementing the Fabric UX System in your applications.
- **Fabric UX System Documentation**: Access comprehensive documentation for all components and patterns.

## Component Library Roadmap

The Fabric UX System component library is continuously evolving to meet the needs of Microsoft Fabric teams and third-party developers. The roadmap includes:

### Complex Components

The library will include complex components like tables and trees, which are prioritized based on demand from Fabric shell and workload teams. These components will follow the same design principles and accessibility standards as the existing components.

### Behavioral Patterns Libraries

Behavior pattern libraries for common interactions like drag & drop and virtualization are planned for future development. These will be evaluated based on existing open-source solutions versus custom development, and prioritized by necessity.

### Component Inclusion Criteria

Components that qualify for inclusion in the Fluent UX library are those required by more than one workload or ISV. This ensures that the library focuses on components with broad applicability and avoids becoming bloated with specialized components that have limited use cases. 