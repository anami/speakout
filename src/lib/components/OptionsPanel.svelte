<script lang="ts">
	let {
		voices = [],
		selectedVoiceIndex = 0,
		pitch = 1.0,
		rate = 1.0,
		volume = 1.0,
		pitchVal = 10,
		rateVal = 10,
		volVal = 10,
		onvoicechange,
		onpitchchange,
		onratechange,
		onvolumechange,
		onreset
	}: {
		voices: SpeechSynthesisVoice[];
		selectedVoiceIndex: number;
		pitch: number;
		rate: number;
		volume: number;
		pitchVal: number;
		rateVal: number;
		volVal: number;
		onvoicechange: (index: number) => void;
		onpitchchange: (val: number) => void;
		onratechange: (val: number) => void;
		onvolumechange: (val: number) => void;
		onreset: () => void;
	} = $props();
</script>

<fieldset class="speakout-options">
	<legend>Options</legend>

	<div class="speakout-options__section">
		<label for="voice-select">Speaker</label>
		<div>
			<select
				id="voice-select"
				value={selectedVoiceIndex}
				onchange={(e) => onvoicechange(Number(e.currentTarget.value))}
			>
				{#each voices as voice, i}
					<option value={i}>{voice.name} - ({voice.lang})</option>
				{/each}
			</select>
		</div>
	</div>

	<div class="speakout-options__section">
		<label for="pitch-range">Pitch</label>
		<div>
			<input
				id="pitch-range"
				type="range"
				min="0"
				max="20"
				value={pitchVal}
				oninput={(e) => onpitchchange(Number(e.currentTarget.value))}
			/>
			<span>{pitch.toFixed(1)}</span>
		</div>
	</div>

	<div class="speakout-options__section">
		<label for="rate-range">Rate</label>
		<div>
			<input
				id="rate-range"
				type="range"
				min="1"
				max="100"
				value={rateVal}
				oninput={(e) => onratechange(Number(e.currentTarget.value))}
			/>
			<span>{rate.toFixed(1)}</span>
		</div>
	</div>

	<div class="speakout-options__section">
		<label for="volume-range">Volume</label>
		<div>
			<input
				id="volume-range"
				type="range"
				min="0"
				max="10"
				value={volVal}
				oninput={(e) => onvolumechange(Number(e.currentTarget.value))}
			/>
			<span>{volume.toFixed(1)}</span>
		</div>
	</div>

	<button class="btn-reset" onclick={onreset}>Reset</button>
</fieldset>

<style>
	.speakout-options {
		background-color: rgba(255, 255, 255, 0.95);
		border: 4px solid #000;
		box-shadow: 6px 6px 0 #000;
		animation: animFadeIn ease-out 0.5s;
	}

	@keyframes animFadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	legend {
		padding: 0.1rem 0.6rem;
		background: #ffe600;
		border: 3px solid #000;
		box-shadow: 3px 3px 0 #000;
		text-transform: uppercase;
		letter-spacing: 1px;
		font-size: 0.8rem;
		transform: rotate(-2deg);
	}

	.speakout-options__section {
		display: flex;
		align-items: center;
	}

	.speakout-options__section > label {
		flex: 1;
	}

	.speakout-options__section > div {
		flex: 3;
		display: flex;
		align-items: center;
	}

	.speakout-options__section > div > input,
	.speakout-options__section > div > select {
		width: 80%;
	}

	select {
		border: 4px solid #000;
		padding: 0.35rem;
		background: #fff;
		box-shadow: 4px 4px 0 #000;
	}

	select:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px #d600ff, 5px 5px 0 #000;
	}

	/* Range slider styling */
	input[type='range'] {
		-webkit-appearance: none;
		width: 100%;
		background: transparent;
	}

	input[type='range']:focus {
		outline: none;
	}

	input[type='range']::-webkit-slider-runnable-track {
		width: 100%;
		height: 0.33rem;
		cursor: pointer;
		background-color: #000;
		border: none;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		height: 1.75rem;
		width: 1.75rem;
		background: #d600ff;
		border: 4px solid #000;
		box-shadow: 3px 3px 0 #000;
		cursor: pointer;
		margin-top: -0.75rem;
	}

	input[type='range']:focus-visible::-webkit-slider-thumb {
		box-shadow: 0 0 0 3px #d600ff, 4px 4px 0 #000;
	}

	input[type='range']::-moz-range-track {
		width: 100%;
		height: 0.33rem;
		cursor: pointer;
		background: #000;
		border: none;
	}

	input[type='range']::-moz-range-thumb {
		height: 1.75rem;
		width: 1.75rem;
		background: #d600ff;
		border: 4px solid #000;
		box-shadow: 3px 3px 0 #000;
		cursor: pointer;
	}

	input[type='range']:focus-visible::-moz-range-thumb {
		box-shadow: 0 0 0 3px #d600ff, 4px 4px 0 #000;
	}

	.btn-reset {
		background-color: #d600ff;
		color: #fff;
		padding: 0.5rem 5rem;
		text-transform: uppercase;
		font-weight: normal;
		letter-spacing: 1px;
		border: 4px solid #000;
		box-shadow: 5px 5px 0 #000;
		display: block;
		margin: 0.5rem auto 0;
		cursor: pointer;
		transition: transform 0.1s, box-shadow 0.1s;
	}

	.btn-reset:hover {
		transform: translate(2px, 2px);
		box-shadow: 2px 2px 0 #000;
	}

	.btn-reset:active {
		transform: translate(4px, 4px);
		box-shadow: none;
	}

	.btn-reset:focus-visible {
		outline: none;
		box-shadow: 0 0 0 3px #d600ff, 6px 6px 0 #000;
	}
</style>
