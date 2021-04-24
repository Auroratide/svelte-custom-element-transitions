<svelte:options tag="draw-example" />

<script lang="ts">
    import { draw } from '../module'

    let hidden: boolean = false
    const toggle = () => hidden = !hidden
</script>

<section class="example">
    <button part="button" on:click={toggle}>Toggle</button>
    <div class="container">
        <svg viewBox="0 0 5 5" xmlns="http://www.w3.org/2000/svg">
            {#if !hidden}
                <path class="transition" transition:draw
                    d="M2 1 h1 v1 h1 v1 h-1 v1 h-1 v-1 h-1 v-1 h1 z"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="0.5px"
                    stroke-linejoin="round"
                />
            {/if}
        </svg>
    </div>
</section>

<style>
    :host {
        display: block;
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

    svg {
        color: var(--example-color);
        width: 25%;
    }
</style>