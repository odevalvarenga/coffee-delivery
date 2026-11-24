# Especificação técnica — Coffee Delivery

**Estado:** proposta de arquitetura para revisão; sujeita ao enunciado ausente e à aprovação antes da implementação.

## 1. Princípios e stack

- React + TypeScript + Vite como aplicação frontend.
- React Router para rotas de catálogo/checkout/confirmação, a validar com os fluxos finais.
- Context API para disponibilizar estado global; `useReducer` para transições explícitas do carrinho e pedido.
- Hooks próprios apenas para encapsular comportamento reutilizável. Hooks sempre chamados no topo de componentes/hooks, sem condicionais.
- React Hook Form para formulário; Zod para esquema e validação tipada, integrados por resolver quando aprovado.
- styled-components para estilos e temas, conforme solicitação.
- localStorage para persistência local do carrinho e possivelmente tema; não é backend nem armazenamento seguro.
- Nenhuma dependência deve ser instalada antes da aprovação da etapa de implementação.

Versões declaradas na TASK-1: React `^19.0.0`, React Router `^7.1.1`, styled-components `^6.1.13`, TypeScript `~5.7.2`, Vite `^8.3.8`, `@vitejs/plugin-react` `^6.3.0`, Vitest `^5.1.1`, Testing Library `^16.1.0` e jsdom `^25.0.1`. Lockfile fixa as versões resolvidas.

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
type PaymentMethod = string; // substituir por união literal após confirmar opções
type OrderSnapshot = {
  id: string; lines: ReadonlyArray<CartLine>; address: Readonly<Address>;
  paymentMethod: PaymentMethod; subtotalCents: number;
  deliveryFeeCents: number; totalCents: number; createdAt: string;
};
```

`Product`, opções de pagamento, política de identificador e campos obrigatórios ficam pendentes do enunciado. Snapshot precisa copiar os dados relevantes do pedido; não pode apontar para estado mutável do carrinho.

## 4. Estado e persistência

- `CartContext` expõe estado e operações tipadas; reducer puro define ações e transições.
- Ações esperadas em nível arquitetural: adicionar/alterar/remover linha e limpar carrinho. Sem definir limites comerciais antes do enunciado.
- Persistência local serializa um envelope versionado; parse inicial trata JSON inválido e valida formato antes de usar. Política de migração/recuperação será decidida na implementação.
- Efeitos de sincronização com localStorage ficam fora do reducer. Reducer não executa I/O.
- No sucesso do checkout, criar snapshot imutável antes da limpeza. Persistência/vida útil do snapshot após refresh é decisão pendente.
- Contextos separados se tema e pedido excederem o domínio do carrinho; evitar estado global indiscriminado.

## 5. Componentes e rotas (inventário de planejamento)

Componentes candidatos, sem implementação nesta etapa: `App`, providers, `Header`, catálogo/lista/cartão de produto, resumo/itens do carrinho, formulário de checkout, campos controlados, seletor de pagamento, endereço, confirmação e alternador de tema. Nomes e composição finais dependem dos requisitos e do starter.

Rotas candidatas: catálogo, checkout, confirmação. Definir proteção de rota quando carrinho vazio, navegação direta, refresh e URL final após confirmar conforme critérios do professor.

## 6. ViaCEP (obrigatório)

A consulta ViaCEP faz parte do fluxo planejado e não pode ser removida nem tratada como opcional. Cliente isolado em `services`, com CEP normalizado, validação de formato antes da requisição, resposta externa tratada como `unknown` e validada antes de preencher endereço. Prever estados de carregamento, sucesso, CEP não encontrado, erro HTTP/rede e repetição segura; permitir correção manual somente se compatível com enunciado. Campos preenchidos, momento do disparo (blur/botão) e política diante de indisponibilidade aguardam definição. Testar serviço com respostas simuladas, sem depender da rede nos testes automatizados.

## 7. Cálculos monetários

Preço unitário e totais em centavos inteiros. Subtotal = soma de preço unitário × quantidade; frete e arredondamento somente conforme decisão validada. Total = subtotal + taxa aplicável. Taxa de entrega está pendente; não adotar zero nem valor arbitrário. Formatação localizada para BRL é apresentação do inteiro em centavos, sem converter cálculo para ponto flutuante decimal. Validar valores, quantidades e overflow de forma explícita.

## 8. Temas, responsividade e acessibilidade

- styled-components com tokens semânticos e tema claro/escuro; paleta e persistência do tema pendentes de marca/enunciado.
- Layout adaptável para telas estreitas e largas; breakpoints definidos a partir do layout de referência, ainda ausente.
- WCAG 2.2 AA como referência exigida: teclado, foco visível, ordem lógica, rótulos/instruções, erros associados aos campos, contraste, sem dependência exclusiva de cor, semântica e anúncios de mudanças relevantes. Critérios verificáveis por fluxo serão escritos na tarefa de implementação.
- Respeitar preferência de movimento reduzido se houver animações; não inventar movimento visual como requisito.

## 9. Estratégia de testes (planejada; não executar nesta etapa)

- Unitários: reducer, cálculos em centavos, validações Zod, parse/versionamento de persistência.
- Integração: componentes de catálogo/carrinho, formulário, estados do ViaCEP com mock, snapshot e limpeza ordenada.
- Navegação ponta a ponta: fluxo definido pelo professor quando disponível, incluindo caminhos válidos e inválidos.
- Acessibilidade: verificações automatizadas como apoio e revisão manual por teclado, foco, rótulos, contraste e leitor de tela; ferramenta e critérios finais pendentes.
- Cobrir estados vazios, limite/quantidade quando definido, entradas inválidas, falha de rede, atualização de página e confirmação.
- Nenhum teste será rodado/criado nesta etapa de planejamento.

## 10. Deploy e decisões pendentes

Destino, comandos, variáveis e processo de publicação não foram especificados; TASK-3 inclui documentação/deploy, mas plataforma e configuração aguardam confirmação. App sem segredos ou chamadas a pagamento real. Riscos: enunciado ausente, fontes de imagem/licença desconhecidas, regras de frete e meios de pagamento não definidos, indisponibilidade ViaCEP, dados locais incompatíveis entre versões e ausência de layout de referência.

## 11. Registro de implementação — TASK-1 (concluída; aguarda aprovação para TASK-2)

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
