<script lang="ts">
	let { link = '' }: { link: string } = $props();

	let inputEl: HTMLInputElement;
	let copied = $state(false);
	let timeout: ReturnType<typeof setTimeout>;

	function copyLink() {
		inputEl?.select();
		navigator.clipboard.writeText(link).then(() => {
			copied = true;
			clearTimeout(timeout);
			timeout = setTimeout(() => {
				copied = false;
			}, 1500);
		});
	}
</script>

<div class="link-section">
	<div>
		<div class="input-wrap">
			<input
				id="share-link-input"
				type="text"
				value={link}
				readonly
				bind:this={inputEl}
				onclick={copyLink}
			/>
			{#if copied}
				<span class="copied-toast">Copied!</span>
			{/if}
		</div>
	</div>
</div>

<style>
	.link-section {
		text-align: center;
		position: relative;
		margin: 0;
	}

	.input-wrap {
		position: relative;
		width: 90%;
		margin: 0 auto;
	}

	.link-section input {
		padding: 0.55rem 0.65rem;
		border: 4px solid #000;
		font-family: monospace;
		display: block;
		width: 100%;
		background: #fff;
		cursor: pointer;
		transition: box-shadow 0.15s;
	}

	.link-section input:focus {
		outline: none;
		box-shadow: 3px 3px 0 #000;
	}

	.copied-toast {
		position: absolute;
		right: -4.5rem;
		top: 50%;
		transform: translateY(-50%);
		background: #d600ff;
		color: #fff;
		padding: 0.2rem 0.5rem;
		font-size: 0.75rem;
		border: 3px solid #000;
		box-shadow: 3px 3px 0 #000;
		white-space: nowrap;
		animation: fadeInOut 1.5s ease-out forwards;
	}

	@keyframes fadeInOut {
		0% { opacity: 0; transform: translateY(-50%) translateX(-4px); }
		15% { opacity: 1; transform: translateY(-50%) translateX(0); }
		70% { opacity: 1; }
		100% { opacity: 0; }
	}
</style>
