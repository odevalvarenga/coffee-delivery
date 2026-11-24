# TASK-2 — Estado, carrinho, checkout e integração ViaCEP

**Status:** planejada; depende da TASK-1 e de aprovação para implementação.  
**Dependências:** TASK-1 aceita; RF/RN transcritos; frete, catálogo e fluxo de checkout definidos.

## Escopo

- Context API, reducer e estado tipado do carrinho.
- Carrinho e persistência localStorage; navegação e checkout.
- Formulário React Hook Form com Zod.
- Consulta ViaCEP obrigatória (não opcional), com carregamento, sucesso e falhas.
- Seleção/simulação de pagamento sem processar transação real.

## Rastreabilidade

RF-01…RF-16 e RN-01…RN-10: correspondências ainda pendentes do enunciado. Mapear cada requisito aplicável a transição, interface e teste antes do início.

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

Taxa e regra de cálculo; campos e regra de CEP; comportamento em indisponibilidade ViaCEP; opções de pagamento; limites de quantidade; política de carrinho vazio e refresh; dados persistidos e privacidade.
