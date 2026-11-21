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

export type QuizResult = {
  title: string
  description: string
  focus: string
  time: string
  frequency: string
  obstacle: string
  nextStep: string
}

export const checkoutUrl = 'https://pay.cakto.com.br/325hsrx_494828'

const trackingParameters = ['src', 'sck', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

export function buildCheckoutUrl() {
  const url = new URL(checkoutUrl)
  const currentParameters = new URLSearchParams(window.location.search)

  trackingParameters.forEach((parameter) => {
    const value = currentParameters.get(parameter)
    if (value && !url.searchParams.has(parameter)) url.searchParams.set(parameter, value)
  })

  return url.toString()
}

export const imagePath = (id: string) => `/images/${id}.jpg`

export const heroImage = {
  id: 'flow-wall-pilates-hero',
  alt: 'Mulher praticando alongamento com apoio da parede em casa',
}

export const questions: QuizQuestion[] = [
  {
    prompt: 'Qual mudança você gostaria de priorizar na sua rotina de movimento?',
    imageId: '7520236',
    imageAlt: 'Mulher adulta praticando uma postura de alongamento em casa',
    options: [
      { text: 'Criar um hábito de movimento que eu consiga manter.', imageId: '9004773', imageAlt: 'Mulher sentada no tapete durante uma pausa em casa' },
      { text: 'Explorar mobilidade e flexibilidade.', imageId: '6443479', imageAlt: 'Mulher adulta fazendo alongamento em um tapete' },
      { text: 'Desenvolver força e consciência corporal.', imageId: '6453532', imageAlt: 'Mulher sorrindo enquanto alonga perto do sofá' },
    ],
  },
  {
    prompt: 'Como está sua rotina de exercícios neste momento?',
    imageId: '6453947',
    imageAlt: 'Mulher se alongando no chão de casa com luz natural',
    options: [
      { text: 'Estou começando agora.', imageId: '7500023', imageAlt: 'Mulher adulta se preparando para se movimentar em um tapete' },
      { text: 'Já pratiquei e quero retomar.', imageId: '6767997', imageAlt: 'Mulher praticando yoga em casa com uma aula online' },
      { text: 'Já me movimento com alguma regularidade.', imageId: '8846563', imageAlt: 'Mulher praticando exercícios leves em sua sala' },
    ],
  },
  {
    prompt: 'Quanto tempo parece realista reservar em um dia comum?',
    imageId: '7530025',
    imageAlt: 'Mulher adulta seguindo uma prática de movimento em casa',
    options: [
      { text: 'Até 10 minutos.', imageId: '5262351', imageAlt: 'Mulher fazendo uma postura de equilíbrio dentro de casa' },
      { text: 'De 10 a 20 minutos.', imageId: '7670111', imageAlt: 'Mulher sentada em um tapete durante uma aula de yoga em casa' },
      { text: 'Mais de 20 minutos.', imageId: '8436951', imageAlt: 'Mulher adulta alongando as pernas em um tapete' },
    ],
  },
  {
    prompt: 'Quantos dias por semana você gostaria de reservar para se movimentar?',
    imageId: '36730285',
    imageAlt: 'Mulher se alongando em uma sala aconchegante',
    options: [
      { text: '1 ou 2 dias.', imageId: '4151724', imageAlt: 'Mulher praticando uma postura de yoga em sua sala' },
      { text: '3 ou 4 dias.', imageId: '6246251', imageAlt: 'Mulher adulta praticando yoga em uma sala com plantas' },
      { text: '5 dias ou mais.', imageId: '6975772', imageAlt: 'Mulher sentada em um tapete de yoga no ambiente doméstico' },
    ],
  },
  {
    prompt: 'O que costuma dificultar a criação de uma rotina de movimento?',
    imageId: '6593721',
    imageAlt: 'Mulher usando o celular para acompanhar uma prática de exercícios em casa',
    options: [
      { text: 'Minha agenda costuma ficar cheia.', imageId: '8846094', imageAlt: 'Mulher se alongando em uma sala ensolarada' },
      { text: 'Tenho dificuldade para manter a constância.', imageId: '8846361', imageAlt: 'Mulher em roupa confortável fazendo uma pausa para alongar' },
      { text: 'Nem sempre sei por onde começar.', imageId: '7155365', imageAlt: 'Mulher se movimentando em um ambiente doméstico' },
    ],
  },
  {
    prompt: 'O que mais combina com a forma como você gostaria de se movimentar?',
    imageId: 'flow-wall-pilates-question',
    imageAlt: 'Mulher adulta praticando alongamento lateral com apoio da parede em casa',
    options: [
      { text: 'Praticar em casa, no meu próprio ritmo.', imageId: '8520353', imageAlt: 'Mulher em roupa esportiva alongando com apoio de uma parede' },
      { text: 'Ter flexibilidade para escolher o horário.', imageId: '5132292', imageAlt: 'Mulher fazendo alongamento de perna junto à parede' },
      { text: 'Usar um espaço simples e familiar.', imageId: '8846582', imageAlt: 'Mulher adulta se alongando em sua sala de estar' },
    ],
  },
  {
    prompt: 'O que ajudaria você a dar o primeiro passo com mais confiança?',
    imageId: '4473622',
    imageAlt: 'Mãe e filha sorrindo enquanto fazem um alongamento em casa',
    options: [
      { text: 'Começar com metas pequenas e realistas.', imageId: '8173431', imageAlt: 'Mulher praticando yoga em um ambiente tranquilo de casa' },
      { text: 'Entender como é a prática antes de escolher.', imageId: '36764381', imageAlt: 'Mulher praticando yoga em uma sala moderna e colorida' },
      { text: 'Ter um passo a passo para acompanhar.', imageId: '30500788', imageAlt: 'Mulher adulta praticando exercício no chão' },
    ],
  },
  {
    prompt: 'O que você quer conferir antes de escolher um programa?',
    imageId: '6926544',
    imageAlt: 'Mulher usando uma parede como apoio para um alongamento',
    options: [
      { text: 'O conteúdo e o formato das aulas.', imageId: '8846563', imageAlt: 'Mulher praticando exercícios leves em sua sala' },
      { text: 'O valor e como funciona o acesso.', imageId: '6802944', imageAlt: 'Mulher em uma postura de yoga sobre um tapete na sala' },
      { text: 'As condições para decidir com tranquilidade.', imageId: '12603754', imageAlt: 'Mulher praticando uma postura de yoga em uma sala iluminada' },
    ],
  },
]

export function getQuizResult(answers: Record<number, number>): QuizResult {
  const answerText = (questionIndex: number) => {
    const selectedIndex = answers[questionIndex] ?? 0
    return questions[questionIndex].options[selectedIndex]?.text ?? questions[questionIndex].options[0].text
  }

  const profiles = [
    {
      title: 'Um hábito possível, no seu ritmo',
      description: 'Seu foco é criar uma rotina de movimento que caiba na vida real. Um primeiro passo simples e repetível pode ajudar você a começar sem esperar pela semana perfeita.',
    },
    {
      title: 'Movimento com atenção',
      description: 'Você quer explorar mobilidade e flexibilidade. Pilates na parede usa a parede como apoio durante a prática; respeite seu conforto e avance no seu ritmo.',
    },
    {
      title: 'Força construída com intenção',
      description: 'Você quer desenvolver força e consciência corporal. Um começo gradual ajuda a observar como cada movimento combina com o seu momento.',
    },
  ]

  const selectedProfile = profiles[answers[0] ?? 0] ?? profiles[0]

  return {
    ...selectedProfile,
    focus: answerText(0),
    time: answerText(2),
    frequency: answerText(3),
    obstacle: answerText(4),
    nextStep: answerText(7),
  }
}