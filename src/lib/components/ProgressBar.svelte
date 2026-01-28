<script lang="ts">
	import PlayIcon from './icons/PlayIcon.svelte';
	import StopIcon from './icons/StopIcon.svelte';

	let {
		progress = 0,
		speaking = false,
		active = false,
		onplay,
		onstop
	}: {
		progress: number;
		speaking: boolean;
		active: boolean;
		onplay: () => void;
		onstop: () => void;
	} = $props();
</script>

<div class="progress-controls">
	<button
		class="btn-play"
		aria-label={speaking ? 'Pause' : 'Play'}
		aria-pressed={speaking}
		onclick={onplay}
	>
		{#if speaking}
			<span class="pause-icon"></span>
			<span class="pause-icon"></span>
		{:else}
			<PlayIcon />
		{/if}
	</button>

	<button
		class="btn-stop"
		aria-label="Stop"
		disabled={!active}
		onclick={onstop}
	>
		<StopIcon />
	</button>

	<div class="speech__progress">
		<div class="speech__progress-bar" style="width: {progress}%"></div>
	</div>
</div>

<style>
	.progress-controls {
		display: flex;
		margin: 0;
	}

	.btn-play,
	.btn-stop {
		width: 3rem;
		height: 3rem;
		border: 3px solid #000;
		padding: 0;
		margin: 0;
		border-radius: 50%;
		background-color: #d600ff;
		color: #fff;
		cursor: pointer;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-shrink: 0;
		box-shadow: 3px 3px 0 #000;
		transition: transform 0.1s, box-shadow 0.1s;
	}

	.btn-play:hover:not(:disabled),
	.btn-stop:hover:not(:disabled) {
		transform: translate(1.5px, 1.5px);
		box-shadow: 1.5px 1.5px 0 #000;
	}

	.btn-play:active:not(:disabled),
	.btn-stop:active:not(:disabled) {
		transform: translate(3px, 3px);
		box-shadow: none;
	}

	.btn-play:disabled,
	.btn-stop:disabled {
		opacity: 0.4;
		cursor: not-allowed;
		box-shadow: 3px 3px 0 #000;
	}

	.btn-play :global(svg),
	.btn-stop :global(svg) {
		width: 1.25rem;
		height: 1.25rem;
	}

	.btn-stop {
		margin-top: 0;
	}

	.btn-play:focus-visible,
	.btn-stop:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px #d600ff, 3px 3px 0 3px #000;
	}

	.pause-icon {
		display: inline-block;
		width: 6px;
		height: 18px;
		background: #fff;
		margin: 0 2px;
		border-radius: 1px;
	}

	.speech__progress {
		flex: 10;
		border: 3px solid #000;
		padding: 0.25rem;
		margin: 0;
		height: 2rem;
		margin-top: 0.5rem;
		background: #fff;
		box-shadow: 4px 4px 0 #000;
	}

	.speech__progress-bar {
		background-color: #d600ff;
		height: 100%;
		transition: 0.25s;
	}
</style>
