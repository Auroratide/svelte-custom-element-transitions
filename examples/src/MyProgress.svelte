<svelte:options tag="my-progress" />

<script lang="ts">
    export let value: number
    export let max: number
</script>

<div class="container">
    <div class="progress" style="width: {100 * (+value / +max)}%"></div>
</div>

<style>
    :host {
        display: block;
        height: 1em;
        border-radius: 0.25em;
        overflow: hidden;
    }

    .container {
        height: 100%;
        background-color: #f7f7f7;
    }

    .progress {
        background-color: currentColor;
        height: 100%;
    }
</style>