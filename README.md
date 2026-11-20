# Quiz de Vendas — Pilates na Parede

Quiz em português para apresentar o programa Pilates na Parede a pessoas que querem se movimentar em casa e encontrar um ponto de partida possível. O projeto usa React, Vite, TypeScript e publica pela Vercel.

## O que está incluído

- Tela inicial com uma promessa clara, oito perguntas sobre objetivo, tempo, frequência e rotina, e resultado local baseado nas respostas.
- Resultado com resumo das escolhas e chamada para conferir conteúdo e condições na Cakto.
- As respostas não são enviadas à Meta. Os eventos de mensuração incluem apenas visualização, início, número da etapa, conclusão e clique no checkout.
- Repasse de `src`, `sck` e UTMs aceitos pela Cakto da URL do quiz para o checkout.
- 34 fotos do Pexels armazenadas localmente em versões comprimidas. Créditos e páginas das fotos estão em `public/images/README.md`.
- Navegação para voltar, respostas preservadas durante o quiz, avanço automático, indicador de progresso, adaptação para celular e suporte a movimento reduzido.

## Publicar e atualizar

O repositório conectado à Vercel é `zielbarreto/quiz-pilates-na-parede`. Cada commit enviado à branch `main` inicia uma publicação automática.

O comando de build é `npm run build` e a pasta de saída é `dist`.

## Meta Pixel e eventos

O projeto pode carregar o Pixel quando a variável `VITE_META_PIXEL_ID` estiver configurada no ambiente de produção da Vercel:

1. No painel da Vercel, abra **Settings → Environment Variables**.
2. Adicione `VITE_META_PIXEL_ID` com o ID do Pixel, sem aspas, no ambiente **Production**.
3. Salve e gere uma nova publicação.
4. Confira os eventos no Gerenciador de Eventos da Meta.

Eventos previstos:

- `PageView` e `ViewContent` ao abrir o quiz.
- `QuizStart` ao iniciar.
- `QuizStepComplete` a cada etapa respondida, com somente o número da pergunta.
- `QuizComplete` ao concluir as oito perguntas.
- `InitiateCheckout` no clique para abrir o checkout.

O clique no checkout não significa venda. Configure a medição de `Purchase` na própria Cakto ou por uma integração que confirme o pagamento aprovado. Nunca dispare uma compra só porque alguém clicou no botão.

## Atribuição das campanhas na Cakto

O quiz repassa para o checkout os parâmetros `src`, `sck`, `utm_source`, `utm_medium`, `utm_campaign`, `utm_term` e `utm_content` quando eles chegam na URL.

A Cakto explica como usar esses parâmetros na [central de ajuda](https://ajuda.cakto.com.br/pt-br/articles/54-como-usar-utm-e-src-no-link-do-checkout). Para a plataforma associar visitas do site às vendas, confira se o domínio do quiz está cadastrado na seção **Links** do produto Cakto. Depois de iniciar os anúncios, consulte os parâmetros nos detalhes das vendas.

No Meta Ads, adicione parâmetros UTM no nível do anúncio. Use nomes de campanha, conjunto e criativo neutros e que não exponham dados pessoais ou informações de saúde.

## Rodar no computador

É necessário ter Node.js 18 ou superior e npm instalados. Na pasta do projeto:

```bash
npm install
npm run dev
```

Para gerar a versão de produção:

```bash
npm run build
npm run preview
```

## Fotos

As fotos já estão em `public/images`, então o quiz não depende de um serviço externo para exibi-las. Foram obtidas de páginas gratuitas do Pexels e reduzidas para uso na página. Os créditos e as referências de licença estão em `public/images/README.md`.