---
title: "Empty States Pattern"
id: "guide.patterns.empty-states"
area: "guides"
tags: ["patterns", "empty-states", "ux", "fabric-ux"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Empty States Pattern

Empty states occur when there's no information or data to display to the user. Rather than showing a blank screen or simply stating "No data," well-designed empty states help users understand what they're seeing and guide them toward appropriate next steps.

## When to Use Empty States

Implement the empty state pattern when:
- A user first encounters a feature with no content yet (first-use)
- A user has removed all content from a view (user-cleared)
- Search or filter criteria return no results
- An error prevents content from being displayed

## Anatomy of Empty States

An effective empty state includes several key elements:

1. **Illustration** (optional): Visual element that communicates the purpose of the empty state
2. **Title**: Clearly states the main action with first-word capitalization and no period
3. **Body content** (optional): Provides a short explanation or instructions
4. **Link text** (optional): Actionable text that helps users understand where the link will take them
5. **Button label** (optional): Clear, concise call to action

```
┌───────────────────────────────────────────┐
│                                           │
│               [Illustration]              │
│                                           │
│                   Title                   │
│                                           │
│  Body content explaining the empty state  │
│       and what the user can do next       │
│                                           │
│            [Primary Button]               │
│                                           │
└───────────────────────────────────────────┘
```

## Types of Empty States

### First-use Empty States

When a user first encounters a feature with no content yet, the empty state should:
- Educate users about what the feature does
- Provide clear actions to get started
- Use supportive language to encourage engagement

Example:
```html
<fabric-empty-state
  title="Create your first dashboard"
  description="Dashboards help you visualize and monitor your data in real-time."
  illustration="dashboard"
>
  <fabric-button slot="action" appearance="primary">Create dashboard</fabric-button>
</fabric-empty-state>
```

### User-cleared Empty States

After a user has removed all content from a view, the empty state should:
- Confirm the user's action
- Provide a way to restore content if appropriate
- Maintain a clean, minimalist appearance

Example:
```html
<fabric-empty-state
  title="No saved reports"
  description="You've deleted all your reports. Create a new one to analyze your data."
  illustration="document"
>
  <fabric-button slot="action" appearance="primary">Create report</fabric-button>
</fabric-empty-state>
```

### Search or Filter Empty States

When search or filter criteria return no results, the empty state should:
- Clearly indicate that the search or filter returned no matches
- Suggest ways to adjust the search or filter
- Provide an option to clear the search/filter

Example:
```html
<fabric-empty-state
  title="No matching items"
  description="Try adjusting your search or filter to find what you're looking for."
  illustration="search"
>
  <fabric-button slot="action" appearance="primary">Clear filters</fabric-button>
</fabric-empty-state>
```

### Error Empty States

When an error prevents content from being displayed, the empty state should:
- Clearly communicate that something went wrong
- Explain the issue in simple terms
- Provide actions to resolve the issue

Example:
```html
<fabric-empty-state
  title="Unable to load data"
  description="There was a problem connecting to the server. Check your internet connection and try again."
  illustration="error"
>
  <fabric-button slot="action" appearance="primary">Retry</fabric-button>
</fabric-empty-state>
```

## Empty State Variations

The Fabric UX System provides four primary layout options for empty states, based on the surface where they appear:

### Page (200 x 200px)

- Used for main content areas like dashboards, feeds, or full-page empty states
- Largest illustration size (200x200px)
- Centered horizontally and vertically in the content area
- Most comprehensive content, can include title, description, and multiple actions

### Container (100 x 100px)

- Used for surfaces like dialogs or drawers
- Medium illustration size (100x100px)
- Centered in the container
- Usually includes title and may include description and a single action

### Multiple Containers (48 x 48px)

- Used when multiple empty states might appear simultaneously on the same page
- Small illustration size (48x48px) or no illustration
- Simple, concise content
- Use subtle buttons instead of primary buttons when multiple empty states are actionable

### No Illustration

- Used for smaller containers or surfaces with limited space
- Text-only approach
- Focused on essential information

## Implementation Guidelines

### Placement

- Center empty states horizontally and vertically in the content area
- Ensure adequate spacing around the empty state elements
- For multiple empty states on a screen, maintain consistent alignment

### Visual Design

- Use illustrations that clearly communicate the context
- For multiple empty states on a screen, use different icons or no icon to differentiate them
- Maintain adequate contrast for text elements

### Content Guidelines

- Keep titles brief (5 words or less if possible)
- Use sentence case for titles (capitalize first word only)
- For descriptions, use concise language (1-2 short sentences)
- Focus on what users can do, not just what's missing
- Avoid technical jargon

### Interaction Design

- Limit the number of actions (ideally one primary action)
- Use primary buttons for the main action
- Use subtle buttons for secondary actions
- For multiple empty states, use subtle buttons instead of primary buttons

## Accessibility Considerations

- Ensure proper heading structure (title should be appropriately marked as a heading)
- Provide alt text for illustrations
- Maintain adequate color contrast for all text elements
- Ensure interactive elements are keyboard accessible
- Confirm screen readers can properly interpret the empty state content

## Code Example

Here's a more complete implementation example:

```tsx
// React example
import { 
  FabricEmptyState, 
  FabricButton 
} from '@fabric-msft/react';

function SearchResults({ results, searchTerm, onClearSearch }) {
  // If there are no results, show the empty state
  if (results.length === 0) {
    return (
      <FabricEmptyState
        title="No matching results"
        description={`No items match "${searchTerm}". Try adjusting your search term or filters.`}
        illustration="search"
      >
        <FabricButton slot="action" appearance="primary" onClick={onClearSearch}>
          Clear search
        </FabricButton>
      </FabricEmptyState>
    );
  }
  
  // Otherwise, render the results
  return (
    <div>
      {results.map(result => (
        <ResultItem key={result.id} result={result} />
      ))}
    </div>
  );
}
```

## Best Practices

### Do:
- Use empty states consistently throughout your application
- Keep content concise and focused on next steps
- Adapt the empty state design to the available space
- Ensure empty states are helpful and informative

### Don't:
- Use generic messages like "No data" without further guidance
- Overload empty states with too many actions or too much text
- Use illustrations that don't clearly relate to the context
- Skip empty states or leave blank areas without explanation

## Related Patterns

- [Progress Indicators](/guides/patterns/progress-indicators) - Often used before showing an empty state while loading data
- [Notifications](/guides/patterns/notifications) - May be used alongside empty states to provide additional feedback

## Learn More

- [Component Library Overview](/components/overview)
- [UX Patterns Overview](/guides/patterns/overview)
- [Illustration System](/concepts/illustrations)
