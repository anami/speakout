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
		background-color: rgba(255, 255, 255, 0.8);
		border: solid 4px #d600ff;
		animation: animFadeIn ease-out 0.5s;
	}

	@keyframes animFadeIn {
		from { opacity: 0; }
		to { opacity: 1; }
	}

	legend {
		padding: 0 0.5rem;
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
		border: solid 4px #d600ff;
		padding: 0.25rem;
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
		background-color: #d600ff;
		border-radius: 0.25rem;
		border: none;
	}

	input[type='range']::-webkit-slider-thumb {
		-webkit-appearance: none;
		box-shadow: 0 0 0 0.2rem #fefefe;
		height: 1.75rem;
		width: 1.75rem;
		border-radius: 0.25rem;
		background: #d600ff;
		cursor: pointer;
		margin-top: -0.75rem;
	}

	input[type='range']:focus::-webkit-slider-thumb {
		outline: none;
		box-shadow: 0 0 0 0.25rem #f0f;
	}

	input[type='range']::-moz-range-track {
		width: 100%;
		height: 0.33rem;
		cursor: pointer;
		background: #d600ff;
		border-radius: 0.25rem;
		border: none;
	}

	input[type='range']::-moz-range-thumb {
		border: none;
		height: 1.75rem;
		width: 1.75rem;
		border-radius: 0.25rem;
		background: #d600ff;
		cursor: pointer;
	}

	input[type='range']:focus::-moz-range-thumb {
		outline: none;
		box-shadow: 0 0 0 0.25rem #f0f;
	}

	.btn-reset {
		background-color: #d600ff;
		color: #fff;
		padding: 0.25rem 5rem;
		border-radius: 0.25rem;
		text-transform: uppercase;
		font-weight: normal;
		letter-spacing: 1px;
		border: none;
		display: block;
		margin: 0.5rem auto 0;
	}

	.btn-reset:focus {
		border: solid 5px red;
		outline: 0;
	}
</style>
