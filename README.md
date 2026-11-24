# Coffee Delivery

Aplicação acadêmica de catálogo e checkout de cafés feita com React, TypeScript, Vite, React Router, styled-components, React Hook Form e Zod. O código cobre Home/catálogo (TASK-1), carrinho/checkout/ViaCEP (TASK-2) e confirmação/snapshot de pedido (TASK-3).

> **Estado do projeto:** TASK-1 concluída. TASK-2 implementada e seus fluxos principais foram confirmados manualmente pelo estudante; permanecem pendentes persistência após refresh, responsividade do checkout e auditoria manual WCAG 2.2 AA. TASK-3 implementada, aguarda revisão; validações visuais/manual da confirmação, persistência real após refresh e acessibilidade permanecem pendentes. O enunciado integral do professor e os textos RF-01 a RF-16/RN-01 a RN-10 não foram fornecidos; não se declara conformidade acadêmica integral.

## Requisitos

- Node.js compatível com Vite 8 (Node.js 20.19+ ou 22.12+).
- npm.

## Instalação e execução local

```bash
npm install
npm run dev
```

O Vite mostra a URL local no terminal (normalmente `http://localhost:5173`). Para expor o servidor na rede local, use `npm run dev -- --host 0.0.0.0`.

## Comandos

```bash
npm test -- --pool=threads --maxWorkers=2 --isolate=false  # suíte Vitest neste ambiente Windows
npm run build                                           # checagem TypeScript e build de produção
npm run preview                                         # servidor local para inspecionar dist/
npm audit                                               # auditoria das dependências instaladas
```

## Estrutura

```text
src/
  app/                       # rotas e composição da aplicação
  components/Header/         # navegação e controle de tema
  features/catalog/          # dados tipados, cards e catálogo
  features/cart/             # reducer, contexto e persistência local
  features/checkout/         # formulário, validação, ViaCEP e preço
  features/order/            # snapshot persistido e confirmação
  features/home/             # Home responsiva
  styles/                    # tokens, temas e persistência do tema
  test/                      # configuração do Vitest/Testing Library
docs/                        # SPECs, tarefas, registro de IA e evidências
public/                      # logo e ilustração do hero
```

## Tema

O botão no Header alterna entre tema claro e escuro. Os tokens semânticos estão em `src/styles/tokens.ts`; a preferência é salva na chave `coffee-delivery.color-mode` no `localStorage`. Se o armazenamento do navegador estiver indisponível, o tema continua utilizável na sessão atual.

## Carrinho, checkout e ViaCEP

- O carrinho usa Context API e `useReducer`; as linhas persistem em envelope versionado no `localStorage`.
- As quantidades podem ser preparadas na Home e incrementadas, decrementadas ou removidas no checkout. O badge conta unidades, não tipos distintos.
- Subtotal, frete e total são calculados em centavos inteiros. O frete configurado é R$ 3,50 (350 centavos), valor visível na captura e autorizado pelo estudante como regra fixa provisória.
- O checkout usa React Hook Form e Zod. CEP válido precisa ser consultado no ViaCEP antes da validação; consulta preenche rua, bairro, cidade, UF e complemento quando retornados. Número é informado manualmente.
- Pagamento é selecionado entre crédito, débito e dinheiro, opções visíveis na captura. O projeto não processa pagamento.
- Após validação de endereço, consulta obrigatória ao ViaCEP e seleção de pagamento, “Confirmar pedido” cria snapshot local e navega à confirmação. Pagamento continua sendo realizado na entrega; nenhuma transação ocorre.
- A confirmação persiste apenas o pedido mais recente no navegador em `coffee-delivery.latest-order.v1`; um novo pedido substitui o anterior. Não há sincronização remota. Se gravar falhar, o carrinho não é limpo.

O estudante confirmou manualmente o fluxo da TASK-2: quatro unidades no badge, controles de quantidade/remoção funcionais, subtotal de R$ 39,60, entrega fixa provisória de R$ 3,50 e total de R$ 43,10; consulta ViaCEP para `05734-090`; seleção de crédito, débito ou dinheiro e mensagem de dados válidos para São Paulo — SP. Isso é relato manual do estudante. Persistência do carrinho após refresh, responsividade do checkout e WCAG manual estão pendentes e registradas em `docs/evidence/TASK-2-VALIDATION.md`.

## Testes e acessibilidade

Os testes unitários e de integração usam Vitest, jsdom e Testing Library. A suíte cobre Home, catálogo, reducer, persistência, cálculos, schema, ViaCEP, confirmação, snapshot, falha de gravação e jornada parcial/completa simulada. Na execução TASK-3, 34 testes em 13 arquivos passaram. WCAG 2.2 AA é a referência; auditoria manual e testes com tecnologia assistiva ainda não foram concluídos. Playwright MCP não estava disponível nesta execução, portanto não se declara validação visual por navegador.

## Build e preparação de deploy

`npm run build` cria os arquivos estáticos em `dist/`. `npm run preview` permite fazer uma verificação local do build. Para hospedar, publique `dist/` em um serviço de arquivos estáticos e configure fallback para `index.html` caso sejam introduzidas rotas de cliente. Nenhuma hospedagem foi escolhida ou configurada; não houve publicação nem push.

## Escopo ainda pendente

- TASK-2: validação manual de persistência após refresh, responsividade do checkout e WCAG 2.2 AA.
- TASK-3: revisão do estudante; validação visual/browser e confirmação manual de refresh de tema e pedido; auditoria manual WCAG 2.2 AA.
- Fonte do professor: enunciado, critérios de aceite e mapeamento literal de RF-01…RF-16 e RN-01…RN-10.
- Destino de deploy e assets finais de catálogo/marca.

Veja `docs/TASKS_SPEC.md` e `docs/tasks/TASK-3.md` para estado e rastreabilidade; `docs/AI_USAGE.md` registra o uso de IA.
