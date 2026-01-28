<script>
	import '../app.css';

	let { children } = $props();
</script>

<header>
	<h1>SpeakOut!</h1>
	<p>a simple speaking toy</p>
</header>

<main>
	{@render children()}
</main>

<footer>
	<div><span>Made with &#9829; by </span><a href="https://anami.github.io">anami</a></div>
</footer>

<style>
	header,
	footer {
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 0.85rem 1rem;
	}

	header {
		background-color: #d600ff;
		color: #fff;
		border-bottom: 4px solid #000;
		box-shadow: 0 6px 0 #000;
		/* text-transform: uppercase; */
		letter-spacing: 0.08em;
	}

	header p {
		margin-top: 0;
		font-size: 0.85rem;
	}

	header h1 {
		text-align: center;
		font-size: 2rem;
		margin-right: 1rem;
		text-shadow: 2px 2px 0 #000;
	}

	footer {
		background-color: #fff;
		color: #d600ff;
		margin: 0;
		border-top: 4px solid #000;
	}

	footer a {
		color: #d600ff;
		margin-left: 8px;
	}

	:global(main) {
		flex: 1;
	}
</style>
