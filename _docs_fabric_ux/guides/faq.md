---
title: "Frequently Asked Questions (FAQ)"
id: "guide.faq"
area: "guides"
tags: ["faq", "questions", "engineering", "build", "adoption", "versioning", "fabric-ux"]
lastUpdated: 2025-04-09 # Placeholder date
---

# Frequently Asked Questions (FAQ)

<!-- BEGIN-SECTION: Overview -->
This guide addresses common questions about implementing and working with the Fabric UX System.
<!-- END-SECTION: Overview -->

<!-- BEGIN-SECTION: Engineering & Build -->
## Engineering & Build

### Bundle Size and Performance

**Q: What is the impact on bundle size when using Fabric UX System components?**

**A:** Bundle size impact varies based on the application's architecture, but generally, it is minimal due to leveraging web platform efficiencies and techniques like tree-shaking. Components can be individually loaded as needed, so you don't need to load the entire library upfront.

**Q: Are there performance concerns regarding the framework wrappers (React), particularly for smaller components like buttons?**

**A:** The performance of the React wrapper (`@fabric-msft/react`), especially for frequently used components, is actively evaluated. The goal is to balance performance and ease of use for React versions <=18. These wrappers are thin layers over native Web Components. React 19+ and Angular developers use the Web Components directly, avoiding any wrapper overhead.

### Integration with Existing Systems

**Q: We already depend on Fluent UI (e.g., React v8) through other components. Are there peer dependencies that must be synchronized?**

**A:** No. The underlying Fluent UI Web Components used in the Fabric UX System have **no shared runtime dependencies** with Fluent UI React (v8 or v9). You can use both libraries in the same application without worrying about version conflicts.

**Q: Does the Fabric UX System support theme interoperability with existing Fabric components (e.g., Fluent UI React v9)?**

**A:** Yes. Fabric UX components use the same [Design Tokens](/concepts/design-tokens) as Fluent UI React v9 and other modern Fabric components. This allows for consistent visual theming across components from different libraries if they are configured correctly.

**Q: Will there be CSS conflicts with our existing styles?**

**A:** Generally, no. Fabric UX Web Components utilize shadow DOM, which encapsulates their internal styles. This prevents styles from leaking out and affecting your application, and prevents your global styles from unintentionally breaking the components. See [Styling Components](/guides/styling-components) for controlled customization methods.

### Framework Compatibility

**Q: How do Fabric UX components integrate with Angular?**

**A:** Angular applications use the standard `@fabric-msft/web-components` package directly. Angular has built-in support for Custom Elements (the technology behind Web Components). You typically need to import the component definitions (e.g., `import '@fabric-msft/web-components/button/define.js';`) in your Angular module or standalone component and add `CUSTOM_ELEMENTS_SCHEMA` to the module's schemas to allow the custom tags (e.g., `<fabric-button>`) in your templates. This approach allows you to use standard Angular features like property and event binding with the web components.

**Q: How does Angular versioning affect Fabric UX components?**

**A:** Because Fabric UX components are standard Web Components, they are generally unaffected by Angular version changes. As long as Angular continues to support the Custom Elements standard, the components will work. Compatibility issues are much less likely compared to libraries built specifically for a single Angular version.

**Q: How does using Fabric UX System components benefit framework upgrades (e.g., React 18 to 19, Angular 16 to 17)?**

**A:** It significantly eases upgrades. Because the core component logic resides in framework-agnostic Web Components, they are largely immune to breaking changes in framework updates. For React <=18, only the thin wrapper layer might need updates. For React 19+ and Angular, no specific Fabric UX package updates are typically needed relative to the framework version change itself. This reduces risk, effort, and technical debt associated with framework migrations.
<!-- END-SECTION: Engineering & Build -->

<!-- BEGIN-SECTION: Accessibility -->
## Accessibility

**Q: How are accessibility requirements addressed?**

**A:** Accessibility is a core principle. Fabric UX Web Components adhere to Microsoft accessibility standards and WCAG 2.2 AA guidelines, aligning closely with requirements from products like Power BI. See the [Accessibility Guidelines](/concepts/accessibility).

**Q: Is high-contrast mode supported?**

**A:** Yes, comprehensive high-contrast mode support is included, with ongoing improvements and fixes implemented as needed.
<!-- END-SECTION: Accessibility -->

<!-- BEGIN-SECTION: Onboarding & Contribution -->
## Onboarding & Contribution

### Adoption Guidance

**Q: What guidance is provided for adopting Fabric UX System components?**

**A:** Components support gradual, incremental adoption alongside existing React and Angular components. Teams can start small and expand usage over time. Phasing out legacy UI libraries is recommended where feasible. See the [Integration Guide](/guides/integration).

**Q: Should we proactively manage legacy UI debt (e.g., old Material UI, Fluent UI v8)?**

**A:** Yes. Identifying opportunities to replace legacy components with Fabric UX equivalents is recommended to reduce technical debt and improve consistency.

**Q: How should we manage mixing new Fabric UX components with existing components?**

**A:** Mixing is encouraged and supported. For example, you can use Fabric UX buttons within an existing Angular form or place Fabric UX components inside legacy layout structures.

### Contribution Model

**Q: What is the contribution model? Can our team contribute components?**

**A:** Contributions to the central library are encouraged. Support and guidance are available for teams interested in contributing, including those new to Web Component development.

**Q: How is alignment on component appearance and behavior managed across implementations?**

**A:** All components are centrally managed and aligned with Fluent 2 design guidelines and Fabric UX specifications to ensure consistency.

### Component Library Scope

**Q: Will the library include complex components like data grids, tables, or trees?**

**A:** Yes, complex components like these are on the roadmap and are prioritized based on demand from Fabric shell and workload teams.

**Q: What types of components qualify for inclusion in the central Fabric UX library?**

**A:** Generally, components required by more than one Fabric workload or by ISV partners qualify for inclusion. This ensures the library focuses on broadly applicable components.

**Q: Will the library implement reusable behavioral patterns (e.g., drag & drop, virtualization)?**

**A:** Reusable behavior pattern libraries are planned. They will be evaluated based on leveraging existing open-source solutions versus custom development, and prioritized by necessity.
<!-- END-SECTION: Onboarding & Contribution -->

<!-- BEGIN-SECTION: Design and Development Workflow -->
## Design and Development Workflow

**Q: How closely do the Fabric UX code components match their Figma design counterparts?**

**A:** There is a precise one-to-one alignment. Component properties, variants, states, and design tokens share the same naming conventions in both Figma and code. Code components are engineered to render exactly as they appear in Figma.

**Q: What are the benefits of this design-to-code alignment?**

**A:** Streamlined handoff, fewer implementation discrepancies, consistent rendering, direct token mapping, reduced design drift, faster implementation, easier QA, and simplified design updates.

**Q: How does this alignment affect the design-to-development workflow?**

**A:** It significantly reduces friction. Designers design with confidence, developers implement with fewer questions, and both can focus more on user needs. The shared language improves cross-functional collaboration.
<!-- END-SECTION: Design and Development Workflow -->

<!-- BEGIN-SECTION: Versioning -->
## Versioning

**Q: How will breaking changes be managed, especially during the beta phase and after 1.0?**

**A:** Breaking changes during beta will be minimal. After the official 1.0 release, strict [Semantic Versioning](https://semver.org/) will apply. Breaking changes will only occur in major version releases (e.g., 1.x.x to 2.0.0) and will be communicated clearly in advance with migration guides.

**Q: Who handles version updates in our product code?**

**A:** Product teams manage updates themselves by specifying the desired package version (e.g., in `package.json`). This gives teams control over their release cadence. Clear communication about updates and changes will be provided by the Fabric UX team.

**Q: How should we handle validation and rollouts of new component versions?**

**A:** Incorporate components into features during development and provide feedback. Post-update validation relies on each product's existing testing strategy (unit, integration, E2E). Fabric UX components undergo rigorous internal testing.

**Q: Is synchronization needed between different extensions or apps if they use different versions of Fabric UX components?**

**A:** No. Because Web Components are fully encapsulated using shadow DOM, different versions can coexist in different parts of an application or across different extensions loaded on the same page without conflicts.
<!-- END-SECTION: Versioning -->

<!-- BEGIN-SECTION: Long-Term Strategy and Maintenance -->
## Long-Term Strategy and Maintenance

**Q: What is the expected lifespan of the Fabric UX System? Will it be deprecated?**

**A:** Fabric UX is designed for long-term use, built on durable web standards (Web Components) rather than framework-specific implementations that might become obsolete. It is not intended for deprecation within a specific timeframe.

**Q: What makes Fabric UX more sustainable than previous UI libraries?**

**A:** Its foundation on web standards provides framework independence. Centralized management prevents uncontrolled growth, and close alignment with the evolving Fluent design system ensures smoother updates.

**Q: What maintenance work is required by teams using Fabric UX?**

**A:** For non-major updates (patches, minor versions), it typically involves just updating the package version, as these are designed to be non-breaking. For major version upgrades, teams will need to follow migration guides, but the effort is expected to be significantly less than migrating traditional framework-specific libraries due to the stability of the underlying Web Components.

**Q: When should our team consider adopting Fabric UX components?**

**A:** Consider adoption when:
    - Needing a component already available in the system.
    - Building new features or performing significant rebuilds.
    - Implementing cross-cutting design features (like theming).
    - Seeking performance benefits.
    - Planning large design system updates where migrating is comparable to upgrading existing components.

**Q: How should we approach styling if our designs don't perfectly match Fluent 2?**

**A:** Use Fabric UX components and adjust [Design Tokens](/concepts/design-tokens) to match your design as closely as possible. **Avoid direct CSS overrides** of component internals. If significant deviations are needed, work with designers to potentially update the design or discuss custom component needs.
<!-- END-SECTION: Long-Term Strategy and Maintenance -->

<!-- BEGIN-SECTION: Styling (CSS) -->
## Styling (CSS)

**Q: How does shadow DOM affect styling components?**

**A:** Shadow DOM encapsulates internal styles. Customization is achieved through specific mechanisms like CSS Custom Properties (Design Tokens), inherited CSS properties, and explicitly exposed CSS Shadow Parts (`::part`). Direct styling of internal elements with global CSS is generally not possible or recommended. See the [Styling Components](/guides/styling-components) guide for details.
<!-- END-SECTION: Styling (CSS) -->
