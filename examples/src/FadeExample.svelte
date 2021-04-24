<svelte:options tag="fade-example" />

<script lang="ts">
    import { fade } from '../../dist'
    // import { fade } from 'svelte/transition'

    let hidden: boolean = false

    const toggle = () => hidden = !hidden
</script>

<button on:click={toggle}>Toggle Visibility!</button>
{#if !hidden}
    <h2 transition:fade>Fade Example</h2>
{/if}
