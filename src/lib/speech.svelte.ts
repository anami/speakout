export function createSpeechEngine() {
	let text = $state('Welcome to SpeakOut! Type anything here and press play. Have fun!');
	let speaking = $state(false);
	let paused = $state(false);
	let speechAvailable = $state(false);
	let voices = $state<SpeechSynthesisVoice[]>([]);
	let selectedVoiceIndex = $state(0);
	let pitch = $state(1.0);
	let rate = $state(1.0);
	let volume = $state(1.0);
	let openOptions = $state(false);
	let progress = $state(0);

	// Scaled integer values for range inputs
	let pitchVal = $derived(Math.round(pitch * 10));
	let rateVal = $derived(Math.round(rate * 10));
	let volVal = $derived(Math.round(volume * 10));

	let selectedVoice = $derived(voices[selectedVoiceIndex] ?? null);
	let active = $derived(speaking || paused);

	let shareLink = $derived.by(() => {
		if (typeof window === 'undefined') return '';
		const base = window.location.origin + window.location.pathname;
		return base + '?phrase=' + encodeURI(text.toLowerCase());
	});

	function init() {
		if (typeof window === 'undefined') return;

		if (window.speechSynthesis) {
			speechAvailable = true;

			if ('onvoiceschanged' in window.speechSynthesis) {
				window.speechSynthesis.onvoiceschanged = () => {
					voices = window.speechSynthesis.getVoices();
				};
			}

			// Firefox and Safari fallback
			const initialVoices = window.speechSynthesis.getVoices();
			if (initialVoices.length > 0) {
				voices = initialVoices;
			}

			// Parse query string
			const params = new URLSearchParams(window.location.search);
			const phrase = params.get('phrase');
			if (phrase) {
				text = decodeURI(phrase);
			}
		}
	}

	function speak() {
		if (!window.speechSynthesis || text.length === 0) return;

		if (paused) {
			window.speechSynthesis.resume();
			speaking = true;
			paused = false;
			return;
		}

		if (window.speechSynthesis.speaking) {
			window.speechSynthesis.pause();
			speaking = false;
			paused = true;
			return;
		}

		window.speechSynthesis.cancel();

		const utterance = new SpeechSynthesisUtterance(text);

		utterance.onstart = () => {
			speaking = true;
		};

		utterance.onresume = () => {
			speaking = true;
		};

		utterance.onend = () => {
			speaking = false;
			paused = false;
			progress = 0;
			window.speechSynthesis.cancel();
		};

		utterance.onboundary = (e: SpeechSynthesisEvent) => {
			const textLength = text.length;
			const words = text.substring(e.charIndex, text.length).split(' ');
			const partialLength = e.charIndex + words[0].length;
			progress = (partialLength * 100) / textLength;
		};

		utterance.onerror = (e) => {
			console.error('Speech error:', e);
			speaking = false;
			paused = false;
		};

		if (selectedVoice) {
			utterance.voice = selectedVoice;
		}
		utterance.pitch = pitch;
		utterance.rate = rate;
		utterance.volume = volume;
		progress = 0;

		window.speechSynthesis.speak(utterance);
	}

	function stop() {
		window.speechSynthesis.cancel();
		speaking = false;
		paused = false;
		progress = 0;
	}

	function clear() {
		text = '';
	}

	function toggleOptions() {
		openOptions = !openOptions;
	}

	function resetOptions() {
		selectedVoiceIndex = 0;
		pitch = 1.0;
		rate = 1.0;
		volume = 1.0;
	}

	function setPitch(val: number) {
		pitch = val / 10;
	}

	function setRate(val: number) {
		rate = val / 10;
	}

	function setVolume(val: number) {
		volume = val / 10;
	}

	function setVoiceIndex(index: number) {
		selectedVoiceIndex = index;
	}

	function setText(val: string) {
		text = val;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			speak();
		}
	}

	return {
		get text() { return text; },
		get speaking() { return speaking; },
		get active() { return active; },
		get speechAvailable() { return speechAvailable; },
		get voices() { return voices; },
		get selectedVoiceIndex() { return selectedVoiceIndex; },
		get pitch() { return pitch; },
		get rate() { return rate; },
		get volume() { return volume; },
		get pitchVal() { return pitchVal; },
		get rateVal() { return rateVal; },
		get volVal() { return volVal; },
		get openOptions() { return openOptions; },
		get progress() { return progress; },
		get shareLink() { return shareLink; },
		init,
		speak,
		stop,
		clear,
		toggleOptions,
		resetOptions,
		setPitch,
		setRate,
		setVolume,
		setVoiceIndex,
		setText,
		handleKeydown
	};
}
