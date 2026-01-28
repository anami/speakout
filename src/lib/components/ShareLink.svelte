<script lang="ts">
	let { link = '' }: { link: string } = $props();

	let inputEl: HTMLInputElement;

	function selectAll() {
		inputEl?.select();
	}
</script>

<div class="link-section">
	<div>
		<label for="share-link-input">Link to your speech:</label>
		<input
			id="share-link-input"
			type="text"
			value={link}
			readonly
			bind:this={inputEl}
			onclick={selectAll}
		/>
	</div>
</div>

<style>
	.link-section {
		text-align: center;
	}

	.link-section input {
		padding: 0.25rem;
		border: solid 2px #d600ff;
		font-family: monospace;
		display: block;
		width: 80%;
		margin: 0 auto;
	}
</style>
