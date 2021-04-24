<svelte:options tag="blur-example" />

<script lang="ts">
    import { blur } from '../../dist'
    // import { blur } from 'svelte/transition'

    let hidden: boolean = false

    const toggle = () => hidden = !hidden
</script>

<button on:click={toggle}>Toggle Visibility!</button>
{#if !hidden}
    <h2 transition:blur>Blur Example</h2>
{/if}
