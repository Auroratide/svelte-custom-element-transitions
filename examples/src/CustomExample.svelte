<svelte:options tag="custom-example" />

<script lang="ts">
    import { forCustomElement } from '../../dist'
    import { spin as ogSpin } from './spin-transition'

    const spin = forCustomElement(ogSpin)

    let hidden: boolean = false

    const toggle = () => hidden = !hidden
</script>

<button on:click={toggle}>Toggle Visibility!</button>
{#if !hidden}
    <h2 transition:spin>Spin Example</h2>
{/if}
