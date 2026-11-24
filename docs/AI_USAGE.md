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
