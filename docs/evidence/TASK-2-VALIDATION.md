# Evidências e pendências de validação — TASK-2

**Atualizado:** 2026-11-24
**Origem:** resultados manuais informados pelo estudante; os itens abaixo não foram executados pelo agente nesta validação.

## Resultados manuais informados

- Dois produtos distintos com duas unidades cada; badge total de quatro unidades. Incrementar, decrementar e remover foram relatados como funcionais.
- Subtotal de R$ 39,60 + entrega fixa provisória de R$ 3,50 = total de R$ 43,10, conferidos visualmente pelo estudante.
- Consulta ViaCEP realizada para `05734-090`; rua, bairro, cidade e UF preenchidos automaticamente.
- Crédito, débito e dinheiro disponíveis e selecionáveis; a interface exibiu dados válidos para São Paulo — SP.
- O fluxo informou que a finalização do pedido pertencia à TASK-3.

Não recebemos ou localizamos capturas de tela TASK-2 no repositório. `docs/evidence/` contém apenas as duas capturas registradas para TASK-1. Playwright MCP não estava disponível nas sessões de validação anteriores e não foi usado para produzir evidência TASK-2.

## Verificações ainda necessárias

- [ ] No navegador, atualizar a página com itens no carrinho e conferir produtos, quantidades e badge após recarga.
- [ ] Conferir checkout em desktop e em viewport mobile de 390 × 844, sem conteúdo cortado ou perda de operação.
- [ ] Fazer auditoria manual WCAG 2.2 AA: navegação por teclado, ordem e indicador de foco, labels, associação/anúncio de erros e contraste.
- [ ] Se Playwright MCP estiver disponível, repetir persistência e viewports automatizados e arquivar evidências; caso contrário, anexar capturas manuais com os viewports anotados.
- [ ] Revisar erros de console no navegador, se possível.

Os testes Vitest e build registrados em `docs/tasks/TASK-2.md` são evidência automatizada de lógica/integração local, não substituem os itens manuais acima. As pendências permanecem mesmo com a implementação da TASK-3 e não bloquearam seu desenvolvimento.
