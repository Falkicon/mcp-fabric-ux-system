---
title: "Content Style Guide"
id: "concept.content-style"
area: "concepts"
tags: ["content", "writing", "terminology", "fabric-ux"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Content Style Guide

Content design is about delivering timely, relevant information to users so they can accomplish their tasks efficiently. It involves creating and organizing written content, considering placement and appearance in relation to visual elements, and ensuring consistency across the Microsoft Fabric ecosystem.

## Content Design Fundamentals

Good content design is guided by these key principles:

### User-centered Approach

Content design in the Fabric UX System uses a user-centered approach:
- Prioritizing the needs and preferences of the target audience
- Basing decisions on research about user behavior and scenarios
- Focusing on helping users accomplish their goals efficiently

### Clarity and Accessibility

All content should be:
- Clear and straightforward
- Concise and to the point
- Coherent and well-structured
- Accessible to all users, including those with disabilities

### Content Strategy

Content design aligns with:
- Organizational goals
- Target audience needs
- Consistent messaging
- Appropriate distribution channels

### Consistency and Usability

Content should be:
- Consistent within your workload
- Consistent across workloads within Fabric
- Easily understood by users
- Following established patterns and guidelines

## Writing Style and Voice

The Fabric UX System uses a consistent writing style and voice across all content.

### Voice

The voice of the Fabric UX System is:

- **Friendly but professional**: Approachable and helpful, but not overly casual
- **Clear and concise**: Direct and to the point, without unnecessary words or jargon
- **Confident but humble**: Authoritative without being condescending
- **Inclusive**: Respectful of all users, regardless of background or ability

### Style

The style of Fabric UX System content follows these principles:

- **Simple and direct**: Using simple words and sentence structures
- **Active voice**: Using active voice rather than passive voice
- **Present tense**: Using present tense rather than future tense
- **Second person**: Using "you" to address the user directly
- **Consistent terminology**: Using consistent terminology across all content
- **Concise**: Using as few words as possible to convey the message

Examples:

| Instead of | Use |
|------------|-----|
| "The query will be executed when the button is clicked." | "Click the button to execute the query." |
| "We have found that users prefer..." | "You can easily..." |
| "In the future, you will be able to..." | "You can..." |
| "It is recommended that you save your work." | "Save your work." |

## Terminology 

Microsoft Fabric uses dedicated terminology to describe its functionality and surfaces. When developing applications for Fabric, it's important to use consistent terminology.

### Key Terms

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

## Content Guidelines for UI Elements

Different UI elements require specific content approaches:

### Buttons

- Use clear, concise action verbs
- Be specific about the action
- Use sentence case (capitalize only the first word)
- Avoid punctuation

**Examples:**
- "Save"
- "Cancel"
- "Create workspace"

**Not:**
- "Click Here"
- "Save Changes."
- "CREATE NEW"

### Labels

- Be concise and descriptive
- Use sentence case
- Avoid punctuation

**Examples:**
- "Name"
- "Description"
- "Created date"

**Not:**
- "Enter the Name:"
- "Description of Item"
- "Date when created."

### Error Messages

- Be clear about what went wrong
- Provide guidance on how to fix the issue
- Use a friendly, non-blaming tone

**Examples:**
- "Unable to save. Check your connection and try again."
- "Name already exists. Enter a different name."

**Not:**
- "Error 501"
- "Invalid input!"
- "You didn't enter a valid email address."

### Empty States

- Explain why the state is empty
- Provide guidance on what to do next
- Use a friendly, encouraging tone

**Examples:**
- "No items found. Try adjusting your search or filter."
- "No reports yet. Create your first report to get started."

**Not:**
- "No data"
- "Empty"
- "Nothing to show."

### Tooltips

- Provide additional context or explanation
- Be concise and focused
- Use sentence case and end with a period

**Examples:**
- "Sort items by name, date, or type."
- "Add a new workspace for your team."

**Not:**
- "Click to sort"
- "This button adds a new workspace to your existing workspaces so you can work with your team members on projects."

### Notifications

- Be clear about what happened
- Provide context and next steps if needed
- Use a friendly, informative tone

**Examples:**
- "Workspace created successfully. You can now add items to it."
- "Report shared with 5 people."

**Not:**
- "Success!"
- "Your action has been completed successfully and the system has processed your request."

## Writing Best Practices

Follow these best practices for all Fabric UX content:

### Know Your Audience

Fabric audiences vary from business decision makers to developers, business consumers, admins, data scientists, and data analysts. Understand who you're designing for and what they're trying to accomplish.

### Use Plain Language

- Avoid jargon and technical terms unless necessary
- Explain complex concepts in simple terms
- Use everyday words and phrases
- Keep sentences short and direct

### Be Consistent

- Use consistent terminology throughout your application
- Follow established naming conventions
- Maintain a consistent tone and style
- Use the same terms for the same concepts

### Be Concise

- Get to the point quickly
- Remove unnecessary words
- Focus on what the user needs to know
- Present information in a logical order

### Use Active Voice

- Make it clear who is doing what
- Use direct instructions for actions
- Avoid passive constructions when possible

**Examples:**
- "Select the option" (not "The option should be selected")
- "Create a report" (not "A report can be created")
- "Enter your password" (not "Your password must be entered")

### Use Present Tense

- Focus on what happens now, not what will happen later
- Describe current states and actions

**Examples:**
- "Fabric creates a backup" (not "Fabric will create a backup")
- "The dialog shows options" (not "The dialog will show options")

### Use Second Person

- Address the user directly with "you"
- Avoid "we," "our," or "they" when possible

**Examples:**
- "You can create dashboards" (not "We let users create dashboards")
- "Enter your password" (not "The user should enter their password")

### Capitalize Consistently

- Use sentence case for UI elements (capitalize only the first word)
- Capitalize proper nouns, including product names
- Follow Microsoft style for title capitalization when needed

**Examples:**
- "Create new workspace"
- "Microsoft Fabric"
- "Save changes"

### Punctuate Properly

- Omit periods from button labels, headings, and short labels
- Use periods for complete sentences in descriptions and help text
- Use serial commas (Oxford commas) in lists

## Examples of Good Content Design

### Before and After Examples

**Dialog Title - Before:**
"CREATE NEW WORKSPACE."

**Dialog Title - After:**
"Create new workspace"

---

**Error Message - Before:**
"Error 404: Page not found. The page you were looking for could not be found on the server. Please check the URL and try again or navigate to the home page."

**Error Message - After:**
"Page not found. Check the address or return to the home page."

---

**Button Label - Before:**
"Click Here To Generate Your Report Now!"

**Button Label - After:**
"Generate report"

---

**Empty State - Before:**
"No data available."

**Empty State - After:**
"No reports yet. Create your first report to start analyzing your data."

## Resources and References

### Style Guide

The Fabric UX System follows the [Microsoft Writing Style Guide](https://learn.microsoft.com/en-us/style-guide/welcome/) for all content creation. Refer to this guide for detailed guidance on:

- Grammar and mechanics
- Punctuation
- Formatting
- Word choice and terminology
- Voice and tone

### Dictionary

The Fabric UX System uses the [American Heritage Dictionary (AHD)](https://www.ahdictionary.com/) for spelling and definitions.

### Internationalization Considerations

When creating content that will be translated:

- Avoid idioms, colloquialisms, and culturally specific references
- Keep sentences simple and direct
- Avoid ambiguous pronouns
- Allow for text expansion in translations (text can expand 30% or more in some languages)
- Use consistent terminology to improve translation quality

## Learn More

- [Accessibility Guidelines](/concepts/accessibility)
- [Design Tokens](/concepts/design-tokens)
- [Component Documentation](/components/overview)
