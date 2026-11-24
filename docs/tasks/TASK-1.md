# TASK-1 — Fundação do projeto, identidade visual e catálogo

**Status:** concluída conforme a captura gráfica fornecida; aguardando aprovação do estudante antes de iniciar a TASK-2.  
**Dependências resolvidas nesta tarefa:** autorização explícita; projeto inicial vazio; captura de Home/catálogo fornecida. O link original do Figma e a rubrica integral continuam pendentes, mas não impediram a implementação limitada a esta referência.

## Escopo

- Fundação do projeto React, Vite e TypeScript e estrutura inicial, somente após aprovação.
- Identidade visual alinhada à captura fornecida, logo e hero criados com IA, tokens, Header, Home e catálogo.
- Os produtos, preços e categorias visíveis foram transcritos da captura. A origem dos arquivos de foto ainda não está disponível; cards usam ilustrações vetoriais locais.
- Não foram implementados endereço/cidade, carrinho, quantidade, checkout ou confirmação, apesar de aparecerem em outras telas da referência.

## Rastreabilidade

RF-01…RF-16 e RN-01…RN-10: **IDs e aplicabilidade pendentes de transcrição do enunciado**. Antes de iniciar, criar mapa requisito → arquivo → evidência/teste. Não associar IDs arbitrariamente.

## Arquivos envolvidos (previsão)

- `package.json`, `package-lock.json`, `index.html`, `vite.config.ts`, `tsconfig*.json`.
- `src/app/`, `src/components/Header/`, `src/features/home/`, `src/features/catalog/`, `src/styles/`, `src/test/`.
- `public/coffee-delivery-emblem.png` (emblema IA) e `public/coffee-hero.png` (ilustração hero IA; prompts em `docs/AI_USAGE.md`).
- `src/features/catalog/catalog-data.ts` (14 produtos transcritos da referência).
- `src/features/home/Home.test.tsx` e `src/features/catalog/CoffeeCatalog.test.tsx`.

## Critérios de conclusão verificáveis

1. Aplicação Vite inicia e `npm run build` compila TypeScript sem `any`.
2. Emblema original roxo/amarelo e imagem hero foram gerados com IA e registrados em `docs/AI_USAGE.md`.
3. Tokens roxo/amarelo/cinza são usados por Header, Home e catálogo, seguindo a captura visual.
4. Header, Home e catálogo mostram os 14 itens, categorias, descrições e preços lidos da captura. Fotos originais por produto não foram anexadas; ilustrações vetoriais locais são a adaptação registrada.
5. Testes de renderização, navegação, skip link, hero alternativo, cards, categorias e valores passam.
6. Chrome validou 1440 px e 390 px. No viewport móvel, `document.body.scrollWidth` e `document.documentElement.clientWidth` são ambos 390 px; 14 cards são renderizados.
7. Documentação atualizada; nenhuma ação de carrinho, endereço ou checkout foi implementada.

## Testes executados

- `npm run build`: passou (TypeScript e build Vite 8.3.8).
- `npm test`: passou, 2 arquivos e 4 testes (Vitest 5.1.1).
- `npm audit`: zero vulnerabilidades após atualizar Vite, Vitest e plugin React.
- Chrome Headless via DevTools: capturas completas de desktop 1440 px e mobile 390 px em `docs/evidence/`; 14 produtos em ambas e sem overflow horizontal no mobile.
- Revisão de teclado/leitor de tela ainda pendente; as capturas não comprovam conformidade WCAG completa.

## Pendências

Enunciado e rubrica integrais; acesso ao Figma para conferir dimensões e assets originais de produtos; confirmação do professor para textos pequenos da captura; aprovação do estudante desta entrega.
