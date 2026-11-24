# Planejamento geral de tarefas

**Status geral:** TASK-1 concluída conforme a captura visual fornecida. Aguardar aprovação do estudante antes da TASK-2. O mapeamento literal RF/RN e a rubrica completa seguem pendentes do enunciado do professor.

Os IDs RF/RN são referências reservadas do professor. Como o enunciado não foi disponibilizado, cada vínculo listado como pendente deve ser substituído pelos IDs efetivamente aplicáveis após leitura integral. Não declarar requisito atendido por inferência.

| ID | Tarefa | Dependências | Requisitos relacionados | Arquivos previstos | Critérios verificáveis de conclusão | Status |
|---|---|---|---|---|---|---|
| TASK-1 | Fundação, identidade, catálogo | Aprovação para implementar (recebida); captura visual enviada | RF-01…RF-16 e RN-01…RN-10 aplicáveis — IDs aguardam o enunciado integral | Configuração Vite/TS, `src/app/`, `src/components/Header/`, `src/features/home/`, `src/features/catalog/`, `src/styles/`, `public/coffee-delivery-emblem.png`, `public/coffee-hero.png`, `docs/evidence/`, testes e docs da tarefa | Fundação passa build; Home/catálogo refletem a captura; logo IA registrada; 14 cards com categorias/preço; sem funcionalidades TASK-2/3; testes passam; responsividade validada | Concluída conforme referência visual fornecida; aguarda aprovação antes da TASK-2 |
| TASK-2 | Estado global, carrinho e checkout | TASK-1 concluída | RF/RN aplicáveis a estado, carrinho, persistência, navegação, checkout, validação, ViaCEP e pagamento — mapear após fonte | `docs/tasks/TASK-2.md`; módulos `src/features/cart`, `checkout`, `services` (a ajustar) | Transições e cálculos cobertos; persistência recuperável; formulário validado; ViaCEP efetivamente consultado; pagamentos somente simulados; fluxo e erros atendem critérios rastreados; testes definidos e aprovados | Planejada |
| TASK-3 | Confirmação e qualidade final | TASK-2 concluída | RF/RN aplicáveis a confirmação, snapshot, limpeza, tema, responsividade, acessibilidade, testes, documentação e deploy — mapear após fonte | `docs/tasks/TASK-3.md`; módulos de pedido/tema; documentação e arquivos de deploy (a definir) | Snapshot independente preservado; limpeza no momento acordado; dark mode e layouts atendem critérios; WCAG 2.2 AA verificada; testes e docs concluídos; deploy publicado conforme destino aprovado | Planejada |

## Regras de execução

1. Ler o enunciado e todos os SPEC antes de implementação; transcrever requisitos e critérios sem simplificar.
2. Resolver pendências de produto que alteram comportamento (frete, catálogo, imagens, marca, pagamento e ViaCEP) antes do respectivo código.
3. Trabalhar uma tarefa pequena por vez. Revisar arquivos e critérios de conclusão antes de considerar concluída.
4. Prever testes para cada comportamento. Execução/criação ocorre na etapa autorizada.
5. Não usar `any`, não instalar dependências sem aprovação, nem criar backend, autenticação ou pagamento real.
6. Após concluir cada etapa, apresentar resumo e aguardar autorização antes de avançar, como solicitado pelo estudante.

**Gate para iniciar TASK-2:** aprovação explícita do estudante; antes do checkout, obter o enunciado integral e resolver regra de frete, imagens oficiais e requisitos RF/RN aplicáveis.
