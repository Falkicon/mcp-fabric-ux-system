# Fabric UX System: Question and Answer

*Common questions and detailed answers about the Fabric UX System*

> **Author:** Jason Falk & The Fabric UX Team  
> **Last Updated:** February 28, 2025  
> **Version:** 0.1  
> **Status:** Draft  

## Executive Summary

The Fabric UX System Question and Answer whitepaper addresses common inquiries about implementing and working with the system. This document provides detailed answers to frequently asked questions across several key areas, including engineering and build considerations, onboarding and contribution processes, and versioning strategies.

By addressing these common questions, this whitepaper helps teams understand the practical implications of adopting the Fabric UX System and provides guidance for overcoming potential challenges during implementation.

## Engineering & Build

### Bundle Size and Performance

**Q:** What is the impact on bundle size when using Fabric UX System components?  
**A:** Bundle size impact varies based on the application's architecture, but generally, it is minimal due to leveraging web platform efficiencies.

**Q:** Do we need to load all Fabric UX System components upfront?  
**A:** No. Components can be individually loaded as needed, using techniques like tree-shaking.

**Q:** Are there performance concerns regarding wrappers, particularly for smaller components?  
**A:** Performance of wrappers, especially frequently used ones like buttons, is actively evaluated. The goal is to balance performance and ease of use. Note that these wrappers differ from typical React-to-Angular wrappers due to the native nature of Web Components.

### Integration with Existing Systems

**Q:** We already depend on Fluent UI through components like the ribbon. Are there peer dependencies that must be synchronized with other Fluent libraries?  
**A:** No. Fluent UI Web Components used in Fabric UX System have no shared dependencies with Fluent UI React.

**Q:** Does the Fabric UX System support theme interoperability with existing Fabric components?  
**A:** Yes. It uses the same design tokens as Fluent UI React v9 and other existing Fabric tokens.

**Q:** Will there be conflicts with existing CSS or CSS properties?  
**A:** No. Web Components utilize shadow DOM, preventing style conflicts or CSS leakage.

### Framework Compatibility

**Q:** Are there compatible models for Angular features like content projection, templating, dynamic/lazy component creation, and directives?  
**A:** Yes. An Angular wrapper addressing compatibility with these features has been developed and is open for feedback. Documentation and implementation details are available here and here, along with a validation example in our monorepo.

**Q:** How does Angular versioning work with Fabric UX wrappers?  
**A:** Fabric UX Angular wrappers have been tested with Angular 16 and 17. Future Angular versions are expected to remain compatible unless there are breaking changes to wrapper-specific features. The Web Component inside wrappers is unaffected by Angular version changes. Compatibility with future Angular versions will be regularly tested and validated.

**Q:** How does using Fabric UX System components benefit framework upgrades (like React or Angular)?  
**A:** Fabric UX System significantly eases framework upgrades because the components themselves aren't tied to specific framework versions beyond the wrapper layer. This wrapper has a much smaller API surface than traditional framework-specific components and is largely automated and easier to update. 

For example, if React 19 introduces breaking changes that would affect traditional React components, your Fabric UX components would remain stable since the core functionality is implemented in framework-agnostic Web Components. Only the thin wrapper layer would need updates, which is a much smaller effort than refactoring entire component libraries. This architecture provides greater stability during framework upgrades and reduces the risk and effort associated with keeping your application current with the latest framework versions.

## Accessibility

**Q:** How are accessibility requirements addressed?  
**A:** Fabric UI Web Components adhere to Microsoft accessibility standards, aligning closely with Power BI specifications in collaboration with Jen Kelleman.

**Q:** Is high-contrast mode supported?  
**A:** Yes, with ongoing fixes for specific high-contrast issues currently underway.

## Onboarding & Contribution

### Adoption Guidance

**Q:** What guidance will be provided for adopting Fabric UX System components?  
**A:** Components support gradual adoption alongside existing React and Angular components. Adoption guidance can be tailored based on workload-specific needs and capacity. Phasing out legacy UI libraries over time is recommended.

**Q:** Should we phase out other UI libraries or manage legacy Material UI debt proactively?  
**A:** Yes. Reducing legacy Material UI debt by identifying opportunities for component replacement is recommended and can be prioritized to aid transitions.

**Q:** How should we manage mixing new and existing components?  
**A:** Developers are encouraged to mix Web Components with existing Angular components as needed.

### Contribution Model

**Q:** What is the contribution model?  
**A:** Contributions to the central library are encouraged, with support provided for developers new to Web Component development.

**Q:** How will alignment on component appearance and behavior across implementations be managed to avoid conflicts?  
**A:** All components are aligned and conform to Fluent design guidelines.

### Component Library Scope

**Q:** Will the library include complex components like tables and trees?  
**A:** Yes, these are on the roadmap and prioritized based on demand from Fabric shell and workload teams.

**Q:** What types of components qualify for inclusion in the Fluent UX library?  
**A:** Components required by more than one workload or ISV qualify for inclusion.

**Q:** Will the library implement behavioral patterns (e.g., drag & drop, virtualization) as reusable pieces?  
**A:** Behavior pattern libraries are planned but will be evaluated based on existing open-source solutions versus custom development, prioritized by necessity.

## Design and Development Workflow

### Design-to-Code Alignment

**Q:** How closely do the Fabric UX System code components match their Figma design counterparts?  
**A:** The Fabric UX System maintains a precise one-to-one alignment between Figma design components and their code implementations. Component properties, variants, and states share the same naming conventions in both environments, and code components are engineered to render exactly as they appear in Figma.

**Q:** What are the benefits of this design-to-code alignment?  
**A:** This alignment provides several key benefits:
- Streamlined handoff process with fewer implementation questions and discrepancies
- Consistent visual rendering across design and production environments
- Direct mapping of design tokens between Figma and code
- Reduced design drift over time
- Faster implementation cycles due to clear specifications
- Simplified quality assurance process with clear reference points
- Easier design updates as changes can be clearly communicated using the shared component structure

**Q:** How does this alignment affect the design-to-development workflow?  
**A:** The alignment significantly reduces friction in the handoff process. Designers can confidently use components knowing they'll be implemented as designed, while developers can implement with fewer clarification questions. This allows both disciplines to focus more on solving user problems rather than debating implementation details. The shared language of components and tokens also improves cross-functional communication and collaboration.

## Versioning

### Managing Changes

**Q:** How will breaking changes be managed, especially during the beta phase?  
**A:** Breaking changes during the beta phase will be minimal and follow semantic versioning. APIs align with design specifications and Fluent React v9. After the official 1.0 release, strict semantic versioning will apply. Product teams can manage the impact by locking package versions, with changes communicated clearly in advance.

**Q:** Who will handle version updates in product code?  
**A:** Product teams will manage updates themselves by specifying newer package versions to maintain control over their release cadence. Clear communication about updates will be provided.

### Validation and Synchronization

**Q:** How will validation and rollouts be handled?  
**A:** Validation before adoption is best performed by incorporating components into features and providing feedback. Post-update validation will rely on each product's testing strategy. Fabric UX System components undergo rigorous testing internally to minimize risk.

**Q:** Do we need synchronization between extensions/apps regarding shared components published by Fabric shell?  
**A:** No. Web components are fully encapsulated in shadow DOM, preventing version conflicts even if different versions coexist in different extensions.

## Requirements Addressed

This whitepaper addresses the following key requirements of the Fabric UX System:

✅ **Angular-Specific Features**: Components must support content projection, templating, and dynamic component creation in Angular.
> **Met by**: Angular wrappers specifically designed to support Angular-specific features.

✅ **Clear Migration Paths**: The system must provide clear migration paths and documentation for major version transitions.
> **Met by**: Comprehensive documentation and extended support for previous versions during transitions.

✅ **Backward Compatibility**: The system must maintain backward compatibility for non-major version updates.
> **Met by**: Non-major version updates designed to be non-breaking, focusing on bug fixes and enhancements.

✅ **Extended Support**: The system must provide extended support for previous versions during major version transitions.
> **Met by**: Long deprecation windows and clear migration paths for major version updates.

✅ **Documentation Updates**: The system must provide regular updates to documentation as components evolve.
> **Met by**: Commitment to maintaining up-to-date documentation as the system evolves.

For a complete list of all requirements and how they are met, please refer to the "[Requirements and Compliance](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/ETE64EeUg1JNnFtDgVCRDkcBMycPFYojTGl-naYTcQ4qEg?e=h2yW46)" whitepaper (07).

## About This Whitepaper Series

This whitepaper is part of a series that provides comprehensive information about the Fabric UX System:

1. **[Executive Overview](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EVLsz1jmMEFIkoxdbsBvb0cBkRq41NcyKzeiknQv-LJuKQ?e=PEAJPy)**: High-level introduction to the Fabric UX System, its purpose, and key benefits.
2. **[Design Language and Tokens](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EViEdV3OoJ9PkRDZRDmouCwB4S_GCDoK2h-F8rmUHuWS0A?e=Nkzfgy)**: Detailed information about the design language, design tokens, and theming capabilities.
3. **[Component Library and Patterns](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EaRRL-BAezdNnC2-MfPB1HABeuqSWYraEwQLTXCK6OH4eg?e=b0tfqO)**: Overview of the component library, including available components and UX patterns.
4. **[Accessibility and Content Design](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EWRplYWZiRZHh2iLgVkUzBQBsJ90tBFrSWRQB2SRTbmgtQ?e=tvxGH4)**: Guidance on accessibility compliance and content design best practices.
5. **[Implementation Guide](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/EY3v1PN_bd9Cr_AiAQk0-XABUiXOeGui2DCwV4ysw9tLAQ?e=qUjgWc)**: Technical details for implementing the Fabric UX System in your applications.
6. **Question and Answer** (this document): Answers to common questions about the Fabric UX System.
7. **[Requirements and Compliance](https://microsoft.sharepoint.com/:w:/t/HorizonFramework/ETE64EeUg1JNnFtDgVCRDkcBMycPFYojTGl-naYTcQ4qEg?e=h2yW46)**: Comprehensive specification of system requirements and compliance verification.

## Conclusion

The Fabric UX System provides a comprehensive framework for creating cohesive, accessible, and high-performance experiences within Microsoft Fabric. This Q&A document addresses common questions and concerns about implementing the system, providing practical guidance for teams adopting the framework.

### Key Takeaways

- The Fabric UX System is designed for minimal bundle size impact and efficient performance
- Components can be gradually adopted alongside existing UI libraries
- Web Components provide strong encapsulation, preventing style conflicts and version issues
- Accessibility is a core consideration, with support for Microsoft accessibility standards and high-contrast mode
- The contribution model encourages participation while maintaining design consistency

### Next Steps

For more detailed information on implementing the Fabric UX System, refer to the other whitepapers in this series:

- **Design Language & Tokens Whitepaper**: Learn about the design language and tokens that form the foundation of the system
- **Component Library & Patterns Whitepaper**: Get detailed information on the available components and patterns
- **Implementation Guide Whitepaper**: Find practical guidance on implementing the system in your applications

## Long-Term Strategy and Maintenance

### System Longevity

**Q:** What is the expected lifespan of the Fabric UX System? Will it be deprecated after a certain period?  
**A:** The Fabric UX System is designed for long-term use and is not intended to be deprecated after a specific timeframe. Unlike previous component systems that required replacement due to technology shifts, the Fabric UX System is built on web standards that provide lasting compatibility.

**Q:** What makes the Fabric UX System more sustainable than previous component libraries?  
**A:** The Fabric UX System addresses common reasons for component system replacement:
1. **Technology stack changes**: Web components are built directly on the modern web platform (HTML, CSS, JS), ensuring compatibility across current and future frameworks.
2. **Component management**: The UX Engineering team maintains centralized oversight to prevent uncontrolled growth and maintain system integrity.
3. **Design system evolution**: Close collaboration with the Fluent team and careful token management ensures smooth updates with minimal disruption.

### Maintenance and Updates

**Q:** What kind of work will be required by teams to maintain and update components?  
**A:** For non-major semantic version updates, the process follows standard library practices:
- Teams can simply bump the package version
- Updates are designed to be non-breaking
- The Fabric UX team can assist with the package update if engineering teams prefer

For major version upgrades:
- Breaking changes will be clearly documented
- Beta versions will be available for pre-testing
- Feedback periods will be provided
- Breaking changes will be minimized by being additive whenever possible
- Deprecated features will have long deprecation windows

### Adoption Considerations

**Q:** When should teams consider adopting Fabric UX System components?  
**A:** Teams should consider adoption in these scenarios:
- When needing a component or capability that is already built in the system
- When building something new
- When performing a significant rebuild of a feature
- When implementing cross-cutting design features (like dark mode)
- When seeking performance benefits, especially for UI with large DOM structures or real-time modifications
- When planning large design system updates where the cost of upgrading is equal to or less than upgrading existing components

**Q:** How should teams approach mixing new and existing design systems?  
**A:** For designs using different design systems:
- If your design uses Fluent 2: Build with Fabric UX System components
- If your design uses Fluent 1: Use Fabric UX System components and adjust tokens to match the design as closely as possible
- If your design uses neither Fluent 1 nor 2: Use tokens to match the design as closely as possible
- Never use CSS overrides; if engineers feel they need to, they should work with designers to update the design

### CSS and Styling

**Q:** How does the shadow DOM affect styling of components?  
**A:** The shadow DOM encapsulates component internals so that CSS rules from the document (or "light DOM") won't directly affect elements inside the shadow tree. This prevents style conflicts but allows for controlled customization through:
- Inherited properties (color, font-family, etc.) that pass from the shadow host into the shadow tree
- CSS custom properties (variables) that are inherited and can be used for theming
- Exposed styling APIs using ::part() and ::slotted() pseudo-elements that allow limited external styling while preserving encapsulation

These mechanisms provide the right balance of encapsulation and customization, allowing you to theme components appropriately without risking style conflicts.

