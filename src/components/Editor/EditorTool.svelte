<script lang="ts">
    import {activatedTool, type ToolName} from '$stores/editor';

    export let tool: ToolName;

    const toggleTool = (toolToToggle: ToolName) => () => {
        activatedTool.update((activatedTool) => {
            if(activatedTool === toolToToggle) {
                activatedTool = null;
            } else {
                activatedTool = toolToToggle;
            }
            return activatedTool;
        });
    }

</script>

<button
    class="inline-block border border-1 rounded px-2 m-1"
    class:active={$activatedTool === tool}
    on:click={toggleTool(tool)}
>
    <slot />
</button>

<style>
    .active {
        background: white;
        color: black;
    }
</style>
