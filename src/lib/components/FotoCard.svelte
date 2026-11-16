<script lang="ts">
	import type { Foto } from '../types/Foto';

	let { foto, aoSelecionar }: { foto: Foto; aoSelecionar: (foto: Foto) => void } = $props();
</script>

<button class="foto-card" type="button" onclick={() => aoSelecionar(foto)}>
	<img src={foto.url} alt={foto.titulo} loading="lazy" />
	<span>{foto.titulo}</span>
</button>

<style>
	.foto-card {
		display: grid;
		gap: 0.75rem;
		padding: 0;
		overflow: hidden;
		border: 1px solid #e6e8ed;
		border-radius: 0.9rem;
		background: #fff;
		color: #20232b;
		text-align: left;
		cursor: pointer;
		transition:
			transform 160ms ease,
			box-shadow 160ms ease;
	}

	.foto-card:hover {
		transform: translateY(-3px);
		box-shadow: 0 12px 28px rgb(26 35 50 / 12%);
	}

	img {
		width: 100%;
		aspect-ratio: 4 / 3;
		object-fit: cover;
		background: #f0f1f4;
	}

	span {
		padding: 0 1rem 1rem;
		font-size: 0.95rem;
		font-weight: 600;
		overflow-wrap: anywhere;
	}
</style>
