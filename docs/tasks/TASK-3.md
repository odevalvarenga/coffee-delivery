# TASK-3 — Confirmação, qualidade final e entrega

**Status:** parcialmente executada. Tema persistente, tokens temáticos, README e teste unitário estão implementados; confirmação integrada e validação final bloqueadas até a TASK-2 ser concluída e aceita.
**Dependências:** TASK-2 aceita; comportamento de pedido e destino de deploy aprovados.

## Escopo

- Confirmação do pedido, snapshot e limpeza do carrinho no momento aprovado.
- Dark mode; responsividade e acessibilidade final.
- Testes de regressão e jornada; documentação e deploy.

## Estado desta execução (2026-11-24)

- **Concluído parcialmente:** temas claro/escuro persistentes em `localStorage`, tokens semânticos, controle de tema no Header, teste da persistência, README e build local.
- **Pendente por dependência:** confirmação, snapshot, exibição de endereço/pagamento, limpeza do carrinho e acesso inválido. A TASK-2 foi implementada depois desta execução parcial e aguarda aprovação; avançar requer aceite do estudante.
- **Pendente de fonte:** enunciado literal do professor e critérios RF/RN; o mapeamento permanece reservado e sem alegação de conformidade.
- **Pendente de ambiente/decisão:** destino de deploy não foi escolhido; nada publicado. Playwright MCP não está disponível no ambiente. Auditoria manual WCAG e teste visual por navegador ficam pendentes.

## Rastreabilidade

RF-01…RF-16 e RN-01…RN-10: mapear IDs reais após receber o enunciado. Incluir critérios do professor para confirmação/limpeza, tema, layout, acessibilidade e entrega.

## Arquivos envolvidos (previsão)

- `src/features/order/`, `src/features/cart/`, `src/styles/` e rotas em `src/app/`.
- Testes unitários, integração, jornada e acessibilidade.
- README e documentação de uso/decisões; arquivos de deploy conforme plataforma aprovada.

## Critérios de conclusão verificáveis

1. Confirmação exibe os dados aprovados do pedido a partir de snapshot independente de alterações posteriores no carrinho.
2. Carrinho é limpo no momento definido e confirmado em teste; refresh/rota direta têm comportamento documentado.
3. Tema claro/escuro funciona nos fluxos disponíveis e persiste em `localStorage`, conforme solicitado para esta tarefa.
4. Layout é verificado nas larguras e breakpoints definidos; sem perda de conteúdo ou operação.
5. WCAG 2.2 AA é a referência: teclado, foco, semântica, rótulos, erros, contraste, anúncios de estado e revisão manual documentados; falhas críticas corrigidas ou explicitamente registradas.
6. Testes unitários, integração e jornada cobrem critérios funcionais; checagens de tipo/build e revisão de regressão passam.
7. Documentação explica execução, decisões e limitações; deploy segue destino aprovado e não requer credenciais no cliente.

## Testes previstos

Snapshot e limpeza; fluxo de confirmação e refresh; alternância/restauração do tema; jornadas responsivas; navegação por teclado e revisão assistiva; regressão de RF/RN; build de produção e smoke test do destino. Ferramentas e ambiente dependem da aprovação.

## Pendências

Integração com a TASK-2; conteúdo do snapshot e retenção; momento de limpar; acesso direto/refresh; validação visual em navegadores e breakpoints; auditoria WCAG; enunciado RF/RN; destino, domínio e processo de deploy.
