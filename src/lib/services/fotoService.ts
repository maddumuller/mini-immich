import type { Foto } from '../types/Foto';

let fotos: Foto[] = [];
let proximoId = 1;

export function listarFotos(): Foto[] {
	return [...fotos];
}

export function adicionarFoto(titulo: string, url: string): Foto {
	const foto: Foto = {
		id: String(proximoId++),
		titulo,
		url
	};

	fotos = [...fotos, foto];
	return foto;
}
