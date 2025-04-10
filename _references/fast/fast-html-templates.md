---
description: FAST Element 2.0: The @microsoft/fast-element package provides a named export called html, which is a tagged template literal used for creating HTML snippets that become your web components’ shadow DOM. A basic example shows how to import html and define a simple template that displays "Hello world." This snippet is then registered with the custom element so that it renders within its shadow DOM.  Bindings are a key feature of html templates. They enable more complex behaviors than plain string interpolation by allowing dynamic content updates based on changes in your component’s properties. A typical binding uses arrow-function syntax, such as ${x => x.greeting}, where x usually represents the component instance, and c is the rendering context. When dealing with booleans, you can place a ? before the attribute, for example ?disabled="${(x) => x.disabled}". This is especially useful for standard HTML boolean attributes (like disabled, checked, or required). For event bindings, use the @ symbol, such as @click="${(x, c) => x.clickHandler(c.event)}". By default, preventDefault() is called on the event, but you can return true from your handler to skip this behavior. Properties are bound by prefixing a colon to the property name, such as :value="${(x) => x.value}", which updates the property on the DOM element rather than the attribute.  Typed templates enhance both readability and correctness in TypeScript. You can specify the data model by providing a type parameter to the html tag, as in html<MyComponent>, ensuring TypeScript can validate that your bindings align with the properties of the component instance.
globs: src/frontend/**/*.ts,src/shared/**/*.ts
alwaysApply: false
---
# HTML Templates

The `@microsoft/fast-element` package offers a named export `html` which is a [tag template literal](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/farm/farm/farm/farm/https:/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). It can be used to create HTML snippets which will become your web components shadow DOM.

**Example:**
```typescript
import { html } from "@microsoft/fast-element";

export const template = html`
  <template>Hello world</template>
`;
```

## Binding

When working with the `html` template, bindings allow more complex behavior than simply passing attributes. These bindings are dynamic and are denoted by the [arrow function](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/farm/farm/farm/farm/https:/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions). By default attributes are assumed to be strings. We typically denote `x` for the element, and `c` for the context.

**Example:**
```ts
import { FASTElement, attr, html } from '@microsoft/fast-element';

const template = html<NameTag>`
  <h3>${x => x.greeting.toUpperCase()}</h3>
`;

export class NameTag extends FASTElement {
  @attr
  greeting: string = 'hello';
}

NameTag.define({
  name: 'name-tag',
  template
});
```

When the greeting attribute is updated, so will the template.

### Booleans

Boolean bindings use the `?` symbol, use these for Boolean attributes.

**Example:**
```typescript
import { html } from "@microsoft/fast-element";

export const template = html`
  <button
    ?disabled="${(x) => x.disabled}"
  >
    Button
  </button>
`;
```

### Events

Events bindings use the `@` symbol. All Element events are available see the [MDN documentation](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/farm/farm/farm/farm/https:/developer.mozilla.org/en-US/docs/Web/API/Element#events) for details.

**Example:**
```typescript
import { html } from "@microsoft/fast-element";

export const template = html`
  <button
    @click="${(x, c) => x.clickHandler(c.event)}"
  >
    Button
  </button>
`;
```

:::important
After your event handler is executed, `preventDefault()` will be called on the event object by default. You can return `true` from your handler to opt-out of this behavior.
:::

### Properties

Property bindings use the `:` symbol.

**Example:**
```typescript
import { html } from "@microsoft/fast-element";

export const template = html`
  <input
    :value="${(x) => x.value}"
  />
`;
```

Some complex use cases include binding to a custom property, updating that property and observing it. To learn more about observing properties, check out the [FASTElement](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/farm/farm/farm/farm/fast-element.md) document.

## Typed Templates

Your templates can be typed to the data model that they are rendering over. In TypeScript, we provide the type as part of the tag: `html<NameTag>`.

```ts
import { html } from '@microsoft/fast-element';

const template = html<NameTag>`
  <div>${x => x.greeting}</div>
`;
```