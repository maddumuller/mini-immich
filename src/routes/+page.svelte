<script lang="ts">
	import { onMount } from 'svelte';
	import FotoCard from '../lib/components/FotoCard.svelte';
	import { adicionarFoto, listarFotos } from '../lib/services/fotoService';
	import type { Foto } from '../lib/types/Foto';

	let fotos = $state<Foto[]>([]);
	let titulo = $state('');
	let url = $state('');
	let fotoSelecionada = $state<Foto | null>(null);
	let erro = $state('');

	onMount(() => {
		fotos = listarFotos();
	});

	function cadastrarFoto(event: SubmitEvent) {
		event.preventDefault();
		erro = '';

		const tituloValido = titulo.trim();
		const urlValida = url.trim();

		if (!tituloValido || !urlValida) {
			erro = 'Informe o título e a URL da imagem.';
			return;
		}

		adicionarFoto(tituloValido, urlValida);
		fotos = listarFotos();
		titulo = '';
		url = '';
	}
</script>

<svelte:head>
	<title>Mini Immich — sua galeria</title>
	<meta name="description" content="Uma galeria simples para cadastrar e visualizar suas fotos." />
</svelte:head>

<div class="app-shell">
	<header class="topbar">
		<a class="brand" href="/" aria-label="Mini Immich, início">
			<span class="brand-icon" aria-hidden="true">M</span>
			<span>mini<span class="brand-light">immich</span></span>
		</a>
		<p>Sua coleção, em um só lugar.</p>
	</header>

	<main>
		{#if fotoSelecionada}
			<section class="detail-view" aria-labelledby="detail-title">
				<button class="back-button" type="button" onclick={() => (fotoSelecionada = null)}>
					<span aria-hidden="true">←</span> Voltar à galeria
				</button>
				<div class="detail-image">
					<img src={fotoSelecionada.url} alt={fotoSelecionada.titulo} />
				</div>
				<h1 id="detail-title">{fotoSelecionada.titulo}</h1>
			</section>
		{:else}
			<section class="intro">
				<div>
					<p class="eyebrow">GALERIA PESSOAL</p>
					<h1>Suas memórias,<br />do seu jeito.</h1>
					<p class="intro-copy">Adicione fotos e reúna seus momentos favoritos.</p>
				</div>

				<form class="add-form" onsubmit={cadastrarFoto}>
					<h2>Adicionar foto</h2>
					<label for="titulo">Título</label>
					<input
						id="titulo"
						name="titulo"
						type="text"
						placeholder="Ex.: Fim de tarde na praia"
						bind:value={titulo}
						required
					/>
					<label for="url">URL da imagem</label>
					<input
						id="url"
						name="url"
						type="url"
						placeholder="https://exemplo.com/foto.jpg"
						bind:value={url}
						required
					/>
					{#if erro}
						<p class="error" role="alert">{erro}</p>
					{/if}
					<button class="submit-button" type="submit"
						>Adicionar à galeria <span aria-hidden="true">+</span></button
					>
				</form>
			</section>

			<section class="gallery-section" aria-labelledby="gallery-title">
				<div class="section-heading">
					<div>
						<p class="eyebrow">SEUS MOMENTOS</p>
						<h2 id="gallery-title">Galeria</h2>
					</div>
					{#if fotos.length > 0}
						<span class="photo-count">{fotos.length} {fotos.length === 1 ? 'foto' : 'fotos'}</span>
					{/if}
				</div>

				{#if fotos.length > 0}
					<div class="gallery">
						{#each fotos as foto (foto.id)}
							<FotoCard {foto} aoSelecionar={(foto) => (fotoSelecionada = foto)} />
						{/each}
					</div>
				{:else}
					<div class="empty-state">
						<div class="empty-icon" aria-hidden="true">▧</div>
						<h3>Sua galeria está vazia</h3>
						<p>Adicione sua primeira foto usando o formulário acima.</p>
					</div>
				{/if}
			</section>
		{/if}
	</main>

	<footer>Mini Immich <span aria-hidden="true">·</span> sua galeria pessoal</footer>
</div>

<style>
	:global(*) {
		box-sizing: border-box;
	}

	:global(body) {
		margin: 0;
		background: #f7f8fa;
		color: #20232b;
		font-family:
			Inter,
			ui-sans-serif,
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			'Segoe UI',
			sans-serif;
		-webkit-font-smoothing: antialiased;
	}

	:global(button),
	:global(input) {
		font: inherit;
	}

	.app-shell {
		min-height: 100vh;
	}

	.topbar {
		height: 76px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 max(6vw, calc((100vw - 1200px) / 2));
		border-bottom: 1px solid #e9ebef;
		background: #fff;
	}

	.brand {
		display: flex;
		align-items: center;
		gap: 0.65rem;
		color: #20232b;
		font-size: 1.15rem;
		font-weight: 750;
		letter-spacing: -0.05em;
		text-decoration: none;
	}

	.brand-icon {
		display: grid;
		width: 2rem;
		height: 2rem;
		place-items: center;
		border-radius: 0.65rem;
		background: #5664e8;
		color: white;
		font-size: 1rem;
		letter-spacing: 0;
	}

	.brand-light {
		color: #747987;
		font-weight: 500;
	}

	.topbar > p {
		margin: 0;
		color: #7d8290;
		font-size: 0.88rem;
	}

	main {
		width: min(1120px, calc(100% - 3rem));
		margin: 0 auto;
		padding: 4rem 0 5rem;
	}

	.intro {
		display: grid;
		grid-template-columns: 1fr minmax(290px, 390px);
		align-items: center;
		gap: 4rem;
		padding-bottom: 4rem;
	}

	.eyebrow {
		margin: 0 0 0.8rem;
		color: #5966df;
		font-size: 0.7rem;
		font-weight: 750;
		letter-spacing: 0.14em;
	}

	.intro h1 {
		margin: 0;
		font-size: clamp(2.6rem, 5vw, 4.25rem);
		font-weight: 650;
		line-height: 1.05;
		letter-spacing: -0.065em;
	}

	.intro-copy {
		margin: 1.15rem 0 0;
		color: #777d8a;
		font-size: 1rem;
	}

	.add-form {
		display: grid;
		gap: 0.65rem;
		padding: 1.5rem;
		border: 1px solid #e7e9ef;
		border-radius: 1rem;
		background: #fff;
		box-shadow: 0 10px 32px rgb(28 37 61 / 4%);
	}

	.add-form h2 {
		margin: 0 0 0.35rem;
		font-size: 1.05rem;
		letter-spacing: -0.02em;
	}

	label {
		margin-top: 0.35rem;
		color: #4c5260;
		font-size: 0.8rem;
		font-weight: 600;
	}

	input {
		width: 100%;
		padding: 0.78rem 0.85rem;
		border: 1px solid #e1e4eb;
		border-radius: 0.55rem;
		outline: none;
		color: #20232b;
		font-size: 0.85rem;
	}

	input:focus {
		border-color: #6975e8;
		box-shadow: 0 0 0 3px rgb(86 100 232 / 12%);
	}

	input::placeholder {
		color: #a4a8b2;
	}

	.submit-button {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-top: 0.4rem;
		padding: 0.85rem 1rem;
		border: 0;
		border-radius: 0.6rem;
		background: #5664e8;
		color: white;
		font-size: 0.85rem;
		font-weight: 650;
		cursor: pointer;
		transition: background 150ms ease;
	}

	.submit-button:hover {
		background: #4653d1;
	}

	.submit-button span {
		font-size: 1.25rem;
		font-weight: 400;
		line-height: 1;
	}

	.error {
		margin: 0;
		color: #b42318;
		font-size: 0.8rem;
	}

	.gallery-section {
		padding-top: 2.4rem;
		border-top: 1px solid #e7e9ee;
	}

	.section-heading {
		display: flex;
		align-items: end;
		justify-content: space-between;
		margin-bottom: 1.5rem;
	}

	.section-heading .eyebrow {
		margin-bottom: 0.3rem;
	}

	.section-heading h2 {
		margin: 0;
		font-size: 1.65rem;
		font-weight: 650;
		letter-spacing: -0.05em;
	}

	.photo-count {
		padding: 0.35rem 0.65rem;
		border-radius: 2rem;
		background: #eceeff;
		color: #4d59ce;
		font-size: 0.75rem;
		font-weight: 650;
	}

	.gallery {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
		gap: 1.25rem;
	}

	.empty-state {
		display: grid;
		justify-items: center;
		padding: 3.75rem 1rem;
		border: 1px dashed #dfe2e9;
		border-radius: 0.9rem;
		background: rgb(255 255 255 / 55%);
		text-align: center;
	}

	.empty-icon {
		display: grid;
		width: 3.25rem;
		height: 3.25rem;
		place-items: center;
		border-radius: 1rem;
		background: #eef0ff;
		color: #6470df;
		font-size: 1.8rem;
	}

	.empty-state h3 {
		margin: 1rem 0 0.35rem;
		font-size: 1rem;
	}

	.empty-state p {
		margin: 0;
		color: #858a96;
		font-size: 0.85rem;
	}

	.detail-view {
		max-width: 900px;
		margin: 0 auto;
	}

	.back-button {
		margin-bottom: 1.5rem;
		padding: 0;
		border: 0;
		background: none;
		color: #5966df;
		font-size: 0.9rem;
		font-weight: 650;
		cursor: pointer;
	}

	.back-button span {
		margin-right: 0.35rem;
	}

	.detail-image {
		display: grid;
		min-height: 260px;
		max-height: 70vh;
		place-items: center;
		overflow: hidden;
		border-radius: 1rem;
		background: #eceef2;
	}

	.detail-image img {
		display: block;
		max-width: 100%;
		max-height: 70vh;
		object-fit: contain;
	}

	.detail-view h1 {
		margin: 1.25rem 0 0;
		font-size: 1.8rem;
		font-weight: 650;
		letter-spacing: -0.04em;
		overflow-wrap: anywhere;
	}

	footer {
		padding: 1.5rem;
		border-top: 1px solid #e9ebef;
		color: #8a8f9b;
		font-size: 0.8rem;
		text-align: center;
	}

	footer span {
		padding: 0 0.35rem;
	}

	@media (max-width: 700px) {
		.topbar {
			height: 64px;
			padding: 0 1.25rem;
		}

		.topbar > p {
			font-size: 0.75rem;
		}

		main {
			width: min(100% - 2rem, 540px);
			padding: 2.5rem 0 3.5rem;
		}

		.intro {
			grid-template-columns: 1fr;
			gap: 2rem;
			padding-bottom: 2.5rem;
		}

		.intro h1 {
			font-size: 3rem;
		}

		.gallery {
			grid-template-columns: repeat(auto-fill, minmax(155px, 1fr));
			gap: 0.85rem;
		}

		.detail-image img {
			max-height: 60vh;
		}
	}
</style>
