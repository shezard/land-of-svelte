<script lang="ts">
    import {activatedTool, type ToolName} from '$stores/tool';

    export let tool: ToolName;
    export let title: string;

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
    class="inline-block border border-1 rounded px-2"
    class:active={$activatedTool === tool}
    on:click={toggleTool(tool)}
>
    {title}
</button>

<style>
    .active {
        background: white;
        color: black;
    }
</style>
