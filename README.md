# Quiz de Vendas — Pilates na Parede

Quiz em português para apresentar o programa Pilates na Parede a mulheres que querem se movimentar em casa e encontrar uma rotina possível. O projeto usa React, Vite, TypeScript e Tailwind CSS, com publicação pronta para a Vercel.

## O que está incluído

- Tela de abertura, oito perguntas com três opções visuais cada, e tela final com o link de compra solicitado.
- 34 fotos distintas do Pexels armazenadas localmente em versões comprimidas. Créditos e páginas das fotos estão em `public/images/README.md`.
- Navegação para voltar, respostas preservadas, avanço automático, indicador de progresso, adaptação para celular e suporte a movimento reduzido.
- Eventos opcionais do Meta Pixel: `PageView`, `ViewContent`, `QuizStart`, `QuizComplete` e `InitiateCheckout`.
- Configuração de rota para Vercel, metadados básicos de SEO e favicon.

## 1. Baixar e extrair o ZIP

Baixe `quiz-pilates-na-parede.zip` e extraia a pasta `quiz-pilates-na-parede` para um local de sua preferência.

## 2. Criar um repositório no GitHub

1. Entre em [github.com](https://github.com/) e faça login.
2. Selecione **New repository**.
3. Dê um nome ao repositório, por exemplo `quiz-pilates-na-parede`.
4. Escolha se ele será público ou privado e crie o repositório vazio.

## 3. Enviar os arquivos ao GitHub

1. Abra a página do repositório recém-criado.
2. Selecione **Add file → Upload files**.
3. Abra a pasta extraída no computador e envie o conteúdo dela, incluindo `package.json`, `src`, `public` e `vercel.json`.
4. Confirme em **Commit changes**.

Também é possível enviar os arquivos pelo aplicativo GitHub Desktop ou pelo Git instalado no computador.

## 4. Conectar o repositório à Vercel

1. Acesse [vercel.com](https://vercel.com/) e entre ou crie uma conta.
2. Selecione **Add New → Project** e conecte sua conta do GitHub, se solicitado.
3. Escolha o repositório `quiz-pilates-na-parede` e selecione **Import**.
4. A Vercel identifica o Vite automaticamente. Use `npm run build` como comando de build e `dist` como pasta de saída.
5. Selecione **Deploy**.

## 5. Publicar e atualizar

Ao terminar a primeira publicação, a Vercel mostrará um endereço público terminado em `.vercel.app`. Cada novo envio de alterações ao GitHub inicia uma nova publicação automaticamente. Para atualizar, edite os arquivos, envie um novo commit ao repositório e aguarde o deploy terminar.

## 6. Configurar o Meta Pixel (opcional)

1. Copie `.env.example` para `.env.local` no computador, ou adicione a variável nas configurações do projeto na Vercel.
2. Informe seu ID em `VITE_META_PIXEL_ID`, sem aspas. Exemplo: `VITE_META_PIXEL_ID=123456789012345`.
3. No painel da Vercel, abra **Settings → Environment Variables**, cadastre `VITE_META_PIXEL_ID` para os ambientes desejados e salve.
4. Faça uma nova publicação para aplicar a variável.

Sem um ID configurado, o quiz funciona normalmente e o script do Pixel não é carregado. Eventos são emitidos uma vez por sessão de página.

## 7. Rodar no computador

É necessário ter Node.js 18 ou superior e npm instalados. Dentro da pasta do projeto, abra um terminal e execute:

```bash
npm install
npm run dev
```

Para verificar a versão de produção antes de enviar:

```bash
npm run build
npm run preview
```

## Fotos

As fotos já estão dentro de `public/images`, então o quiz não depende de um serviço externo para mostrá-las. Foram obtidas de páginas de fotos gratuitas do Pexels e reduzidas para uso na página. Os créditos e referências de licença estão em `public/images/README.md`.
