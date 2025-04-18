---
description: FAST Element 2.0: FAST offers several HTML directives that simplify DOM interaction and rendering in different scenarios. The ref directive binds a single DOM element to a property on your component, enabling direct access and control over elements such as <video> or <canvas>. The slotted directive captures all nodes assigned to a specified <slot> in a property, making it possible to dynamically react to changes in slotted content. The children directive retrieves all child nodes of a particular container element, such as <ul>, into a property and can optionally apply filters to include only certain node types.  For conditional rendering, you can use the when directive to selectively display or hide blocks of HTML based on a boolean expression. Finally, the repeat directive provides a way to iterate over an array and create a template for each item. This directive supports various performance and indexing configurations, including control over whether to recycle views and whether to include properties like the current index. Each of these directives integrates seamlessly with FAST’s reactivity and lifecycle, allowing you to observe and respond to changes in DOM nodes, slot assignments, or array data in a maintainable, declarative manner.
globs: src/frontend/**/*.ts,src/shared/**/*.ts
alwaysApply: false
---
# HTML Directives

FAST provides directives to aide in solving some common scenarios.

## ref

Sometimes you need a direct reference to a single DOM node from your template. This might be because you need the rendered dimensions of the node, you want to control the playback of a `video` element, use the drawing context of a `canvas` element, or pass an element to a 3rd party library. Whatever the reason, you can get a reference to the DOM node by using the `ref` directive.

**Example: Referencing an Element**

```ts
import { FASTElement, attr, html, ref } from '@microsoft/fast-element';

const template = html<MP4Player>`
  <video ${ref('video')}>
    <source src=${x => x.src} type="video/mp4">
  </video>
`;

export class MP4Player extends FASTElement {
  @attr
  src: string;

  video: HTMLVideoElement;

  connectedCallback() {
    super.connectedCallback();
    this.video.play();
  }
}

MP4Player.define({
  name: "mp4-player",
  template
});
```

Place the `ref` directive on the element you want to reference and provide it with a property name to assign the reference to. Once the `connectedCallback` lifecycle event runs, your property will be set to the reference, ready for use.

:::tip
If you provide a type for your HTML template, TypeScript will type check the property name you provide to ensure that it actually exists on your element.
:::

## slotted

Sometimes you may want references to all nodes that are assigned to a particular slot. To accomplish this, use the `slotted` directive. (For more on slots, see [Working with Shadow DOM](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/docs/advanced/working-with-custom-elements.md).)

```ts
import { FASTElement, html, slotted } from '@microsoft/fast-element';

const template = html<MyElement>`
  <div>
    <slot ${slotted('slottedNodes')}></slot>
  </div>
`;

export class MyElement extends FASTElement {
  @observable
  slottedNodes: Node[];

  slottedNodesChanged() {
    // respond to changes in slotted node
  }
}
MyElement.define({
  name: 'my-element',
  template
});
```

Similar to the `children` directive, the `slotted` directive will populate the `slottedNodes` property with nodes assigned to the slot. If `slottedNodes` is decorated with `@observable` then it will be updated dynamically as the assigned nodes change. Like any observable, you can optionally implement a *propertyName*Changed method to be notified when the nodes change. Additionally, you can provide an `options` object to the `slotted` directive to specify a customized configuration for the underlying [assignedNodes() API call](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/https:/developer.mozilla.org/en-US/docs/Web/API/HTMLSlotElement/assignedNodes) or specify a `filter`.

:::tip
It's best to leverage a change handler for slotted nodes rather than assuming that the nodes will be present in the `connectedCallback`.
:::

## children

Besides using `ref` to reference a single DOM node, you can use `children` to get references to all child nodes of a particular element.

**Example: Referencing Child Nodes**

```ts
import { FASTElement, html, children, repeat } from '@microsoft/fast-element';

const template = html<FriendList>`
  <ul ${children('listItems')}>
    ${repeat(x => x.friends, html<string>`
      <li>${x => x}</li>
    `)}
  </ul>
`;

export class FriendList extends FASTElement {
  @observable
  listItems: Node[];

  @observable
  friends: string[] = [];

  connectedCallback() {
    super.connectedCallback();
    console.log(this.listItems);
  }
}

FriendList.define({
  name: 'friend-list',
  template
});
```

In the example above, the `listItems` property will be populated with all child nodes of the `ul` element. If `listItems` is decorated with `@observable` then it will be updated dynamically as the child nodes change. Like any observable, you can optionally implement a *propertyName*Changed method to be notified when the nodes change. Additionally, you can provide an `options` object to the `children` directive to specify a customized configuration for the underlying [MutationObserver](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/https:/developer.mozilla.org/en-US/docs/Web/API/MutationObserver).

:::important
Like `ref`, the child nodes are not available until the `connectedCallback` lifecycle event.
:::

:::tip
Using the `children` directive on the `template` element will provide you with references to all Light DOM child nodes of your custom element, regardless of if or where they are slotted.
:::

You can also provide a `filter` function to control which child nodes are synchronized to your property. As a convenience, we provide an `elements` filter that lets you optionally specify a selector. Taking the above example, if we wanted to ensure that our `listItems` array only included `li` elements (and not any text nodes or other potential child nodes), we could author our template like this:

**Example: HTML Template with Filtering Child Nodes**

```ts
const template = html<FriendList>`
  <ul ${children({ property: 'listItems', filter: elements('li') })}>
    ${repeat(x => x.friends, html<string>`
      <li>${x => x}</li>
    `)}
  </ul>
`;
```

If using the `subtree` option for `children` then a `selector` is *required* in place of a `filter`. This enables more efficient collection of the desired nodes in the presence of a potential large node quantity throughout the subtree.

## when

:::warning
Use sparingly, this will have impacts on performance. If you find yourself using this directive a lot in a single component, consider creating multiple components instead.
:::

The `when` directive enables you to conditionally render blocks of HTML. When you provide an expression to `when` it will render the child template into the DOM when the expression evaluates to `true` and remove the child template when it evaluates to `false` (or if it is never `true`, the rendering will be skipped entirely).

**Example: Conditional Rendering**

```ts
import { FASTElement, observable, html, when } from '@microsoft/fast-element';

const template = html<MyApp>`
  <h1>My App</h1>

  ${when(x => !x.ready, html<MyApp>`
    Loading...
  `)}
`;

export class MyApp extends FASTElement {
  @observable
  ready: boolean = false;

  @observable
  data: any = null;

  connectedCallback() {
    super.connectedCallback();
    this.loadData();
  }

  async loadData() {
    const response = await fetch('some/resource');
    const data = await response.json();
    
    this.data = data;
    this.ready = true;
  }
}

MyApp.define({
  name: 'my-app',
  template
});
```

:::note
The `@observable` decorator creates a property that the template system can watch for changes. It is similar to `@attr`, but the property is not surfaced as an HTML attribute on the element itself.
:::

In addition to providing a template to conditionally render, you can also provide an expression that evaluates to a template. This enables you to dynamically change what you are conditionally rendering.

**Example: HTML Template with Conditional Rendering and Dynamic Template**

```ts
const template = html<MyApp>`
  <h1>My App</h1>

  ${when(x => x.ready, x => x.dataTemplate)}
`;
```

## repeat

:::warning
Use sparingly, this will have impacts on performance. Instead, use slots and compose your component using multiple nested elements, slotted elements may provide more performant and more maintainable solutions. See the [FASTElement documentation](mdc:mcp-fabric-ux-system/mcp-fabric-ux-system/mcp-fabric-ux-system/fast-element.md) for details.
:::

To render a list of data, use the `repeat` directive, providing the list to render and a template to use in rendering each item.

**Example: List Rendering**

```ts
import { FASTElement, observable, html, repeat } from '@microsoft/fast-element';

const template = html<FriendList>`
  <h1>Friends</h1>

  <form @submit="${x => x.addFriend()}>"
    <input type="text" :value="${x => x.name}" @input="${(x, c) => x.handleNameInput(c.event)}">
    <button type="submit">Add Friend</button>
  </form>
  <ul>
    ${repeat(x => x.friends, html<string>`
      <li>${x => x}</li>
    `)}
  </ul>
`;

export class FriendList extends FASTElement {
  @observable
  friends: string[] = [];

  @observable
  name: string = '';

  addFriend() {
    if (!this.name) {
      return;
    }

    this.friends.push(this.name);
    this.name = '';
  }

  handleNameInput(event: Event) {
    this.name = (event.target! as HTMLInputElement).value;
  }
}

FriendList.define({
  name: 'friend-list',
  template
})
```

Similar to event handlers, within a `repeat` block you have access to a special context object. Here is a list of the properties that are available on the context:

* `event` - The event object when inside an event handler.
* `parent` - The parent view-model when inside a `repeat` block.
* `parentContext` - The parent `ExecutionContext` when inside a `repeat` block. This is useful when repeats are nested and the inner-most repeat needs access to the root view-model.
* `index` - The index of the current item when inside a `repeat` block (opt-in).
* `length` - The length of the array when inside a `repeat` block (opt-in).
* `isEven` - True if the index of the current item is even when inside a `repeat` block (opt-in).
* `isOdd` - True if the index of the current item is odd when inside a `repeat` block (opt-in).
* `isFirst` - True if the current item is first in the array inside a `repeat` block (opt-in).
* `isInMiddle` - True if the current item is somewhere in the middle of the array inside a `repeat` block (opt-in).
* `isLast` - True if the current item is last in the array inside a `repeat` block (opt-in).

Some context properties are opt-in because they are more costly to update. So, for performance reasons, they are not available by default. To opt into the positioning properties, pass options to the repeat directive, with the setting `positioning: true`. For example, here's how we would use the `index` in our friends template from above:

**Example: HTMLTemplate with List Rendering and Item Index**

```ts
const template = html<FriendList>`
  <ul>
    ${repeat(x => x.friends, html<string>`
      <li>${(x, c) => c.index} ${x => x}</li>
    `, { positioning: true })}
  </ul>
`;
```

Whether or not a repeat directive re-uses item views can be controlled with the `recycle` option setting. When `recycle: true`, which is the default value, the repeat directive may reuse views rather than create new ones from the template.  When `recycle: false` 
previously used views are always discarded and each item will always be assigned a new view. Recyling previously used views may improve performance in some situations but may also be "dirty" from the previously displayed item.

**Example: HTML Template with List Rendering and without view recycling**

```ts
const template = html<FriendList>`
  <ul>
    ${repeat(
      x => x.friends,
      html<string>`<li>${(x, c) => c.index} ${x => x}</li>`,
      { positioning: true, recycle: false }
    )}
  </ul>
`;
```

In addition to providing a template to render the items with, you can also provide an expression that evaluates to a template. This enables you to dynamically change what you are using to render the items.