<script lang="ts">
    import { dialog } from "$stores/dialogs";

</script>

<div class="menu text-white text-2xl">
	<div class="grid grid-cols-1">
		<div class="flex flex-col items-center">
			<div class="text-3xl">
                {$dialog.title}
            </div>
            <div class=" mt-2 mb-2">
                {$dialog.content}
            </div>
            {#each $dialog.dialogChoices as dialogChoice}
                <div class="action cursor-pointer">
                    {dialogChoice.content}
                </div>
            {/each}
		</div>
	</div>
</div>
