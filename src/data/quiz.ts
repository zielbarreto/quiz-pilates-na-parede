export type QuizOption = {
  text: string
  imageId: string
  imageAlt: string
}

export type QuizQuestion = {
  prompt: string
  imageId: string
  imageAlt: string
  options: [QuizOption, QuizOption, QuizOption]
}

export const checkoutUrl = 'https://pay.cakto.com.br/325hsrx_494828'

export const imagePath = (id: string) => `/images/${id}.jpg`

export const heroImage = {
  id: '8173427',
  alt: 'Mulher praticando exercícios em um tapete em sua sala de estar',
}

export const questions: QuizQuestion[] = [
  {
    prompt: 'Você sente que precisa cuidar mais do seu corpo, mas acaba deixando isso sempre para depois?',
    imageId: '7520236',
    imageAlt: 'Mulher adulta praticando uma postura de alongamento em casa',
    options: [
      { text: 'Sim, sempre deixo para depois.', imageId: '9004773', imageAlt: 'Mulher sentada no tapete durante uma pausa em casa' },
      { text: 'Às vezes começo, mas não consigo continuar.', imageId: '7500023', imageAlt: 'Mulher adulta se preparando para se movimentar em um tapete' },
      { text: 'Quero mudar isso de verdade.', imageId: '6453532', imageAlt: 'Mulher sorrindo enquanto alonga perto do sofá' },
    ],
  },
  {
    prompt: 'O que mais incomoda você atualmente?',
    imageId: '6453947',
    imageAlt: 'Mulher se alongando no chão de casa com luz natural',
    options: [
      { text: 'Falta de flexibilidade e mobilidade.', imageId: '6443479', imageAlt: 'Mulher adulta fazendo alongamento em um tapete' },
      { text: 'Sedentarismo e falta de disposição.', imageId: '30500788', imageAlt: 'Mulher adulta praticando exercício no chão' },
      { text: 'Não gostar da aparência do meu corpo.', imageId: '6767997', imageAlt: 'Mulher praticando yoga em casa com uma aula online' },
    ],
  },
  {
    prompt: 'Como você se sente quando pensa em praticar exercícios?',
    imageId: '8846574',
    imageAlt: 'Mulher adulta praticando alongamentos em uma sala iluminada',
    options: [
      { text: 'Tenho vontade, mas falta tempo.', imageId: '8846094', imageAlt: 'Mulher se alongando em uma sala ensolarada' },
      { text: 'Acho difícil manter a disciplina.', imageId: '8846361', imageAlt: 'Mulher em roupa confortável fazendo uma pausa para alongar' },
      { text: 'Gostaria de algo simples para fazer em casa.', imageId: '7155365', imageAlt: 'Mulher se movimentando em um ambiente doméstico' },
    ],
  },
  {
    prompt: 'Quanto tempo você conseguiria reservar para cuidar de si mesma?',
    imageId: '7530025',
    imageAlt: 'Mulher adulta seguindo uma prática de movimento em casa',
    options: [
      { text: '10 minutos por dia.', imageId: '5262351', imageAlt: 'Mulher fazendo uma postura de equilíbrio dentro de casa' },
      { text: '15 a 20 minutos por dia.', imageId: '7670111', imageAlt: 'Mulher sentada em um tapete durante uma aula de yoga em casa' },
      { text: '30 minutos ou mais.', imageId: '8436951', imageAlt: 'Mulher adulta alongando as pernas em um tapete' },
    ],
  },
  {
    prompt: 'O que mais impede você de frequentar uma academia?',
    imageId: '6593721',
    imageAlt: 'Mulher usando o celular para acompanhar uma prática de exercícios em casa',
    options: [
      { text: 'Falta de tempo.', imageId: '4151724', imageAlt: 'Mulher praticando uma postura de yoga em sua sala' },
      { text: 'Custo da academia.', imageId: '6246251', imageAlt: 'Mulher adulta praticando yoga em uma sala com plantas' },
      { text: 'Prefiro me exercitar na minha própria casa.', imageId: '6975772', imageAlt: 'Mulher sentada em um tapete de yoga no ambiente doméstico' },
    ],
  },
  {
    prompt: 'Você gostaria de praticar exercícios sem precisar de equipamentos sofisticados?',
    imageId: '8401112',
    imageAlt: 'Mulher praticando alongamento com apoio de uma parede',
    options: [
      { text: 'Sim, seria muito melhor.', imageId: '8520353', imageAlt: 'Mulher em roupa esportiva alongando com apoio de uma parede' },
      { text: 'Com certeza, quero praticidade.', imageId: '5132292', imageAlt: 'Mulher fazendo alongamento de perna junto à parede' },
      { text: 'É exatamente o que estou procurando.', imageId: '8846582', imageAlt: 'Mulher adulta se alongando em sua sala de estar' },
    ],
  },
  {
    prompt: 'Imagine ter uma rotina de exercícios em casa. O que isso representaria para você?',
    imageId: '4473622',
    imageAlt: 'Mãe e filha sorrindo enquanto fazem um alongamento em casa',
    options: [
      { text: 'Mais cuidado comigo mesma.', imageId: '8173431', imageAlt: 'Mulher praticando yoga em um ambiente tranquilo de casa' },
      { text: 'Mais disposição no dia a dia.', imageId: '36764381', imageAlt: 'Mulher praticando yoga em uma sala moderna e colorida' },
      { text: 'Uma oportunidade de mudar meus hábitos.', imageId: '36730285', imageAlt: 'Mulher se alongando em uma sala aconchegante' },
    ],
  },
  {
    prompt: 'Se você encontrasse um programa de Pilates na Parede para acompanhar em casa, estaria disposta a começar?',
    imageId: '6926544',
    imageAlt: 'Mulher usando uma parede como apoio para um alongamento',
    options: [
      { text: 'Sim, quero começar agora.', imageId: '8846563', imageAlt: 'Mulher praticando exercícios leves em sua sala' },
      { text: 'Sim, quero conhecer o programa.', imageId: '6802944', imageAlt: 'Mulher em uma postura de yoga sobre um tapete na sala' },
      { text: 'Ainda tenho dúvidas, mas quero saber mais.', imageId: '12603754', imageAlt: 'Mulher praticando uma postura de yoga em uma sala iluminada' },
    ],
  },
]
