---
description: FAST Element 2.0: Explains how to define and apply CSS styles to web components using the @microsoft/fast-element package. It introduces the css tagged template literal, which creates encapsulated ElementStyles that are adopted by the Shadow DOM, ensuring styles do not leak outside the component. Examples show how to use CSS properties for external theming, compose styles (e.g., sharing a normalize stylesheet), and pass multiple style sources (strings, CSSStyleSheet, or ElementStyles) for flexible and efficient styling. Tips on using :host, ::slotted, and ::part are also provided.
globs: src/frontend/**/*.ts,src/shared/**/*.ts
alwaysApply: false
---
# CSS Templates

The `@microsoft/fast-element` package offers a named export `css` which is a [tag template literal](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/farm/https:/developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals). It can be used to create CSS snippets which will become your web components CSS. These styles are [adoptedStylesheets](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/farm/https:/developer.mozilla.org/en-US/docs/Web/API/Document/adoptedStyleSheets) and associated with the `ShadowRoot`, they therefore do not affect styling in the rest of the document. To share styles between a document and web components, we suggest using [CSS properties](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/farm/https:/developer.mozilla.org/en-US/docs/Web/CSS/--*).

**Example:**
```ts
import { FASTElement, attr, css, html } from '@microsoft/fast-element';

const template = html`
  <span>${x => x.greeting.toUpperCase()}</span>
`;

export const styles = css`
  :host {
    color: red;
    background: var(--background-color, green);
  }
`;

export class NameTag extends FASTElement {
  @attr
  greeting: string = 'hello';
}

NameTag.define({
  name: 'name-tag',
  template,
  styles
});
```

HTML file:
```html
<style>
  body {
    --background-color: orange;
  }
</style>
<name-tag></name-tag>
```

Using the `css` helper, we're able to create `ElementStyles`. We configure this with the element through the `styles` option of the decorator. Internally, `FASTElement` will leverage [Constructable Stylesheet Objects](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/farm/https:/wicg.github.io/construct-stylesheets) and `ShadowRoot#adoptedStyleSheets` to efficiently re-use CSS across components. This means that even if we have 1k instances of our `name-tag` component, they will all share a single instance of the associated styles, allowing for reduced memory allocation and improved performance. Because the styles are associated with the `ShadowRoot`, they will also be encapsulated. This ensures that your styles don't affect other elements and other element styles don't affect your element.

## Composing styles

One of the nice features of `ElementStyles` is that it can be composed with other styles. Imagine that we had a CSS normalize that we wanted to use in our `name-tag` component. We could compose that into our styles like this:

**Example: Composing CSS Registries**

```ts
import { normalize } from './normalize';

const styles = css`
  ${normalize}
  :host {
    display: inline-block;
    contain: content;
    color: white;
    background: var(--fill-color);
    border-radius: var(--border-radius);
    min-width: 325px;
    text-align: center;
    box-shadow: 0 0 calc(var(--depth) * 1px) rgba(0,0,0,.5);
  }

  ...
`;
```

Rather than simply concatenating CSS strings, the `css` helper understands that `normalize` is `ElementStyles` and is able to re-use the same Constructable StyleSheet instance as any other component that uses `normalize`. 

:::note
You can also pass a CSS `string` or a [CSSStyleSheet](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/farm/https:/developer.mozilla.org/en-US/docs/Web/API/CSSStyleSheet) instance directly to the element definition, or even a mixed array of `string`, `CSSStyleSheet`, or `ElementStyles`.
:::

:::tip
Styles can be added or removed using `withBehaviors()` to the `css` tag template, or inside the `FASTElement`. check out the [advanced documentation](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/farm/docs/advanced/working-with-custom-elements.md) for details on these approaches.
:::

## Adding external styles

Styles can be added as an array, this can be useful for sharing styles between components and for bringing in styles as a string.

**Example:**
```ts
const sharedStyles = `
  h2 {
    font-family: sans-serif;
  }
`;

NameTag.define({
  name: 'name-tag',
  template,
  styles: [
    css`
      :host {
        color: red;
        background: var(--background-color, green);
      }
    `,
    sharedStyles
  ]
})
```

:::tip
You may notice that we have used [`:host`](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/farm/https:/developer.mozilla.org/en-US/docs/Web/CSS/:host), this is part of standard CSS pseudo classes. Pseudo elements that may be useful for styling your custom web components include [`::slotted`](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/farm/https:/developer.mozilla.org/en-US/docs/Web/CSS/::slotted) and [`::part`](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/farm/https:/developer.mozilla.org/en-US/docs/Web/CSS/::part).
:::