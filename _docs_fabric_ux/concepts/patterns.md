---
title: "Fabric UX Shared Patterns"
id: "concept.patterns"
area: "concepts"
tags: ["patterns", "ux-patterns", "workflows", "consistency", "empty-states", "progress", "notifications", "item-creation"]
lastUpdated: 2025-04-10 # Placeholder date - Update as needed
---

# Fabric UX Shared Patterns

<!-- BEGIN-SECTION: Overview -->
Shared UX patterns in the Fabric UX System are standardized, repeatable solutions designed to address common user scenarios and workflows consistently across the platform. Unlike individual components (which are basic building blocks), patterns describe how multiple components work together to help users accomplish specific tasks effectively.
<!-- END-SECTION: Overview -->

## Purpose and Benefits

<!-- BEGIN-SECTION: Purpose and Benefits -->
Using shared patterns provides several key advantages:

*   **Consistency:** Creates a cohesive and predictable user experience across different features and workloads.
*   **Efficiency:** Reduces design and development time by providing pre-defined solutions for common problems.
*   **Usability:** Lowers cognitive load for users as they encounter familiar interactions for similar tasks.
*   **User-Centered:** Patterns are based on user research and usability testing to ensure they meet real-world needs.
<!-- END-SECTION: Purpose and Benefits -->

## Common Pattern Examples

<!-- BEGIN-SECTION: Common Pattern Examples -->
The Fabric UX System documents and provides guidance for several common patterns:

### 1. Empty States

**Scenario:** Displaying an area when there is no data or information to show (e.g., first use, after clearing data, no search results, errors).

**Goal:** Inform users about the situation and provide clear next steps or calls to action.

**Key Elements:** Typically include an optional illustration, a title, descriptive body text, and optional action buttons or links.

**Variations:** Different layouts and content strategies are used depending on the context (e.g., full page, container, first-use vs. error).

### 2. Progress Indicators

**Scenario:** Providing feedback to the user while a process is running (e.g., loading data, submitting a form, performing an operation).

**Goal:** Manage user expectations, reduce perceived wait times, and indicate system status.

**Types:**
*   **Progress Bars:** Show completion percentage (determinate) or ongoing activity (indeterminate). Best for processes > 10 seconds.
*   **Skeletons:** Animated placeholders representing the loading UI structure. Good for content-heavy interfaces with known layouts.
*   **Spinners:** Simple indicators of activity. Best for short processes (1-10 seconds) where progress percentage isn't necessary.

### 3. Notifications

**Scenario:** Communicating system status, success messages, warnings, or errors to the user.

**Goal:** Keep users informed about important events or feedback related to their actions or the system state.

**Types:** Categorized by purpose (e.g., Success, Informational, Warning, Error) and often vary in presentation (e.g., inline message, toast, banner) based on urgency and context.

### 4. Item Creation

**Scenario:** Guiding users through the process of creating a new entity within the system (e.g., creating a new report, dataset, user).

**Goal:** Provide a consistent, intuitive, and efficient workflow for creating items.

**Key Elements:** Often involves standardized dialogs, forms, input validation, button placement (Save/Cancel), and confirmation steps.
<!-- END-SECTION: Common Pattern Examples -->

---

*Note: Detailed guidance, visual examples, and implementation specifics for each pattern are typically found in dedicated pages within the `/guides` or a dedicated `/patterns` section (if created).*
