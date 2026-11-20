import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ChevronRight, Heart, Leaf, MoveUpRight, Sparkles } from 'lucide-react'
import { buildCheckoutUrl, getQuizResult, heroImage, imagePath, questions } from './data/quiz'
import { trackPixelEvent } from './lib/metaPixel'

type Screen = 'welcome' | 'quiz' | 'complete'

function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isAdvancing, setIsAdvancing] = useState(false)
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const completedSteps = useRef(new Set<number>())
  const question = questions[questionIndex]
  const selectedOption = answers[questionIndex]
  const result = getQuizResult(answers)

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [screen, questionIndex])

  const beginQuiz = () => {
    completedSteps.current.clear()
    setScreen('quiz')
    trackPixelEvent('QuizStart')
  }

  const completeQuiz = () => {
    setIsAdvancing(false)
    setScreen('complete')
    trackPixelEvent('QuizComplete')
  }

  const chooseOption = (optionIndex: number) => {
    if (isAdvancing) return
    setAnswers((previous) => ({ ...previous, [questionIndex]: optionIndex }))

    const completedQuestion = questionIndex + 1
    if (!completedSteps.current.has(completedQuestion)) {
      completedSteps.current.add(completedQuestion)
      trackPixelEvent('QuizStepComplete', { question_number: completedQuestion })
    }

    setIsAdvancing(true)
    advanceTimer.current = setTimeout(() => {
      if (questionIndex === questions.length - 1) {
        completeQuiz()
      } else {
        setQuestionIndex((previous) => previous + 1)
        setIsAdvancing(false)
      }
    }, 380)
  }

  const goBack = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    setIsAdvancing(false)
    if (questionIndex > 0) {
      setQuestionIndex((previous) => previous - 1)
    } else {
      setScreen('welcome')
    }
  }

  const restart = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current)
    completedSteps.current.clear()
    setAnswers({})
    setQuestionIndex(0)
    setIsAdvancing(false)
    setScreen('welcome')
  }

  return (
    <main className="app-shell min-h-screen bg-sand text-forest">
      <header className="site-header">
        <a className="brand" href="#inicio" onClick={(event) => { event.preventDefault(); restart() }} aria-label="Pilates na Parede — início">
          <span className="brand-mark" aria-hidden="true"><Leaf size={18} strokeWidth={1.8} /></span>
          <span className="brand-name">movimento<span>em casa</span></span>
        </a>
        <div className="header-note"><span className="header-dot" /> seu momento, seu ritmo</div>
      </header>

      {screen === 'welcome' && (
        <section className="welcome-stage" aria-labelledby="welcome-title">
          <div className="welcome-copy">
            <span className="eyebrow"><Sparkles size={14} /> QUIZ GRATUITO · PILATES NA PAREDE</span>
            <h1 id="welcome-title">Encontre um jeito mais simples de se movimentar <em>em casa.</em></h1>
            <p className="welcome-subtitle">Responda a 8 perguntas rápidas e descubra um ponto de partida que combina com seu momento, seu tempo e sua rotina.</p>
            <button className="primary-button welcome-button" onClick={beginQuiz}>
              DESCOBRIR MEU PONTO DE PARTIDA <ArrowRight size={18} />
            </button>
            <div className="welcome-points" aria-label="Sobre o quiz">
              <span><Check size={15} /> 8 perguntas rápidas</span>
              <span><Heart size={15} /> Resultado na hora</span>
              <span><Check size={15} /> Sem cadastro</span>
            </div>
          </div>
          <div className="welcome-visual">
            <div className="hero-image-frame">
              <img src={imagePath(heroImage.id)} alt={heroImage.alt} fetchPriority="high" decoding="async" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} />
              <div className="image-tag"><span className="tag-icon"><Heart size={15} fill="currentColor" /></span><span>um espaço para você</span></div>
            </div>
            <span className="hero-orbit orbit-one" />
            <span className="hero-orbit orbit-two" />
            <span className="hero-caption">movimento leve<br />feito em casa</span>
          </div>
          <div className="welcome-bottomline"><span>SEU MOMENTO</span><span className="bottomline-rule" /><span>UM PASSO DE CADA VEZ</span></div>
        </section>
      )}

      {screen === 'quiz' && (
        <section className="quiz-stage" aria-labelledby="question-title">
          <div className="quiz-topline">
            <button className="back-button" onClick={goBack} aria-label={questionIndex === 0 ? 'Voltar para o início' : 'Voltar para a pergunta anterior'}>
              <ArrowLeft size={18} /> <span>Voltar</span>
            </button>
            <span className="question-count">PERGUNTA <strong>{questionIndex + 1}</strong> <i>DE</i> {questions.length}</span>
          </div>
          <div className="progress-track" role="progressbar" aria-label="Progresso do quiz" aria-valuemin={0} aria-valuemax={questions.length} aria-valuenow={questionIndex + 1}>
            <span className="progress-fill" style={{ width: ((questionIndex + 1) / questions.length) * 100 + '%' }} />
          </div>

          <div className="question-layout question-enter" key={questionIndex}>
            <div className="question-content">
              <span className="eyebrow question-eyebrow"><span className="eyebrow-number">0{questionIndex + 1}</span> SUA ROTINA</span>
              <h2 id="question-title">{question.prompt}</h2>
              <p className="question-hint">Não existe resposta certa. Escolha a opção que mais combina com você.</p>
              <div className="options-list" role="group" aria-label="Alternativas de resposta">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedOption === optionIndex
                  return (
                    <button
                      key={option.text}
                      className={isSelected ? 'option-card is-selected' : 'option-card'}
                      onClick={() => chooseOption(optionIndex)}
                      aria-pressed={isSelected}
                      disabled={isAdvancing}
                    >
                      <img src={imagePath(option.imageId)} alt={option.imageAlt} loading="lazy" decoding="async" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} />
                      <span className="option-shade" />
                      <span className="option-letter">{String.fromCharCode(65 + optionIndex)}</span>
                      <span className="option-text">{option.text}</span>
                      <span className="option-check" aria-hidden="true">{isSelected ? <Check size={15} /> : <ChevronRight size={17} />}</span>
                    </button>
                  )
                })}
              </div>
              <p className="privacy-note"><Heart size={13} /> Não pedimos seu nome ou contato. Suas escolhas não são enviadas à Meta; medimos apenas o avanço pelas etapas.</p>
            </div>
            <figure className="question-visual">
              <img src={imagePath(question.imageId)} alt={question.imageAlt} loading="eager" decoding="async" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} />
              <figcaption><span className="photo-line" /> MOVIMENTO NO SEU RITMO</figcaption>
            </figure>
          </div>
          <div className="quiz-footer"><span>UM PASSO DE CADA VEZ</span><span className="footer-dot" /><span>SEM PRESSA, NO SEU RITMO</span></div>
        </section>
      )}

      {screen === 'complete' && (
        <section className="complete-stage" aria-labelledby="complete-title">
          <div className="complete-image">
            <img src={imagePath('36917074')} alt="Mulher adulta praticando exercícios em casa" loading="eager" decoding="async" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} />
            <div className="complete-image-label"><Leaf size={16} /> UM PASSO POSSÍVEL COMEÇA COM VOCÊ</div>
          </div>
          <div className="complete-copy">
            <span className="eyebrow"><span className="complete-check"><Check size={13} /></span> SEU RESULTADO</span>
            <h1 id="complete-title">Seu ponto de partida <em>para este momento.</em></h1>
            <h2 className="result-title">{result.title}</h2>
            <p>{result.description}</p>
            <div className="result-details" aria-label="Resumo das suas respostas">
              <div className="result-detail"><span>Seu foco</span><strong>{result.focus}</strong></div>
              <div className="result-detail"><span>Tempo que gostaria de reservar</span><strong>{result.time}</strong></div>
              <div className="result-detail"><span>Frequência desejada</span><strong>{result.frequency}</strong></div>
              <div className="result-detail"><span>Desafio que quer contornar</span><strong>{result.obstacle}</strong></div>
            </div>
            <section className="included-content" aria-labelledby="included-content-title">
              <h3 id="included-content-title">O que você recebe</h3>
              <p className="included-content-intro">Programa em vídeo com 9 módulos, cada um com 1 aula.</p>
              <ul>
                <li>Comece por aqui, aquecimento e guias de Pilates iniciante e intermediário.</li>
                <li>Guia de alimentação e módulo “Aplicativo (Novidade)”.</li>
                <li>Três bônus: “Bumbum dos Sonhos”, “Eliminando a Flacidez” e “Eliminando a Celulite”.</li>
              </ul>
            </section>
            <div className="program-highlight"><span className="highlight-icon"><Heart size={19} /></span><span><strong>Seu próximo passo</strong><small>Você quer conferir {result.nextStep.toLowerCase()} Na página da Cakto, avalie se o programa combina com você antes de continuar.</small></span><MoveUpRight className="highlight-arrow" size={19} /></div>
            <a
              className="primary-button checkout-button"
              href={buildCheckoutUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackPixelEvent('CheckoutClick', { content_name: 'Pilates na Parede' })}
            >
              QUERO CONHECER O PROGRAMA <ArrowRight size={18} />
            </a>
            <p className="result-note">A Cakto abrirá em uma nova aba. A compra só é concluída se você decidir finalizar o pagamento.</p>
            <button className="restart-button" onClick={restart}><ArrowLeft size={14} /> Refazer o quiz</button>
          </div>
        </section>
      )}

      <footer className="site-footer">
        <span>© {new Date().getFullYear()} movimento em casa</span>
        <span className="footer-heart"><Heart size={12} /> feito para você</span>
      </footer>
    </main>
  )
}

export default App
