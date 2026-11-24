# Especificação técnica — Coffee Delivery

**Estado:** arquitetura aplicada nas TASK-1 e TASK-2. O enunciado do professor continua ausente; decisões de checkout derivadas da captura são provisórias e aguardam conferência.

## 1. Princípios e stack

- React + TypeScript + Vite como aplicação frontend.
- React Router para rotas de catálogo/checkout/confirmação, a validar com os fluxos finais.
- Context API para disponibilizar estado global; `useReducer` para transições explícitas do carrinho e pedido.
- Hooks próprios apenas para encapsular comportamento reutilizável. Hooks sempre chamados no topo de componentes/hooks, sem condicionais.
- React Hook Form para formulário; Zod para esquema e validação tipada, integrados por `@hookform/resolvers`.
- styled-components para estilos e temas, conforme solicitação.
- localStorage para persistência local do carrinho, tema e pedido mais recente; não é backend nem armazenamento seguro.
- Dependências específicas de implementação só foram instaladas após autorização do estudante para executar a tarefa correspondente.

Versões declaradas na TASK-1: React `^19.0.0`, React Router `^7.1.1`, styled-components `^6.1.13`, TypeScript `~5.7.2`, Vite `^8.3.8`, `@vitejs/plugin-react` `^6.3.0`, Vitest `^5.1.1`, Testing Library `^16.1.0` e jsdom `^25.0.1`. TASK-2 adicionou React Hook Form, Zod e `@hookform/resolvers`; o lockfile fixa as versões resolvidas.

## 2. Arquitetura proposta

Organização por domínio funcional, mantendo apresentação, estado e integração separados:

```text
src/
  app/                 # composição, rotas, providers
  components/          # elementos compartilhados de apresentação
  features/
    catalog/           # catálogo e tipos de produto
    cart/              # reducer, contexto, persistência e apresentação
    checkout/           # formulário, schema e consulta de CEP
    order/              # snapshot e confirmação
  services/             # cliente ViaCEP e adaptadores locais
  styles/               # tema, tokens e estilos globais
  types/                # tipos compartilhados estritamente necessários
```

Estrutura é proposta e pode ser ajustada em tarefa pequena, documentando motivo e preservando fronteiras. Sem camada de servidor, autenticação ou gateway de pagamento.

## 3. Tipos e interfaces (proposta)

Tipos imutáveis e explícitos; dinheiro representado internamente em centavos inteiros (`number` inteiro validado), evitando aritmética decimal binária. Nunca usar `any`; usar `unknown` na fronteira externa e estreitar por validação.

```ts
type ProductId = string;
type CartLine = { productId: ProductId; quantity: number };
type CartState = { lines: CartLine[] };
type Address = {
  postalCode: string; street: string; complement: string;
  neighborhood: string; city: string; state: string;
};
type PaymentMethod = 'credit-card' | 'debit-card' | 'cash'; // opções da captura, aguardam conferência com enunciado
type OrderSnapshot = {
  id: string; lines: ReadonlyArray<CartLine>; address: Readonly<Address>;
  paymentMethod: PaymentMethod; subtotalCents: number;
  deliveryFeeCents: number; totalCents: number; createdAt: string;
};
```

Opções e campos de pagamento/endereço usados na TASK-2 foram derivados da captura; confirmação do professor está pendente. Snapshot pertence à TASK-3 e precisa copiar os dados relevantes do pedido; não pode apontar para estado mutável do carrinho.

## 4. Estado e persistência

- `CartContext` expõe estado e operações tipadas; reducer puro define ações e transições.
- Ações esperadas em nível arquitetural: adicionar/alterar/remover linha e limpar carrinho. Sem definir limites comerciais antes do enunciado.
- Persistência local serializa um envelope versionado; parse inicial trata JSON inválido e valida formato antes de usar. Política de migração/recuperação será decidida na implementação.
- Efeitos de sincronização com localStorage ficam fora do reducer. Reducer não executa I/O.
- No sucesso do checkout, criar snapshot imutável antes da limpeza. Implementação TASK-3 persiste o pedido mais recente em envelope local versionado (`coffee-delivery.latest-order.v1`) para consulta após refresh; nova confirmação substitui a anterior. Falha na gravação impede a limpeza. Persistência local não é backup nem armazenamento seguro.
- Contextos separados se tema e pedido excederem o domínio do carrinho; evitar estado global indiscriminado.

## 5. Componentes e rotas (inventário de planejamento)

Componentes candidatos, sem implementação nesta etapa: `App`, providers, `Header`, catálogo/lista/cartão de produto, resumo/itens do carrinho, formulário de checkout, campos controlados, seletor de pagamento, endereço, confirmação e alternador de tema. Nomes e composição finais dependem dos requisitos e do starter.

Rotas candidatas: catálogo, checkout, confirmação. Definir proteção de rota quando carrinho vazio, navegação direta, refresh e URL final após confirmar conforme critérios do professor.

## 6. ViaCEP (obrigatório)

A consulta ViaCEP faz parte do fluxo planejado e não pode ser removida nem tratada como opcional. Cliente isolado em `services`, com CEP normalizado, validação de formato antes da requisição, resposta externa tratada como `unknown` e validada antes de preencher endereço. Prever estados de carregamento, sucesso, CEP não encontrado, erro HTTP/rede e repetição segura; permitir correção manual somente se compatível com enunciado. Campos preenchidos, momento do disparo (blur/botão) e política diante de indisponibilidade aguardam definição. Testar serviço com respostas simuladas, sem depender da rede nos testes automatizados.

## 7. Cálculos monetários

Preço unitário e totais em centavos inteiros. Subtotal = soma de preço unitário × quantidade; frete e arredondamento somente conforme decisão validada. Total = subtotal + taxa aplicável. Taxa de entrega de 350 centavos é provisória, autorizada pelo estudante a partir do exemplo na captura e aguarda validação do professor. Formatação localizada para BRL é apresentação do inteiro em centavos, sem converter cálculo para ponto flutuante decimal. Validar valores, quantidades e overflow de forma explícita.

## 8. Temas, responsividade e acessibilidade

- styled-components com tokens semânticos para claro/escuro. Implementado em `src/styles/tokens.ts` usando `ThemeProvider`; `ColorModeProvider` armazena `light`/`dark` em `localStorage` (`coffee-delivery.color-mode`) e mantém operação na sessão caso o armazenamento lance erro. Tema inicial claro.
- Layout adaptável para telas estreitas e largas; breakpoints definidos a partir do layout de referência, ainda ausente.
- WCAG 2.2 AA como referência exigida: teclado, foco visível, ordem lógica, rótulos/instruções, erros associados aos campos, contraste, sem dependência exclusiva de cor, semântica e anúncios de mudanças relevantes. Critérios verificáveis por fluxo serão escritos na tarefa de implementação.
- Respeitar preferência de movimento reduzido se houver animações; não inventar movimento visual como requisito.

## 9. Estratégia de testes

- Unitários: reducer, cálculos em centavos, validações Zod, parse/versionamento de persistência.
- Integração: componentes de catálogo/carrinho, formulário, estados do ViaCEP com mock, snapshot e limpeza ordenada.
- Navegação ponta a ponta: fluxo definido pelo professor quando disponível, incluindo caminhos válidos e inválidos.
- Acessibilidade: verificações automatizadas como apoio e revisão manual por teclado, foco, rótulos, contraste e leitor de tela; ferramenta e critérios finais pendentes.
- Cobrir estados vazios, limite/quantidade quando definido, entradas inválidas, falha de rede, atualização de página e confirmação.
- Resultados executados por tarefa ficam registrados nas seções de implementação abaixo; não declarar cobertura de fluxo não executada.

## 10. Deploy e decisões pendentes

Destino, comandos, variáveis e processo de publicação não foram especificados; TASK-3 inclui documentação/deploy, mas plataforma e configuração aguardam confirmação. App sem segredos ou chamadas a pagamento real. Riscos: enunciado ausente, fontes de imagem/licença desconhecidas, frete e meios provisórios aguardando validação acadêmica, indisponibilidade ViaCEP, dados locais incompatíveis entre versões e conferência de layout Figma pendente.

## 11. Registro de implementação — TASK-1 (concluída)

- Shell atual: Vite + React + TypeScript estrito, React Router, styled-components e `lucide-react` para ícones de interface.
- Componentes: `Header`, `Home`, `CoffeeCatalog`, `CoffeeCard`; catálogo recebe coleção tipada por props.
- Tokens em `src/styles/tokens.ts` seguem o roxo/amarelo/cinza da captura; tipografia Roboto e Baloo 2 foi inferida visualmente. Revisar pesos/medidas com arquivo Figma conectado.
- Componentes TASK-1: `Header`, `Home`, `CoffeeCatalog`, `CoffeeCard` e ilustração SVG por card. Sem estado ou controle de carrinho nesta tarefa.
- Catálogo tipado está em `src/features/catalog/catalog-data.ts`: 14 produtos com categorias, descrições e valores em centavos. Fonte foi a captura do estudante; textos de tamanho reduzido precisam validação no Figma.
- Vitest + Testing Library cobre Home, navegação, acessibilidade básica, 14 cards, categorias e preços. `npm test`: 2 arquivos, 4 testes aprovados.
- Context7 foi consultado para Vite 8, styled-components 6 e Vitest 5.1. A configuração separa `vite.config.ts` e `vitest.config.ts`, e styled-components mantém media queries co-localizadas com os componentes.
- Breakpoints cobrem cabeçalho, hero, benefícios e catálogo; Chrome validou 1440 px e 390 px depois da atualização. Em 390 px, `body.scrollWidth` e `documentElement.clientWidth` são 390 px, e todos os 14 produtos aparecem.
- Logo e art do hero em PNG gerados com IA. Cards usam SVG local para representar as bebidas, pois a captura não traz os arquivos originais.
- Capturas completas no Chrome Headless: `docs/evidence/TASK-1-desktop-cdp.png` (1440 px) e `docs/evidence/TASK-1-mobile-cdp.png` (390 px).
- Contraste calculado: texto padrão `#574F4D` em `#FAFAFA` = 7.65:1; tags `#805500` em `#F1E9C9` = 5.36:1; roxo principal `#8047F8` em `#FAFAFA` = 4.82:1. Verificações de contraste pontuais não representam auditoria WCAG 2.2 AA completa.
- `npm run build`: passou com Vite 8.3.8. `npm test`: 4 testes passaram com Vitest 5.1.1. `npm audit`: zero vulnerabilidades após atualizar Vite/Vitest e o plugin React.
- Context7 consultado para documentação atual de Vite 8, styled-components 6.x e Vitest 5; IDs oficiais usados: `/vitejs/vite`, `/websites/styled-components`, `/vitest-dev/vitest`.

## 12. Registro da execução anterior — TASK-3 (parcial; antes da TASK-2)

- Tema claro/escuro aplicado aos estilos existentes por tokens semânticos tipados; o controle de alternância fica no Header. A persistência foi coberta por teste de montar, alternar, salvar e restaurar tema.
- README documenta comandos, arquitetura, tema, estado real das tarefas e preparação genérica de build estático. Plataforma de deploy não foi escolhida; não há configuração específica nem publicação.
- Teste executado com `npm test -- --pool=threads`: 3 arquivos, 6 testes passaram (Home/catálogo, botão acessível, e persistência). O `npm test` padrão tentou iniciar processos filhos e recebeu `spawn EPERM` no ambiente Windows restrito; o modo threads contornou a limitação.
- `npm run build`: passou após as alterações.
- Playwright MCP e ferramentas de navegador não estavam disponíveis para esta execução; não se afirma revisão visual de breakpoints nem de erros de console nesta etapa.
- Naquela execução, confirmação, snapshot, endereço/pagamento e limpeza não foram implementados porque a TASK-2 ainda estava ausente. A seção 13 registra que o checkout foi implementado depois.
- WCAG 2.2 AA permanece referência; a suíte automatizada não equivale a auditoria completa e não foram executados testes manuais com leitor de tela/teclado nesta execução.

## 13. Registro de implementação — TASK-2 (implementada; validações manuais pendentes)

- Tipos `CartLine`, `CartState` e ações discriminadas em `src/features/cart/types.ts`; reducer puro retorna estado imutável para adicionar, incrementar, decrementar, remover e limpar.
- `CartProvider`/`useCart` expõe estado e operações. Persistência local usa chave `coffee-delivery.cart.v1`, envelope versão 1, parse de `unknown`, catálogo permitido, e falhas de armazenamento degradam para estado local sem quebrar a UI.
- Catálogo permite escolher quantidade e adicionar. Header exibe badge com total de unidades; rota `/checkout` usa React Router. Carrinho vazio tem retorno ao catálogo.
- Preços/totais são centavos inteiros; formatação BRL só ocorre na apresentação. Frete fixo provisório de 350 centavos vem do exemplo na captura e foi autorizado pelo estudante; revisar contra o enunciado do professor.
- Checkout usa React Hook Form + Zod. Campos capturados pela referência: CEP, rua, número, complemento opcional, bairro, cidade e UF. Seleção requerida é uma das opções visíveis (crédito/débito/dinheiro); nenhuma transação é executada.
- `getViaCepAddress` normaliza 8 dígitos, usa fetch real para ViaCEP, estreita JSON `unknown`, trata erro de formato, CEP não encontrado, HTTP, rede e corpo inválido. Testes usam fetch simulado. Endereço preenchido apenas com campos disponíveis. A validação exige que o CEP atual tenha sido consultado com sucesso.
- Context7 consultado para React Hook Form, resolvers Zod e Zod. IDs usados: `/react-hook-form/documentation`, `/react-hook-form/resolvers`, `/colinhacks/zod`.
- A confirmação não foi adicionada; submissão válida do checkout apenas mostra estado local de validação, aguardando a TASK-3.
- Validação final desta tarefa: 25 testes em 9 arquivos passaram com `npm test -- --pool=threads --maxWorkers=2 --isolate=false`; `npm run build` passou; `npm audit` reportou zero vulnerabilidades.
- A captura visual da TASK-2 e revisão de console não foram obtidas: Playwright MCP não estava disponível e Chrome headless encerrou com acesso negado (`0x5`). A suíte automatizada não substitui essa revisão visual/manual.

### Validação manual reportada pelo estudante — 2026-11-24

O estudante confirmou na interface: dois produtos com duas unidades cada (badge quatro); controles de quantidade e remoção funcionais; subtotal de 3960 centavos, frete fixo provisório de 350 centavos e total de 4310 centavos; consulta ViaCEP bem-sucedida para `05734-090` com autopreenchimento de rua/bairro/cidade/UF; opções crédito/débito/dinheiro selecionáveis; mensagem de dados válidos para São Paulo — SP. O estudante também confirmou a mensagem de que a etapa final pertence à TASK-3. Esses resultados são relato de execução manual, não evidência automatizada produzida pelo agente.

Persistência do carrinho após refresh, responsividade do checkout e auditoria manual WCAG 2.2 AA seguem pendentes para a revisão da TASK-2. Persistência do tema após refresh também aguarda confirmação manual na TASK-3. Não foi feita revisão de console do navegador nem validação visual com Playwright; as capturas existentes localizadas são apenas da TASK-1.

## 14. Registro de implementação — TASK-3 (implementada; aguarda revisão)

- `OrderSnapshot` contém ID UUID, data ISO, linhas com nome/preço/quantidade/totais copiados, endereço, forma de pagamento, subtotal, frete e total. Linhas e snapshot são clonados e congelados no momento de criar.
- `createOrderSnapshot` reutiliza catálogo e funções de cálculo existentes, mantém valores em centavos e rejeita carrinho vazio, produto desconhecido, quantidade inválida e overflow.
- `orderPersistence` salva o pedido mais recente em `coffee-delivery.latest-order.v1`, envelope versão 1. Carregamento trata JSON/storage inválidos e valida estrutura, pagamento, endereço e consistência aritmética antes da confirmação.
- Rota `/order/:orderId` mostra snapshot correspondente mesmo após refresh, e mostra estado seguro para ID ausente, inválido ou que não corresponde ao último pedido salvo. A retenção limita-se ao último pedido no dispositivo/navegador atual.
- Checkout salva o snapshot antes de limpar o reducer do carrinho e navega para confirmação após sucesso. Exceção no snapshot/storage apresenta erro e mantém o carrinho; não há backend, gateway ou transação de pagamento.
- Confirmação exibe status, identificador/data, produtos e quantidades, endereço, método pago na entrega e resumo financeiro; utiliza tokens dos temas existentes e estilos fluidos com adaptação mobile.
- Tema semântico persiste em localStorage e seu teste cobre remontagem/restauração. Foi acrescentado token `onYellow` e teste matemático de contraste AA para o texto do botão de confirmação nos dois temas.
- Testes: `npm test -- --pool=threads --maxWorkers=2 --isolate=false` — 34 testes em 13 arquivos aprovados. `npm run build` — TypeScript e Vite 8.3.8 aprovados.
- Limitações: Playwright MCP não estava disponível nesta sessão. Não foram executados testes visuais em browser, confirmação manual de recarga real, auditoria WCAG assistiva ou revisão de console. Ver pendências TASK-2 em `docs/evidence/TASK-2-VALIDATION.md`.
