# Regras permanentes para agentes — Coffee Delivery

## Antes de implementar

1. Ler integralmente `docs/PRD_SPEC.md`, `docs/TECH_SPEC.md`, `docs/TASKS_SPEC.md`, a tarefa ativa em `docs/tasks/` e o enunciado integral do professor.
2. Se enunciado, critério ou decisão necessária estiver ausente, não inventar nem afirmar conformidade. Registrar a pendência e pedir o material/decisão ao estudante antes do trabalho dependente.
3. Na etapa de planejamento/documentação, não criar aplicação, componentes ou funcionalidades nem instalar dependências. Implementação só pode começar após autorização explícita do estudante para uma tarefa identificada; executar exclusivamente o escopo autorizado.

## Execução aprovada

- Trabalhar uma tarefa pequena e identificada por vez; declarar escopo e requisito relacionado.
- Preservar a arquitetura e os contratos aprovados. Se mudança for necessária, explicar motivo, impacto e documentação a ajustar antes de avançar.
- Relacionar cada alteração a RF/RN e critério de aceite. Nunca remover ou simplificar requisito do professor.
- Prever testes para toda funcionalidade e seguir a estratégia de testes técnica; registrar resultados sem alegar testes não executados.
- Ao terminar a etapa/tarefa, explicar decisões e alterações e aguardar autorização antes de iniciar a próxima etapa, conforme instrução do estudante.

## Qualidade e limites

- TypeScript estrito e tipos explícitos; não utilizar `any` como atalho. Tratar dados externos como `unknown` e validar.
- Respeitar React, Vite, TypeScript, React Router, Context API, `useReducer`, Hooks, localStorage, React Hook Form, Zod e styled-components conforme TECH_SPEC, salvo mudança aprovada e documentada.
- ViaCEP é requisito obrigatório do escopo; não omitir nem rebaixar a integração a opcional.
- Usar centavos inteiros em cálculos monetários; não definir taxa de entrega, catálogo, imagens ou marca sem fonte/decisão aprovada.
- Não implementar backend, autenticação ou pagamento real.
- Usar WCAG 2.2 AA como referência de acessibilidade.
- Não instalar bibliotecas ou executar publicação externa sem autorização correspondente.

## Documentação

Manter SPEC, mapa de rastreabilidade, tarefa ativa e `docs/AI_USAGE.md` atualizados. Distinguir requisito confirmado, decisão aprovada, hipótese e pendência. Não marcar requisito/tarefa concluído sem evidência verificável.
