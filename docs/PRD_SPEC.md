# PRD — Coffee Delivery

**Status:** rascunho bloqueado para validação do enunciado  
**Versão:** 0.1  
**Base documental:** solicitação do estudante; enunciado do professor ainda não fornecido.

> **Limite de fidelidade:** esta pasta não continha o enunciado, telas, rubrica ou lista de requisitos do professor. Os itens abaixo marcados como pendentes não são requisitos inventados: são campos de rastreabilidade reservados para transcrição e validação literal contra a fonte. Não aprovar este PRD como baseline acadêmico até essa conferência.

## 1. Visão geral e problema

O nome do projeto sugere uma experiência de pedido de café, mas o problema de negócio, contexto acadêmico e comportamento esperado precisam ser confirmados no enunciado. A solicitação atual confirma somente que o trabalho deve ser planejado para uma aplicação Coffee Delivery e que haverá catálogo, carrinho, checkout e confirmação, entre outros tópicos enumerados neste conjunto documental.

## 2. Objetivos

- Planejar, antes de implementar, uma aplicação acadêmica Coffee Delivery com os itens explicitamente solicitados nesta etapa.
- Manter rastreabilidade entre requisitos do professor e tarefas.
- Não introduzir backend, autenticação ou pagamento real.
- Reservar a implementação para aprovação explícita após a revisão dos documentos.

Objetivos de produto, métricas de sucesso e critérios avaliados pelo professor: **pendentes do enunciado**.

## 3. Público-alvo

Usuários, personas, contexto de uso e necessidades: **pendentes do enunciado**. Não se presume que o público seja consumidor final, equipe interna ou avaliador além do que vier a ser confirmado.

## 4. Escopo confirmado nesta etapa

Planejamento para: fundação visual, logo criada com IA, tokens, estrutura inicial, cabeçalho e catálogo; estado global, reducer, carrinho, persistência local, navegação, checkout, formulário, validação, consulta ViaCEP e seleção de pagamento; confirmação, snapshot do pedido, limpeza do carrinho, modo escuro, responsividade, acessibilidade, testes, documentação e deploy.

Essa lista representa o escopo descrito pelo estudante para organizar tarefas, não substitui nem reduz o escopo do professor. Conteúdo, regras e comportamento detalhados aguardam o enunciado.

## 5. Exclusões confirmadas

- Backend e persistência remota.
- Autenticação.
- Processamento de pagamento real.
- Implementação nesta etapa de planejamento.

Outras exclusões: pendentes do enunciado.

## 6. Fluxos de usuário (a detalhar após o enunciado)

1. **Descoberta e catálogo:** usuário visualiza catálogo e seleciona itens. Conteúdo, filtros, pesquisa e operações permitidas: pendentes.
2. **Carrinho:** usuário revisa/ajusta itens e totais. Regras de quantidade, remoção, limites e cálculo: pendentes.
3. **Checkout:** usuário informa dados de entrega, consulta ViaCEP (obrigatória conforme solicitação) e seleciona modalidade de pagamento local/simulada. Campos, erros e opções: pendentes.
4. **Confirmação:** sistema exibe confirmação e snapshot do pedido e limpa o carrinho, conforme solicitação. Formato/rota e momento exato: pendentes.
5. **Tema e acessibilidade:** tema escuro e experiência responsiva/acessível; controles e persistência do tema: pendentes.

## 7. Requisitos funcionais

Os IDs RF-01 a RF-16 são reservados para correspondência com o enunciado. **O conteúdo abaixo não deve ser interpretado como requisito funcional aprovado.** A solicitação não trouxe o texto do professor, então transcrevê-los agora exigiria inventar requisitos.

| ID | Requisito do professor | Estado / evidência |
|---|---|---|
| RF-01 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RF-02 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RF-03 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RF-04 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RF-05 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RF-06 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RF-07 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RF-08 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RF-09 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RF-10 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RF-11 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RF-12 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RF-13 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RF-14 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RF-15 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RF-16 | A transcrever literalmente | Pendente: enunciado não fornecido |

## 8. Regras de negócio

| ID | Regra do professor | Estado / observação |
|---|---|---|
| RN-01 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RN-02 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RN-03 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RN-04 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RN-05 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RN-06 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RN-07 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RN-08 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RN-09 | A transcrever literalmente | Pendente: enunciado não fornecido |
| RN-10 | A transcrever literalmente | Pendente: enunciado não fornecido |

## 9. Requisitos não funcionais

- **Acessibilidade:** usar WCAG 2.2 nível AA como referência (confirmado pelo estudante); critérios e evidências serão definidos por fluxo/componente.
- **Responsividade:** prevista no escopo; breakpoints e comportamento visual pendentes.
- **Persistência:** localStorage solicitado para estado do carrinho; esquema, recuperação de dados inválidos e versionamento pendentes.
- **Qualidade:** sem `any` como atalho; testes previstos para todas as funcionalidades. Cobertura, navegadores e limites quantitativos pendentes.
- Outros requisitos de desempenho, segurança, compatibilidade e operação: pendentes do enunciado.

## 10. Identidade visual

O estudante forneceu uma captura de referência visual para a Home, catálogo, checkout e confirmação. Para TASK-1, foram extraídos apenas os elementos de Home/catálogo: fundo cinza muito claro, roxo, amarelo, marca Coffee Delivery, hero com copo para viagem, benefícios e cards de café. As telas de checkout/confirmação são contexto futuro e não autorizam sua implementação nesta tarefa. Tipografia foi inferida visualmente (Roboto no corpo e Baloo 2 em títulos) e deve ser comparada ao Figma quando acessível. Logo e imagem do hero são originais geradas com IA; a referência mostra fotos dos cafés em miniatura, mas os arquivos originais/licenças não vieram com a captura. Os cards usam ilustrações vetoriais locais provisórias, registradas como diferença visual.

## 11. Critérios de aceite

### Gate documental desta etapa

- Os quatro SPEC/AGENTS e os três arquivos de tarefa e registro de IA existem.
- Cada requisito fornecido pelo professor é transcrito sem simplificação e ligado às tarefas.
- IDs sem fonte permanecem explicitamente pendentes, sem aceitação presumida.
- Nenhuma aplicação, dependência ou funcionalidade é criada nesta etapa.

### Aceite do produto

Critérios do professor para RF-01…RF-16 e RN-01…RN-10: pendentes da fonte. Critérios observáveis por funcionalidade deverão ser registrados quando a fonte for disponibilizada; os critérios preliminares de tarefa constam em `TASKS_SPEC.md` e não substituem a rubrica.

## 12. Decisões de produto e pendências

| Tema | Decisão/estado | Responsável pela resolução |
|---|---|---|
| Taxa de entrega | R$ 3,50 (350 centavos) aparece na captura. O estudante autorizou o uso como taxa fixa provisória para a TASK-2; ainda não é regra do professor confirmada | Conferir com o enunciado/professor |
| Catálogo | Captura de referência mostra 14 cafés, categorias e R$ 9,90 por item; textos legíveis transcritos para `catalog-data.ts`. Confirmar fidelidade à fonte original quando acessível | Estudante/professor |
| Imagens | Captura mostra fotos dos cafés, porém não fornece assets originais. Cards estão com ilustrações vetoriais geradas em código; hero e emblema foram gerados com IA | Conferir no Figma e obter assets licenciados, se existirem |
| Marca | Captura define a direção roxo/amarelo e wordmark Coffee Delivery; ícone original foi gerado com IA. Conferir direção exata quando Figma estiver acessível | Estudante/professor |
| ViaCEP | Consulta obrigatória implementada antes da validação do checkout; formato, estados de falha e preenchimento registrados em `TASK-2.md`. Critérios literais do professor pendentes | Conferir com o enunciado/professor |
| Pagamento | Tela oferece crédito, débito e dinheiro, opções visíveis na captura. Seleção local somente, sem transação; confirmação acadêmica pendente | Conferir com o enunciado/professor |
| Frete/total | Fórmula e arredondamento pendentes | Enunciado |
| Escopo professor | Fonte não localizada na pasta do projeto nem na pasta imediatamente acima | Estudante deve fornecer |
| Referência visual | Estudante compartilhou link Figma e captura gráfica; link não pôde ser lido sem integração conectada, a captura foi utilizada para a Home e catálogo | Conectar Figma para conferir medidas/assets exatos |

### Atualização TASK-3 (parcial)

- Tema claro/escuro persistente foi solicitado e implementado com preferência local no navegador.
- Confirmação deve exibir o endereço e pagamento informados pelo checkout e usar snapshot independente; esses campos e o fluxo de confirmação dependem da TASK-2 ainda não implementada.
- Nenhum conteúdo, regra de retenção de pedido, fluxo de compra ou requisito RF/RN foi declarado aprovado sem a fonte do professor.

### Atualização TASK-2 (implementada; aguarda aprovação)

- Carrinho em Context API/`useReducer`, persistência local versionada, operações de quantidade, remoção, badge e resumo em centavos implementados.
- Checkout usa React Hook Form/Zod; consulta ViaCEP precisa ser bem-sucedida para validar. Pagamento é apenas selecionado localmente.
- R$ 3,50 fixos é valor provisório escolhido pelo estudante a partir do exemplo na captura; métodos de pagamento e campos foram derivados da captura, não do enunciado original.
- A confirmação final e o snapshot continuam fora da TASK-2.

**Bloqueio:** para afirmar que este documento preserva integralmente os requisitos do professor, é necessário obter o enunciado original. Até lá, RF/RN, público-alvo, catálogo, valores e critérios acadêmicos seguem não aprovados.
