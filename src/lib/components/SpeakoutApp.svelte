<script lang="ts">
	import { onMount } from 'svelte';
	import { createSpeechEngine } from '$lib/speech.svelte.ts';
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
		<textarea
			value={engine.text}
			oninput={(e) => engine.setText(e.currentTarget.value)}
			onkeydown={(e) => engine.handleKeydown(e)}
			placeholder="Type something..."
		></textarea>

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

		<ShareLink link={engine.shareLink} />
	</div>
{/if}

<style>
	.speakout-app {
		margin: 2.25rem auto;
		max-width: 45rem;
		padding: 0 1.5rem;
		text-align: center;
	}

	.speakout-app textarea {
		width: 90%;
		min-height: 6rem;
		border: solid 6px #d600ff;
		padding: 0.25rem;
	}

	.btn-clear {
		background-color: #d600ff;
		color: #fff;
		padding: 0.25rem 5rem;
		border-radius: 0.25rem;
		text-transform: uppercase;
		font-weight: normal;
		margin: 0.5rem;
		letter-spacing: 1px;
		border: none;
	}

	.btn-clear:focus {
		border: solid 5px red;
		outline: 0;
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
