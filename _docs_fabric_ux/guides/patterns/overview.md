---
title: "UX Patterns Overview"
id: "guide.patterns.overview"
area: "guides"
tags: ["patterns", "guides", "fabric-ux", "ux-patterns"]
lastUpdated: 2025-04-09 # Placeholder date
---

# UX Patterns Overview

<!-- BEGIN-SECTION: Overview -->
While [components](/components/overview) serve as the fundamental building blocks of the Fabric UX System, UX patterns are reusable solutions to common design problems. These patterns describe how components work together to help users accomplish specific tasks, ensuring consistency and usability across the Microsoft Fabric ecosystem.
<!-- END-SECTION: Overview -->

## What Are UX Patterns?

<!-- BEGIN-SECTION: What Are UX Patterns? -->
UX patterns differ from basic components in that they address specific user scenarios rather than just providing UI elements. They establish standardized workflows and interaction models for common tasks, creating familiarity and reducing the learning curve for users.

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
<!-- END-SECTION: What Are UX Patterns? -->

## Benefits of Using UX Patterns

<!-- BEGIN-SECTION: Benefits of Using UX Patterns -->
Implementing standardized UX patterns provides several key benefits:

### 1. Standardized Workflows

UX patterns ensure consistency across different parts of Microsoft Fabric, guiding users through common tasks with familiar interaction models. This standardization:

- **Reduces cognitive load**: Users don't need to learn new interaction patterns for similar tasks
- **Increases efficiency**: Familiar patterns allow users to complete tasks more quickly
- **Improves predictability**: Users can anticipate how interactions will behave

### 2. User-Centered Solutions

Each pattern is designed with specific user scenarios in mind, focusing on the user's goals and needs. This user-centered approach ensures that patterns effectively address real-world use cases and provide intuitive solutions.

Patterns are developed and refined based on:
- **User research**: Understanding how users approach tasks and what challenges they face
- **Usability testing**: Validating that patterns effectively support user goals
- **Iterative improvement**: Continuously refining patterns based on feedback and usage data

### 3. Consistency Across the Platform

UX patterns promote consistency across the Microsoft Fabric platform, creating a unified experience regardless of which workload or feature a user is interacting with. This consistency helps users transfer knowledge between different parts of the platform and builds confidence in their ability to accomplish tasks.
<!-- END-SECTION: Benefits of Using UX Patterns -->

## Core UX Patterns

<!-- BEGIN-SECTION: Core UX Patterns -->
The Fabric UX System includes several core UX patterns that address common user scenarios:

### [Empty States](/guides/patterns/empty-states)

Empty states occur when there's no information or data to show. The empty state pattern provides a consistent way to handle these situations, making them informative and actionable rather than confusing dead ends.

Key aspects include:
- Different types of empty states (first-use, user-cleared, search/filter, error)
- Standard layout options based on available space
- Consistent structure with illustrations, titles, and optional actions

### [Progress Indicators](/guides/patterns/progress-indicators)

Progress indicators tell users that a process is running, creating the perception of shorter load times. The pattern includes three main types:

- **Progress bars**: Show how much of a process has completed
- **Skeletons**: Placeholder wireframes that indicate content is loading
- **Spinners**: Simple indicators that work is happening

The pattern provides guidance on when to use each type based on process duration and context.

### [Notifications](/guides/patterns/notifications)

Notifications are crucial for communicating with users and providing feedback. The notification pattern standardizes how different types of messages (success, information, warning, error) are displayed and interacted with.

### [Item Creation](/guides/patterns/item-creation)

The item creation pattern standardizes workflows for creating new items, ensuring consistency in dialogs, form layouts, validation, and action buttons.
<!-- END-SECTION: Core UX Patterns -->

## Implementation Example

<!-- BEGIN-SECTION: Implementation Example -->
Here's a simplified example of implementing an empty state pattern:

```html
<fabric-empty-state
  title="No items found"
  description="Try adjusting your search or filter to find what you're looking for."
  illustration="search"
>
  <fabric-button slot="action" appearance="primary">Clear filters</fabric-button>
</fabric-empty-state>
```
<!-- END-SECTION: Implementation Example -->

## Best Practices for Using Patterns

<!-- BEGIN-SECTION: Best Practices for Using Patterns -->
When implementing UX patterns in your application:

1. **Follow established patterns**: Use the documented patterns for common scenarios rather than inventing new approaches.
2. **Adapt patterns appropriately**: While maintaining the core structure and behavior, adapt patterns to your specific use case as needed.
3. **Use patterns consistently**: Apply patterns consistently throughout your application.
4. **Test with users**: Validate that the implemented patterns effectively meet user needs in your specific context.
5. **Provide feedback**: If you identify gaps or improvements for existing patterns, share your insights with the Fabric UX team.
<!-- END-SECTION: Best Practices for Using Patterns -->

## Pattern Documentation Structure

<!-- BEGIN-SECTION: Pattern Documentation Structure -->
Each pattern in the Fabric UX System is documented with:

- **Overview**: What the pattern is and when to use it
- **Anatomy**: Key components and structure of the pattern
- **Variations**: Different versions of the pattern for specific contexts
- **Behavior**: How the pattern responds to user interactions
- **Implementation**: Code examples and technical guidance
- **Accessibility**: Considerations for ensuring the pattern is accessible to all users
- **Best practices**: Dos and don'ts for effective implementation
<!-- END-SECTION: Pattern Documentation Structure -->

## Learn More

<!-- BEGIN-SECTION: Learn More -->
Explore detailed documentation for individual patterns:

- [Empty States](/guides/patterns/empty-states)
- [Progress Indicators](/guides/patterns/progress-indicators)
- [Notifications](/guides/patterns/notifications)
- [Item Creation](/guides/patterns/item-creation)
<!-- END-SECTION: Learn More -->
