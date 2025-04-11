---
title: "Integrating Fabric UX System"
id: "guide.integration"
area: "guides"
tags: ["integration", "migration", "adoption", "web-components", "react", "angular", "fabric-ux"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Integrating Fabric UX System

<!-- BEGIN-SECTION: Overview -->
Integrating the Fabric UX System into existing codebases can be done incrementally, allowing teams to adopt the system at their own pace without requiring a complete rewrite.
<!-- END-SECTION: Overview -->

## Core Principles of Integration

<!-- BEGIN-SECTION: Core Principles of Integration -->
- **Incremental Adoption**: You can introduce Fabric UX components one by one alongside your existing UI library.
- **Coexistence**: Fabric UX components (built as Web Components) are designed to coexist safely with components from other libraries (like Fluent UI React v8, older Angular Material, etc.).
- **Reduced Risk**: Start with less critical areas or new features to gain confidence before replacing core UI elements.
<!-- END-SECTION: Core Principles of Integration -->

## Why Integration Works Safely

<!-- BEGIN-SECTION: Why Integration Works Safely -->
- **Shadow DOM Encapsulation**: Fabric UX Web Components use shadow DOM, which isolates their internal styles. This prevents CSS from leaking out and affecting your existing styles, and prevents your global styles from unintentionally breaking the component's appearance.
- **No Shared Dependencies**: The underlying Fluent UI Web Components have no direct runtime dependencies on libraries like Fluent UI React v9. This avoids version conflicts if you use both in the same application.
- **Theme Interoperability**: Fabric UX System components use the same design tokens as other modern Fabric UI solutions (like Fluent UI React v9). This allows for consistent theming across components from different libraries if they are configured to use the same token set.
<!-- END-SECTION: Why Integration Works Safely -->

## Incremental Adoption Strategy

<!-- BEGIN-SECTION: Incremental Adoption Strategy -->
A recommended approach for integrating Fabric UX:

```
         INCREMENTAL ADOPTION STRATEGY
         
┌─────────────────────────────────────────────────────┐
│                                                     │
│  ASSESS → PLAN → IMPLEMENT → REFINE                 │
│                                                     │
│  ┌─────────────┐    ┌─────────────────┐            │
│  │ Audit       │───▶│ Design Tokens   │────┐       │
│  │ Current UI  │    │ (Optional First)│    │       │
│  └─────────────┘    └─────────────────┘    │       │
│                                            ▼       │
│  ┌─────────────┐    ┌─────────────────┐  ┌─────────┐
│  │ Identify    │───▶│ Common/Simple   │─▶│ Test &  │
│  │ Candidates  │    │ Components      │  │ Iterate │
│  └─────────────┘    └─────────────────┘  └────┬────┘
│                                               │     │
│  ┌─────────────┐    ┌─────────────────┐       │     │
│  │ Prioritize  │───▶│ Shared UX       │◀──────┘     │
│  │ Impact      │    │ Patterns        │             │
│  └─────────────┘    └─────────────────┘             │
│                                                     │
└─────────────────────────────────────────────────────┘
```

1.  **Assess Current UI**: Audit your existing components, styles, and patterns. Identify areas with inconsistencies, accessibility issues, or high maintenance costs.
2.  **Plan & Prioritize**: Identify candidate components or sections for migration. Prioritize based on factors like:
    -   **Impact**: Areas that would benefit most from consistency or accessibility improvements.
    -   **Complexity**: Start with simpler components (buttons, inputs) before tackling complex ones (grids, dialogs).
    -   **Risk**: Choose lower-risk areas initially.
3.  **Implement (Incrementally)**:
    -   **(Optional First Step)** Implement Fabric UX [Design Tokens](/concepts/design-tokens) across your application for consistent styling, even before migrating components.
    -   Replace selected existing components with their Fabric UX counterparts.
    -   Introduce Fabric UX components for new features.
    -   Implement [Shared UX Patterns](/guides/patterns/overview) using Fabric UX components.
4.  **Test & Refine**: Thoroughly test the integrated components for visual consistency, functionality, accessibility, and performance. Refine your implementation based on testing results and user feedback.
5.  **Repeat**: Continue identifying and migrating components or sections incrementally.
<!-- END-SECTION: Incremental Adoption Strategy -->

## Migration Patterns

<!-- BEGIN-SECTION: Migration Patterns -->
Choose a pattern that fits your team's needs:

### 1. Strangler Fig Pattern

Gradually replace parts of your existing application with new implementations using Fabric UX components.

- **Pros**: Lower risk, allows for incremental value delivery, spreads effort over time.
- **Cons**: Can lead to a period of managing two UI systems, requires careful coordination.

**Steps**:
1.  Identify a feature or component boundary.
2.  Implement the new version using Fabric UX.
3.  Route users/traffic to the new implementation.
4.  Gradually expand the new implementation, "strangling" the old one.

### 2. Component-by-Component Replacement

Replace individual instances of legacy components with their Fabric UX equivalents.

- **Pros**: Targeted, can address specific pain points quickly.
- **Cons**: Can be tedious for large codebases, may require creating temporary wrappers.

**Steps**:
1.  Choose a legacy component (e.g., an old button).
2.  Install the appropriate Fabric UX package (`@fabric-msft/react` or `@fabric-msft/web-components`).
3.  Find instances of the legacy component.
4.  Replace them with the corresponding Fabric UX component (e.g., `<LegacyButton>` -> `<FabricButton>`).
5.  Adjust props and event handlers as needed.
6.  Test thoroughly.

### 3. New Feature Implementation

Use Fabric UX components exclusively for any new features or sections added to your application.

- **Pros**: Avoids touching legacy code, ensures new parts use the modern system.
- **Cons**: Doesn't address issues in existing code, leads to longer coexistence.

<!-- END-SECTION: Migration Patterns -->

## Coexistence Strategies

<!-- BEGIN-SECTION: Coexistence Strategies -->
During the transition, manage the coexistence of old and new components:

- **Consistent Theming**: If possible, apply Fabric UX design tokens or a compatible theme to both old and new components to minimize visual jarring.
- **Wrapper Components**: Consider creating temporary wrapper components around Fabric UX components to match the API of your legacy components, simplifying the replacement process.
- **Documentation**: Clearly document which parts of the application use which component library.
<!-- END-SECTION: Coexistence Strategies -->

## Framework Upgrade Benefits

<!-- BEGIN-SECTION: Framework Upgrade Benefits -->
Using Fabric UX System components simplifies future framework upgrades (e.g., React 18 to 19, Angular 16 to 17):

- **Component Stability**: The core Web Component logic is framework-agnostic and unaffected by framework breaking changes.
- **Minimal Wrapper Updates**: For React 18 and below, only the thin framework-specific wrapper (`@fabric-msft/react`) may need updates. React 19+ and Angular use the web components directly, further minimizing framework-related update friction.
- **Reduced Testing**: Less regression testing is needed as the core component behavior remains stable.
- **Lower Technical Debt**: Reduces reliance on framework-specific implementations, making your UI more future-proof.
<!-- END-SECTION: Framework Upgrade Benefits -->

## Versioning and Updates

<!-- BEGIN-SECTION: Versioning and Updates -->
- **Semantic Versioning**: Fabric UX follows semantic versioning. Breaking changes are introduced in major versions (after 1.0 release).
- **Team Responsibility**: Product teams manage updates by choosing when to upgrade package versions.
- **Clear Communication**: The Fabric UX team provides release notes, migration guides, and deprecation notices.
- **No Cross-Extension Synchronization Needed**: Due to shadow DOM encapsulation, different versions of Fabric UX components can coexist across different extensions or parts of an application without conflict.
<!-- END-SECTION: Versioning and Updates -->

## Troubleshooting

<!-- BEGIN-SECTION: Troubleshooting -->
Refer to the [Troubleshooting and Support](/guides/troubleshooting) section in the main Implementation Guide or specific component documentation if you encounter issues with:

- Styling
- Accessibility
- Performance
- Framework integration
<!-- END-SECTION: Troubleshooting -->

## Learn More

<!-- BEGIN-SECTION: Learn More -->
- [Getting Started Guide](/guides/getting-started)
- [Styling Components](/guides/styling-components)
- [Component Library Overview](/components/overview)
- [Design Tokens](/concepts/design-tokens)
<!-- END-SECTION: Learn More -->
