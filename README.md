# Coffee Delivery

Aplicação acadêmica de catálogo e checkout de cafés feita com React, TypeScript, Vite, styled-components, React Hook Form e Zod. O código cobre Home/catálogo (TASK-1), carrinho/checkout/ViaCEP (TASK-2) e tema persistente (parte independente da TASK-3).

> **Estado do projeto:** a TASK-2 está implementada e aguarda aprovação. A tela de confirmação, snapshot e limpeza após confirmação pertencem à TASK-3 e ainda não foram implementados. O enunciado integral do professor e os textos de RF-01 a RF-16/RN-01 a RN-10 não foram fornecidos; não se declara conformidade acadêmica integral.

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
- A validação do checkout não confirma nem cria pedido; essa etapa fica para TASK-3.

## Testes e acessibilidade

Os testes de unidade e integração usam Vitest, jsdom e Testing Library. A suíte cobre Home, catálogo, reducer, persistência, cálculos, schema, ViaCEP e jornada parcial do checkout com rede simulada. WCAG 2.2 AA é a referência de projeto, mas a auditoria manual e testes com tecnologia assistiva ainda não foram concluídos. A verificação visual por navegador automatizado também está pendente; Playwright MCP não está disponível neste ambiente.

## Build e preparação de deploy

`npm run build` cria os arquivos estáticos em `dist/`. `npm run preview` permite fazer uma verificação local do build. Para hospedar, publique `dist/` em um serviço de arquivos estáticos e configure fallback para `index.html` caso sejam introduzidas rotas de cliente. Nenhuma hospedagem foi escolhida ou configurada; não houve publicação nem push.

## Escopo ainda pendente

- TASK-2 está implementada e aguarda aprovação.
- TASK-3: confirmação integrada, snapshot independente do pedido, limpeza após confirmação e tratamento de acesso inválido à confirmação.
- Fonte do professor: enunciado, critérios de aceite e mapeamento literal de RF-01…RF-16 e RN-01…RN-10.
- Destino de deploy e assets finais de catálogo/marca.

Veja `docs/TASKS_SPEC.md` e `docs/tasks/TASK-3.md` para estado e rastreabilidade; `docs/AI_USAGE.md` registra o uso de IA.
