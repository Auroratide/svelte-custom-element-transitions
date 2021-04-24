<svelte:options tag="tick-example" />

<script lang="ts">
    import { forCustomElement } from '../module'
    import { progress as ogProgress } from './progress'

    const progress = forCustomElement(ogProgress)

    let hidden: boolean = false
    const toggle = () => hidden = !hidden
</script>

<section class="example">
    <button part="button" on:click={toggle}>Toggle</button>
    <div class="container">
        {#if !hidden}
            <my-progress class="transition" max="1" value="1" transition:progress={{
                fromColor: [48, 48, 56],
                toColor: [94, 191, 54],
            }}></my-progress>
        {:else}
            <my-progress class="placeholder" max="1" value="0"></my-progress>
        {/if}
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

    .transition {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
    }

    my-progress {
        color: var(--progress-color);
    }
</style>