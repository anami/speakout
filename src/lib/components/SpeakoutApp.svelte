<script lang="ts">
	import { onMount } from 'svelte';
	import { createSpeechEngine } from '$lib/speech.svelte';
	import CogIcon from './icons/CogIcon.svelte';
	import NoSpeech from './NoSpeech.svelte';
	import ProgressBar from './ProgressBar.svelte';
	import OptionsPanel from './OptionsPanel.svelte';
	import ShareLink from './ShareLink.svelte';

	const engine = createSpeechEngine();

	onMount(() => {
		engine.init();
	});
</script>

{#if !engine.speechAvailable}
	<NoSpeech />
{:else}
	<div class="speakout-app">
		<section class="section">
			<span class="section-sticker">Text</span>
			<textarea
				value={engine.text}
				oninput={(e) => engine.setText(e.currentTarget.value)}
				onkeydown={(e) => engine.handleKeydown(e)}
				placeholder="Type something..."
			></textarea>
		</section>

		<section class="section">
			<span class="section-sticker section-sticker--controls">Controls</span>
			<ProgressBar
				progress={engine.progress}
				speaking={engine.speaking}
				active={engine.active}
				onplay={() => engine.speak()}
				onstop={() => engine.stop()}
			/>

			<div>
				<button class="btn-clear" onclick={() => engine.clear()}>Clear</button>
			</div>
		</section>

		<button
			class="button--options"
			aria-expanded={engine.openOptions}
			onclick={() => engine.toggleOptions()}
		>
			<CogIcon />
		</button>

		{#if engine.openOptions}
			<OptionsPanel
				voices={engine.voices}
				selectedVoiceIndex={engine.selectedVoiceIndex}
				pitch={engine.pitch}
				rate={engine.rate}
				volume={engine.volume}
				pitchVal={engine.pitchVal}
				rateVal={engine.rateVal}
				volVal={engine.volVal}
				onvoicechange={(i) => engine.setVoiceIndex(i)}
				onpitchchange={(v) => engine.setPitch(v)}
				onratechange={(v) => engine.setRate(v)}
				onvolumechange={(v) => engine.setVolume(v)}
				onreset={() => engine.resetOptions()}
			/>
		{/if}

		<section class="section section--share">
			<span class="section-sticker">Share</span>
			<ShareLink link={engine.shareLink} />
		</section>
	</div>
{/if}

<style>
	.speakout-app {
		margin: 2.5rem auto;
		max-width: 50rem;
		padding: 1.5rem;
		background: rgba(255, 255, 255, 0.96);
		border: 4px solid #000;
		box-shadow: 8px 8px 0 #000;
		text-align: center;
	}

	.section {
		position: relative;
		padding-top: 1.1rem;
	}

	.section--share {
		padding-top: 1.25rem;
	}

	.section-sticker {
		position: absolute;
		top: -0.6rem;
		left: 0.5rem;
		background: var(--accent, #ffe600);
		color: #000;
		border: 3px solid #000;
		box-shadow: 3px 3px 0 #000;
		padding: 0.1rem 0.6rem;
		text-transform: uppercase;
		letter-spacing: 1px;
		font-size: 0.8rem;
		transform: rotate(-2deg);
	}

	.speakout-app textarea {
		width: 100%;
		min-height: 6rem;
		border: 4px solid #000;
		border-radius: 0.25rem;
		padding: 0.75rem;
		background: #fff;
		transition: box-shadow 0.15s;
		margin-top: 0;
	}

	.speakout-app textarea:focus {
		outline: none;
		box-shadow: 4px 4px 0 #000;
	}

	.btn-clear {
		background-color: #d600ff;
		color: #fff;
		padding: 0.5rem 5rem;
		text-transform: uppercase;
		font-weight: normal;
		margin: 0.5rem;
		letter-spacing: 2px;
		border: 4px solid #000;
		box-shadow: 5px 5px 0 #000;
		transition: transform 0.1s, box-shadow 0.1s;
	}

	.btn-clear:hover {
		background-color: var(--accent, #ffe600);
		color: #000;
		transform: translate(2px, 2px);
		box-shadow: 2px 2px 0 #000;
	}

	.btn-clear:active {
		transform: translate(4px, 4px);
		box-shadow: none;
	}

	.btn-clear:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px var(--accent, #ffe600), 6px 6px 0 #000;
	}

	.button--options {
		width: 2rem;
		height: 2rem;
		background: transparent;
		border: 0;
		padding: 0;
		transition: transform 0.5s ease-out;
	}

	.button--options[aria-expanded='true'] {
		transform: rotate(45deg);
	}

	.button--options :global(svg) {
		width: inherit;
		height: inherit;
		color: #d600ff;
		fill: #d600ff;
		outline: none;
	}
</style>
