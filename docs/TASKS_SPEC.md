# Planejamento geral de tarefas

**Status geral:** TASK-1 concluída conforme a captura visual. TASK-2 implementada e manualmente confirmada nos fluxos principais pelo estudante; persistência após refresh, responsividade do checkout e auditoria WCAG permanecem pendentes. TASK-3 implementada e aguarda revisão, com validação visual/manual ainda pendente. Enunciado e mapeamento literal RF/RN seguem pendentes.

Os IDs RF/RN são referências reservadas do professor. Como o enunciado não foi disponibilizado, cada vínculo listado como pendente deve ser substituído pelos IDs efetivamente aplicáveis após leitura integral. Não declarar requisito atendido por inferência.

| ID | Tarefa | Dependências | Requisitos relacionados | Arquivos previstos | Critérios verificáveis de conclusão | Status |
|---|---|---|---|---|---|---|
| TASK-1 | Fundação, identidade, catálogo | Aprovação para implementar recebida; captura visual enviada | RF-01…RF-16 e RN-01…RN-10 aplicáveis — IDs aguardam o enunciado integral | Configuração Vite/TS, `src/app/`, `src/components/Header/`, `src/features/home/`, `src/features/catalog/`, `src/styles/`, `public/coffee-delivery-emblem.png`, `public/coffee-hero.png`, `docs/evidence/`, testes e docs da tarefa | Fundação passa build; Home/catálogo refletem a captura; logo IA registrada; 14 cards com categorias/preço; sem funcionalidades TASK-2/3; testes passam; responsividade validada | Concluída conforme referência visual fornecida; aprovação de avanço confirmada pelo início das tarefas seguintes |
| TASK-2 | Estado global, carrinho e checkout | TASK-1 concluída | RF/RN aplicáveis a estado, carrinho, persistência, navegação, checkout, validação, ViaCEP e pagamento — mapear após fonte | `src/features/cart/`, `src/features/checkout/`, `src/services/viaCep.ts`, `src/app/`, Header, catálogo, testes e docs | Reducer imutável e badge; persistência recuperável; valores em centavos; campos validados; ViaCEP obrigatório e estados tratados; pagamento selecionável sem transação; testes/build aprovados; validação manual de persistência/responsividade e auditoria WCAG | Implementada; resultados dos fluxos principais informados pelo estudante. Persistência após refresh, responsividade do checkout e WCAG pendentes, mantidos em `docs/evidence/TASK-2-VALIDATION.md` |
| TASK-3 | Confirmação e qualidade final | Autorização explícita recebida; pendências de validação TASK-2 documentadas e não bloqueantes para implementação | RF/RN aplicáveis — IDs reais aguardam fonte do professor | `src/features/order/`, `src/features/checkout/`, `src/app/`, `src/styles/`, testes, README e docs | ID de pedido único; snapshot independente; pedido persistido; carrinho só limpa após gravação; rota válida/inválida; valores corretos em centavos; testes/build passam; limitações de browser/WCAG registradas | Implementação concluída; 34 testes e build passam; aguarda revisão do estudante. Testes visuais/browser, auditoria manual WCAG e refresh real de persistência continuam pendentes; sem deploy |

## Regras de execução

1. Ler o enunciado e todos os SPEC antes de implementação; transcrever requisitos e critérios sem simplificar.
2. Resolver pendências de produto que alteram comportamento (frete, catálogo, imagens, marca, pagamento e ViaCEP) antes do respectivo código.
3. Trabalhar uma tarefa pequena por vez. Revisar arquivos e critérios de conclusão antes de considerar concluída.
4. Prever testes para cada comportamento. Execução/criação ocorre na etapa autorizada.
5. Não usar `any`, não instalar dependências sem aprovação, nem criar backend, autenticação ou pagamento real.
6. Após concluir cada etapa, apresentar resumo e aguardar autorização antes de avançar, como solicitado pelo estudante.

**Gate:** as validações pendentes da TASK-2 estão preservadas em `docs/evidence/TASK-2-VALIDATION.md`; por decisão explícita do estudante, não bloquearam a implementação da TASK-3. A autorização para TASK-3 foi recebida. As pendências continuam necessárias para auditoria final. Obter o enunciado integral para mapear RF/RN e confirmar decisões provisórias; sua ausência impede declarar conformidade acadêmica integral.
