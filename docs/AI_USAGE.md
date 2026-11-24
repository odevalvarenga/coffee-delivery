# Registro de uso de IA — Coffee Delivery

## Registro inicial

- **Data:** 2026-11-24
- **Uso:** apoio à análise e ao planejamento documental solicitado pelo estudante.
- **Artefatos preparados:** PRD, especificação técnica, plano geral de tarefas, três descrições de tarefa e regras permanentes para agentes.
- **Limite da fonte:** enunciado do professor não estava presente na pasta do projeto nem na pasta imediatamente acima. Requisitos RF-01…RF-16, RN-01…RN-10 e rubrica seguem pendentes. Depois, o estudante forneceu captura visual usada para transcrever itens/categorias/preços e identidade para TASK-1.
- **Imagem/logo:** nenhuma imagem foi gerada nesta etapa. A logo criada com IA permanece como atividade planejada da TASK-1, sujeita à aprovação da implementação e às diretrizes de marca.
- **Implementação:** nenhuma aplicação, componente ou funcionalidade foi implementada; nenhuma dependência foi instalada.
- **Revisão humana:** estudante deve conferir os documentos contra o enunciado e aprovar a etapa antes de qualquer implementação.

## Entradas e decisões

Entrada: solicitação de planejamento do estudante, incluindo stack desejada, lista de documentos/tarefas, restrições e critérios. Decisões ainda pendentes constam em `PRD_SPEC.md` e `TECH_SPEC.md`.

## Atualizações futuras

Registrar data, ferramenta/uso, artefato afetado, contribuição da IA e revisão/alteração humana quando a IA for usada em etapas posteriores. Não registrar segredos, dados pessoais ou credenciais.

## Atualização — TASK-1, primeira proposta

- **Data:** 2026-11-24
- **Ferramenta:** imagegen integrado.
- **Artefato:** `public/coffee-emblem-draft-initial.png` (proposta inicial, substituída pela referência roxo/amarelo).
- **Prompt resumido:** emblema compacto original para uma marca brasileira de entrega de café; grão de café em marrom espresso dentro de arco/círculo terracota, curva de vapor creme; ilustração plana geométrica, sem texto, sem fundo e sem marca d'água.
- **Revisão:** o agente selecionou o resultado para uso provisório no Header/Home. Adequação à marca e ao enunciado ainda aguarda revisão do estudante.
- **Outros usos:** componentes, layout inicial, textos e testes foram redigidos com auxílio do modelo.

## Atualização — referência visual enviada

- **Data:** 2026-11-24.
- **Entrada:** captura de tela enviada pelo estudante, apresentando Home, catálogo e telas futuras de checkout/confirmação. Apenas Home/catálogo usados nesta tarefa.
- **Dados derivados da captura:** 14 nomes, descrições, categorias e preço visível R$ 9,90 em cada café.
- **Logo novo:** `public/coffee-delivery-emblem.png`, emblema roxo com amarelo, criado com imagegen.
- **Imagem hero:** `public/coffee-hero.png`, copo de café para viagem com grãos/folhas, criado com imagegen.
- **Cards:** ilustrações SVG desenhadas em código, sem gerar fotos individuais; arquivos de produto não foram anexados na referência.
- **Limite:** ícones/cartões de carrinho, CEP, checkout e confirmação visíveis nas outras telas não foram implementados nesta TASK-1.

## Atualização — validação de dependências

- A auditoria inicial após instalar as versões base reportou 6 vulnerabilidades transitivas no Vite/Vitest.
- As dependências foram atualizadas para Vite 8.3.8, Vitest 5.1.1 e `@vitejs/plugin-react` 6.3.0 após confirmar compatibilidade com Node 24.
- A auditoria final (`npm audit`) reportou zero vulnerabilidades; build e os quatro testes passaram após a atualização.

## Atualização — TASK-3 (execução parcial)

- **Data:** 2026-11-24.
- **Ferramentas:** modelo Codex e Context7 MCP (documentação styled-components/ThemeProvider/TypeScript).
- **Artefatos:** tokens temáticos claro/escuro, `ColorModeProvider`, controle no Header, teste de persistência e `README.md`; SPECs e status da TASK-3 revisados.
- **Contribuição:** implementação da troca/persistência de tema, organização do README, atualização de rastreabilidade/limitações e execução de testes/build.
- **Validação:** `npm test -- --pool=threads` passou com 6 testes; `npm run build` passou. Execução padrão do Vitest foi impedida por `spawn EPERM`; Playwright MCP não estava disponível.
- **Limite naquele momento:** TASK-2 ainda não estava implementada. A IA não inventou estrutura/dados de endereço, pagamento ou carrinho; confirmação, snapshot integrado e limpeza aguardavam o checkout. A implementação posterior da TASK-2 consta no registro seguinte. Enunciado professoral, deploy escolhido, auditoria WCAG manual e revisão visual/browser permanecem pendentes.

## Atualização — TASK-2

- **Data:** 2026-11-24.
- **Ferramentas:** modelo Codex; Context7 MCP consultado para React Hook Form, `@hookform/resolvers` e Zod.
- **Dependências:** conforme pedido explícito para usar essas bibliotecas, instalados `react-hook-form`, `zod` e `@hookform/resolvers`; o `npm install` terminou sem vulnerabilidades conhecidas. A tentativa inicial em modo cache falhou por ausência dos pacotes e foi repetida com acesso ao registry.
- **Artefatos:** reducer/contexto/persistência de carrinho, resumo monetário, catálogo com inclusão, badge, rota e checkout, schema e cliente ViaCEP, testes, README e SPEC/TASKs atualizados.
- **Decisões da fonte visual:** taxa R$ 3,50 aceita pelo estudante como fixa provisória; métodos crédito/débito/dinheiro e campos de endereço derivados da captura. Esses pontos não foram verificados contra o enunciado do professor.
- **Limite:** a validação local do checkout não cria pedido e não navega para confirmação. Nenhum backend ou pagamento real foi criado. IDs RF/RN seguem pendentes do enunciado.
- **Validação:** `npm test -- --pool=threads --maxWorkers=2 --isolate=false`: 25 testes aprovados em 9 arquivos; `npm run build` passou; `npm audit` reportou zero vulnerabilidades. Playwright MCP não estava disponível e Chrome headless falhou ao iniciar por acesso negado (`0x5`), então não foram produzidas capturas novas nem auditados erros do console do navegador.

## Consolidação documental da TASK-2

- **Data:** 2026-11-24. Nenhum código ou dependência foi alterado nesta consolidação.
- **Relato manual do estudante:** dois produtos com duas unidades cada (quatro no badge); controles de incrementar, decrementar e remover funcionais; subtotal R$ 39,60 + frete fixo provisório R$ 3,50 = total R$ 43,10; consulta ViaCEP para `05734-090` preenchendo rua, bairro, cidade e UF; seleção de crédito, débito e dinheiro; interface exibiu dados válidos para São Paulo — SP e indicou que confirmação pertence à TASK-3.
- Esse registro é evidência textual informada pelo estudante, não teste executado pela IA. Não foi fornecida/localizada captura TASK-2 nesta consolidação; `docs/evidence/` contém apenas capturas da TASK-1.
- Persistência do carrinho após refresh, responsividade do checkout e auditoria manual WCAG 2.2 AA permanecem pendentes para TASK-2; persistência do tema após refresh permanece pendente na TASK-3. Playwright não foi executado e não houve revisão de console.

## Atualização — TASK-3 (implementação)

- **Data:** 2026-11-24.
- **Escopo autorizado:** confirmação do pedido, snapshot, persistência local, limpeza ordenada do carrinho, rota inválida, integração com checkout, testes e atualização documental. As pendências de validação TASK-2 foram preservadas sem bloquear o desenvolvimento, como instruído pelo estudante.
- **Alterações:** criada modelagem `OrderSnapshot`, criação de ID UUID, snapshot imutável e validação/leitura/gravação versionadas; rota `/order/:orderId` apresenta resumo, endereço e forma de pagamento. Checkout persiste primeiro e limpa o reducer apenas após gravação bem-sucedida; falhas preservam os itens. Adicionado token semântico de texto em fundo amarelo para contraste do CTA.
- **Decisão registrada:** manter somente o pedido confirmado mais recente no localStorage para permitir consulta após refresh; nova confirmação substitui a anterior. Não há backend, pagamento real nem garantia de backup. Falha ao salvar impede confirmação e limpeza.
- **Testes executados:** `npm test -- --pool=threads --maxWorkers=2 --isolate=false` — 34 testes aprovados em 13 arquivos; inclui snapshot/valores, pedido vazio/inválido, UUID, persistência e JSON inválido, falha de armazenamento, fluxo de confirmação/limpeza, acesso inválido e contraste mínimo AA do CTA em ambos os temas.
- **Build:** `npm run build` passou com `tsc -b` e Vite 8.3.8. A primeira execução encontrou dois erros de tipagem em teste/validação de endereço; foram corrigidos e a execução subsequente passou.
- **Limitações:** nenhum teste visual por browser/Playwright foi realizado nesta tarefa; Playwright MCP não estava disponível. Auditoria manual WCAG, refresh real de carrinho/tema/pedido, responsividade visual e revisão de console continuam pendentes. Nenhum deploy ou push foi feito.
