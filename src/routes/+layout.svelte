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
		padding: 1rem 0.5rem;
	}

	header {
		background-color: #d600ff;
		color: #fff;
	}

	header p {
		margin-top: 0;
	}

	header h1 {
		text-align: center;
		font-size: 1.75rem;
		margin-right: 1rem;
	}

	footer {
		background-color: #fff;
		color: #d600ff;
		margin: 0;
	}

	footer a {
		color: #d600ff;
		margin-left: 8px;
	}
</style>
