# Svelte Custom Element Transitions

It's a [known issue](https://github.com/sveltejs/svelte/issues/1825) that Svelte transitions do not work when compiling to custom elements (aka, web components). There's an active [Pull Request](https://github.com/sveltejs/svelte/pull/5870) which has been around for several months.

Hopefully that PR will be merged in the near future. But in case it doesn't, at least you have **@auroratide/svelte-custom-element-transitions**! This tiny module works around the issue by applying the CSS rules directly to the target node with Javascript.

```html
<script>
  import { fade } from '@auroratide/svelte-custom-element-transitions'
</script>

<h1 transition:fade>Hello!</h1>
```

This module also provides a higher order function which can make custom transitions work as well.

```js
import { forCustomElement } from '@auroratide/svelte-custom-element-transitions'

export const myTransition = forCustomElement((node, params) => {
    // ...
})
```

See the **[examples](examples)** for different possible use cases.

> By the way, each example is run as an automated test!
