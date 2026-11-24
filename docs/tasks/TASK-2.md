# TASK-2 — Estado, carrinho, checkout e integração ViaCEP

**Status:** implementada nesta execução; aguarda revisão/aprovação do estudante.
**Dependências:** TASK-1 implementada. O enunciado literal RF/RN segue ausente e impede declarar conformidade acadêmica integral.

## Escopo

- Context API, reducer e estado tipado do carrinho.
- Carrinho e persistência localStorage; navegação e checkout.
- Formulário React Hook Form com Zod.
- Consulta ViaCEP obrigatória (não opcional), com carregamento, sucesso e falhas.
- Seleção/simulação de pagamento sem processar transação real.

## Rastreabilidade

RF-01…RF-16 e RN-01…RN-10: correspondências ainda pendentes do enunciado. Mapear cada requisito aplicável a transição, interface e teste antes do início.

## Decisões registradas para esta implementação

- **Frete:** R$ 3,50 (350 centavos), valor mostrado na captura do checkout. O estudante autorizou seu uso como valor fixo provisório; não representa regra do professor confirmada.
- **Pagamento:** crédito, débito e dinheiro, opções visíveis na captura. Nenhuma transação é processada.
- **Endereço:** CEP, rua, número, complemento opcional, bairro, cidade e UF, campos visíveis na captura. ViaCEP é obrigatório para liberar a validação do checkout. Campos de rua/bairro/cidade/UF são preenchidos quando retornados; número é informado manualmente.
- **Limite:** submissão válida exibe estado local de validação e não cria nem confirma pedido. A confirmação permanece na TASK-3.

## Arquivos envolvidos (previsão)

- `src/features/cart/` (tipos, reducer, provider/contexto, persistência e UI).
- `src/features/checkout/` (formulário, schema, campos e seleção de pagamento).
- `src/services/` (cliente ViaCEP tipado e validadores da resposta).
- `src/app/` (rotas e providers); testes unitários, integração e fluxo.
- Atualizações em docs para regras aprovadas de quantidade, subtotal e frete.

## Critérios de conclusão verificáveis

1. Cada ação de carrinho tem transição determinística coberta por testes; limites e quantidades seguem o enunciado.
2. Estado válido sobrevive a reload via localStorage; JSON inválido/versão não suportada não quebra a aplicação e segue política documentada.
3. Subtotal/totais usam centavos inteiros; taxa e arredondamento seguem regra confirmada, sem valor presumido.
4. Formulário exibe erros associados aos campos e impede avanço com dados inválidos conforme esquema acordado.
5. CEP é normalizado/validado e enviado ao ViaCEP; resposta válida preenche campos definidos; CEP não encontrado e falhas de rede/HTTP têm tratamento verificável. Consulta não pode ser omitida.
6. Seleção de pagamento corresponde às opções do professor e não efetua pagamento real.
7. Rotas e navegação cobrem fluxo válido, retorno e entrada inválida conforme critérios do enunciado.
8. Cobertura de testes prevista para reducer, cálculos, schema, persistência, respostas ViaCEP e integração do checkout.

## Testes previstos

Unitários do reducer, persistência e cálculos; validação de formulário; serviço ViaCEP isolado com mocks; integração de fluxo de checkout com cenários válidos e inválidos; navegação. Sem depender de rede real nos testes.

## Pendências

Conferir frete, meios e campos com o enunciado/rubrica do professor; políticas de limite de quantidade e privacidade; validação visual em navegador. A captura sustenta os valores e campos usados, mas não substitui a fonte acadêmica.

## Evidências desta execução

- Testes cobrem reducer, persistência versionada, cálculos em centavos, schema do formulário, estados do cliente ViaCEP e fluxo parcial de checkout com rede simulada.
- `npm test -- --pool=threads --maxWorkers=2 --isolate=false`: 25 testes passaram em 9 arquivos.
- `npm run build`: passou com TypeScript e Vite 8.3.8.
- `npm audit`: zero vulnerabilidades.
- Chrome headless não iniciou no ambiente: o processo encerrou com `Acesso negado (0x5)`. Playwright MCP não está disponível, portanto não há novas capturas visuais nem revisão de console do navegador.
- Nenhum teste depende da rede externa.

## Validação manual informada pelo estudante — 2026-11-24

Os resultados abaixo foram confirmados pelo estudante após testes manuais na interface; não representam execução independente do agente nem substituem evidência automatizada:

- Dois produtos distintos com duas unidades cada; badge totalizou quatro unidades. Controles de incrementar, decrementar e remover foram vistos e reportados como funcionais.
- Resumo conferido visualmente: subtotal R$ 39,60 + entrega fixa provisória R$ 3,50 = total R$ 43,10.
- ViaCEP consultado com sucesso para `05734-090`; o estudante confirmou retorno e preenchimento automático de rua, bairro, cidade e UF. O texto literal do endereço retornado não foi registrado.
- Crédito, débito e dinheiro disponíveis; seleção funcionando. A interface exibiu “Dados válidos para São Paulo — SP”.
- A interface informa que a etapa final do pedido será implementada na TASK-3; não houve confirmação/criação de pedido nesta tarefa.

**Evidências visuais:** o estudante relatou possuir evidências visuais, mas novos arquivos não foram localizados em `docs/evidence/`; ali permanecem apenas capturas da TASK-1. Não foram produzidas capturas da TASK-2 pelo agente: Playwright MCP indisponível e Chrome headless não iniciou (`Acesso negado (0x5)`).

**Critérios ainda pendentes para aprovação integral:** confirmar manualmente persistência do carrinho após atualizar a página; validar responsividade do checkout; realizar auditoria manual WCAG 2.2 AA. Não foi executada revisão visual automatizada nem revisão de console do navegador. A suíte automatizada e build informados acima passaram, mas não cobrem esses itens manuais. Recomenda-se status “implementada; aguardando validações e aprovação”, sem marcar RF/RN como aprovados enquanto faltar o enunciado integral.
