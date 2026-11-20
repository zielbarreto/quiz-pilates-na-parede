import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, ChevronRight, Heart, Leaf, MoveUpRight, Sparkles } from 'lucide-react'
import { checkoutUrl, heroImage, imagePath, questions } from './data/quiz'
import { trackPixelEvent } from './lib/metaPixel'

type Screen = 'welcome' | 'quiz' | 'complete'

function App() {
  const [screen, setScreen] = useState<Screen>('welcome')
  const [questionIndex, setQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isAdvancing, setIsAdvancing] = useState(false)
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const question = questions[questionIndex]
  const selectedOption = answers[questionIndex]

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current)
    }
  }, [])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [screen, questionIndex])

  const beginQuiz = () => {
    setScreen('quiz')
    trackPixelEvent('ViewContent', { content_name: 'Quiz Pilates na Parede' })
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
        <div className="header-note"><span className="header-dot" /> seu momento, no seu ritmo</div>
      </header>

      {screen === 'welcome' && (
        <section className="welcome-stage" aria-labelledby="welcome-title">
          <div className="welcome-copy">
            <span className="eyebrow"><Sparkles size={14} /> UM CONVITE PARA VOCÊ</span>
            <h1 id="welcome-title">VOCÊ ESTÁ CUIDANDO DE SI MESMA <em>COMO GOSTARIA?</em></h1>
            <p className="welcome-subtitle">Descubra como o Pilates na Parede pode ajudar você a incluir mais movimento e cuidado na sua rotina, sem precisar sair de casa.</p>
            <button className="primary-button welcome-button" onClick={beginQuiz}>
              QUERO COMEÇAR <ArrowRight size={18} />
            </button>
            <div className="welcome-points" aria-label="Sobre o quiz">
              <span><Check size={15} /> 8 perguntas rápidas</span>
              <span><Heart size={15} /> Responda no seu tempo</span>
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
          <div className="welcome-bottomline"><span>01 — CUIDADO</span><span className="bottomline-rule" /><span>UM PASSO DE CADA VEZ</span></div>
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
            <span className="progress-fill" style={{ width: `${((questionIndex + 1) / questions.length) * 100}%` }} />
          </div>

          <div className="question-layout question-enter" key={questionIndex}>
            <div className="question-content">
              <span className="eyebrow question-eyebrow"><span className="eyebrow-number">0{questionIndex + 1}</span> REFLEXÃO</span>
              <h2 id="question-title">{question.prompt}</h2>
              <p className="question-hint">Escolha a opção que mais combina com você.</p>
              <div className="options-list" role="group" aria-label="Alternativas de resposta">
                {question.options.map((option, optionIndex) => {
                  const isSelected = selectedOption === optionIndex
                  return (
                    <button
                      key={option.text}
                      className={`option-card${isSelected ? ' is-selected' : ''}`}
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
              <p className="privacy-note"><Heart size={13} /> Esta é uma conversa com você mesma. Responda com sinceridade e leveza.</p>
            </div>
            <figure className="question-visual">
              <img src={imagePath(question.imageId)} alt={question.imageAlt} loading="eager" decoding="async" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} />
              <figcaption><span className="photo-line" /> MOVIMENTO NO SEU RITMO</figcaption>
              <span className="visual-stamp"><Leaf size={20} /><span>um novo<br />começo</span></span>
            </figure>
          </div>
          <div className="quiz-footer"><span>UM PASSO DE CADA VEZ</span><span className="footer-dot" /><span>VOCÊ MERECE ESSE MOMENTO</span></div>
        </section>
      )}

      {screen === 'complete' && (
        <section className="complete-stage" aria-labelledby="complete-title">
          <div className="complete-image">
            <img src={imagePath('36917074')} alt="Mulher adulta praticando exercícios em casa" loading="eager" decoding="async" onError={(event) => { event.currentTarget.style.visibility = 'hidden' }} />
            <div className="complete-image-label"><Leaf size={16} /> UM NOVO CAPÍTULO COMEÇA COM VOCÊ</div>
          </div>
          <div className="complete-copy">
            <span className="eyebrow"><span className="complete-check"><Check size={13} /></span> SEU QUIZ FOI CONCLUÍDO</span>
            <h1 id="complete-title">SEU PRÓXIMO PASSO PODE <em>COMEÇAR HOJE!</em></h1>
            <p>Você não precisa esperar ter mais tempo ou uma rotina perfeita para começar a cuidar de si mesma. O Pilates na Parede apresenta uma alternativa prática para incluir exercícios em casa, respeitando seu ritmo e sua disponibilidade.</p>
            <div className="program-highlight"><span className="highlight-icon"><Heart size={19} /></span><span><strong>Conheça o programa Pilates na Parede</strong><small>e veja como começar.</small></span><MoveUpRight className="highlight-arrow" size={19} /></div>
            <a
              className="primary-button checkout-button"
              href={checkoutUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackPixelEvent('InitiateCheckout', { content_name: 'Pilates na Parede' })}
            >
              QUERO CONHECER O PILATES NA PAREDE <ArrowRight size={18} />
            </a>
            <button className="restart-button" onClick={restart}><ArrowLeft size={14} /> Voltar ao início</button>
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
