# Mini Immich

Aplicação acadêmica de galeria de fotos, desenvolvida para a disciplina de
Arquitetura de Software. O projeto permite cadastrar imagens por URL, visualizar
as fotos em uma galeria e abrir seus detalhes.

## Inspiração

O Mini Immich foi inspirado no [Immich](https://github.com/immich-app/immich),
um projeto open source de gerenciamento de fotos e vídeos. A referência serviu
como inspiração para o tema e a organização do frontend; este é um projeto
acadêmico independente, simplificado, e não é uma versão oficial ou afiliada ao
Immich.

## Funcionalidades

- Visualizar fotos em uma galeria responsiva.
- Cadastrar uma foto com título e URL, sem recarregar a página.
- Abrir a foto em tamanho maior e retornar à galeria.
- Exibir uma mensagem quando a galeria estiver vazia.

## Tecnologias

- SvelteKit
- Svelte 5
- TypeScript
- HTML e CSS
- npm

Não há backend, API externa ou banco de dados. As fotos são mantidas em memória
durante o uso da aplicação e podem desaparecer ao atualizar a página.

## Organização do código

```text
src/
├── lib/
│   ├── components/
│   │   └── FotoCard.svelte
│   ├── services/
│   │   └── fotoService.ts
│   └── types/
│       └── Foto.ts
└── routes/
    └── +page.svelte
```

- `Foto.ts` define o tipo de dados de uma foto: identificador, título e URL.
- `fotoService.ts` lista e adiciona fotos em uma coleção mantida em memória.
- `FotoCard.svelte` apresenta uma foto e informa à página quando ela é
  selecionada.
- `+page.svelte` reúne o formulário, a galeria e a visualização dos detalhes.

Essa separação mantém a interface, as operações sobre as fotos e o modelo de
dados em responsabilidades distintas, sem introduzir camadas arquiteturais
desnecessárias para o escopo do projeto.

## Como executar

Requer Node.js e npm instalados.

```sh
npm install
npm run dev
```

Para gerar a versão de produção:

```sh
npm run build
```
