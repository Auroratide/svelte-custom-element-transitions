<svelte:options tag="fly-example" />

<script lang="ts">
    import { fly } from '../module'

    let hidden: boolean = false
    const toggle = () => hidden = !hidden
</script>

<section class="example">
    <button part="button" on:click={toggle}>Toggle</button>
    <div class="container">
        <h2 class="placeholder">Fly Example</h2>
        {#if !hidden}
            <h2 class="transition" transition:fly={{x: -100, y: -50}}>Fly Example</h2>
        {/if}
    </div>
</section>

<style>
    :host {
        display: block;
    }

    h2 {
        margin: 0;
    }

    button {
        background: var(--example-color);
        margin-bottom: 2em;
    }

    .example {
        text-align: center;
        background: var(--color-fg);
        border-radius: 0.25em;
        padding: 2em;
        height: 100%;
        box-sizing: border-box;
    }

    .container {
        position: relative;
    }

    .placeholder {
        visibility: hidden;
    }

    .transition {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }
</style>