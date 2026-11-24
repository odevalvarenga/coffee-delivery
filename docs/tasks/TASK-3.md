# TASK-3 — Confirmação, qualidade final e entrega

**Status:** implementação concluída; aguarda revisão do estudante e validações manuais de navegador/acessibilidade. Nenhum deploy foi feito.
**Dependências:** autorização explícita recebida em 2026-11-24. As validações manuais pendentes da TASK-2 foram mantidas documentadas e não bloquearam esta implementação. Destino de deploy não foi escolhido nem é necessário para encerrar esta execução local.

## Escopo

- Confirmação do pedido, snapshot e limpeza do carrinho no momento aprovado.
- Dark mode; responsividade e acessibilidade final.
- Testes de regressão e jornada; documentação e deploy.

## Estado desta execução (2026-11-24)

- **Implementado nesta tarefa:** confirmação por rota com ID UUID; snapshot independente com produtos, quantidades, endereço, pagamento e valores em centavos; persistência versionada do pedido mais recente; limpeza do carrinho apenas após gravação bem-sucedida; tratamento de dados inválidos, carrinho vazio e acesso à confirmação inexistente; testes de lógica, persistência, fluxo e contraste.
- **Já existia e foi preservado:** tema claro/escuro persistido, tokens semânticos e controle no Header. Teste automatizado cobre gravação e restauração após remontagem do provider; recarga real do navegador permanece sem confirmação manual.
- **Falha de confirmação:** erro ao montar/gravar snapshot é exibido e mantém os itens no carrinho; não ocorre pagamento/transação.
- **Validação executada nesta tarefa:** `npm test -- --pool=threads --maxWorkers=2 --isolate=false` passou (34 testes em 13 arquivos); `npm run build` passou (TypeScript e Vite 8.3.8).
- **Não executado:** teste visual por Playwright/browser, revisão de console e auditoria manual assistiva/WCAG. Playwright MCP não estava disponível nesta sessão. Não se afirma responsividade visual validada por browser.
- **Pendente de fonte:** enunciado literal do professor e critérios RF/RN; o mapeamento permanece reservado e sem alegação de conformidade.
- **Pendente de validação/ambiente/decisão:** persistência do tema após refresh ainda requer confirmação manual; destino de deploy não foi escolhido; nada publicado. Playwright MCP não está disponível no ambiente. Auditoria manual WCAG e teste visual por navegador ficam pendentes.

## Rastreabilidade

RF-01…RF-16 e RN-01…RN-10: mapear IDs reais após receber o enunciado. Incluir critérios do professor para confirmação/limpeza, tema, layout, acessibilidade e entrega.

## Arquivos envolvidos (previsão)

- `src/features/order/`, `src/features/cart/`, `src/styles/` e rotas em `src/app/`.
- Testes unitários, integração, jornada e acessibilidade.
- README e documentação de uso/decisões; arquivos de deploy conforme plataforma aprovada.

## Critérios de conclusão verificáveis

1. Confirmação exibe os dados aprovados do pedido a partir de snapshot independente de alterações posteriores no carrinho.
2. Carrinho é limpo no momento definido e confirmado em teste; refresh/rota direta têm comportamento documentado.
3. Tema claro/escuro funciona nos fluxos disponíveis e sua persistência após remontagem está coberta por teste; recarga real ainda requer confirmação manual.
4. Layout de confirmação usa dimensões fluidas e breakpoint mobile; verificação visual de breakpoints em browser permanece pendente.
5. WCAG 2.2 AA é a referência: teclado, foco, semântica, rótulos, erros, contraste, anúncios de estado e revisão manual documentados; falhas críticas corrigidas ou explicitamente registradas.
6. Testes unitários, integração e jornada cobrem critérios funcionais; checagens de tipo/build e revisão de regressão passam.
7. Documentação explica execução, decisões e limitações; deploy segue destino aprovado e não requer credenciais no cliente.

## Testes previstos

Snapshot e limpeza; fluxo de confirmação e refresh; alternância/restauração do tema; jornadas responsivas; navegação por teclado e revisão assistiva; regressão de RF/RN; build de produção e smoke test do destino. Ferramentas e ambiente dependem da aprovação.

## Decisão de persistência do pedido

Como a TECH_SPEC deixava a vida útil do snapshot pendente e a solicitação exige consulta da confirmação após atualização, foi definida para esta tarefa a persistência local versionada do pedido mais recente (`coffee-delivery.latest-order.v1`). Uma confirmação nova substitui a anterior. É apenas armazenamento no navegador, sem sincronização/backup ou garantia após limpeza dos dados; dados locais não são armazenamento seguro. Se a gravação falhar, o checkout não limpa o carrinho.

## Pendências

Validação visual em navegadores e breakpoints; auditoria manual WCAG 2.2 AA/leitor de tela; confirmação manual da persistência de carrinho e tema após refresh; enunciado RF/RN; destino, domínio e processo de deploy. Registro de pendências TASK-2 em `docs/evidence/TASK-2-VALIDATION.md`.
