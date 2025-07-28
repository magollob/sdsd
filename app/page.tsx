"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import Image from "next/image"

interface Question {
  id: number
  question: string
  options: string[]
}

const questions: Question[] = [
  {
    id: 1,
    question: "Você está pronta para seguir o passo a passo criado especialmente para você?",
    options: ["Sim, estou pronta!", "Sim, mas preciso de apoio", "Ainda tenho dúvidas"],
  },
  {
    id: 2,
    question: "Se você pudesse dobrar o valor dos seus doces, como isso mudaria sua vida?",
    options: ["Seria meu sonho!", "É tudo que eu preciso", "Não sei se é possível"],
  },
  {
    id: 3,
    question: "Você já comprou curso de confeitaria?",
    options: ["Nunca", "Já fiz curso", "Mais de 2 cursos"],
  },
  {
    id: 4,
    question: "Se você tivesse acesso a essa técnica secreta de caramelização, o que faria com isso?",
    options: ["Começaria a produzir", "Testaria a receita", "Não sei por onde começar"],
  },
  {
    id: 5,
    question: "Qual dessas metas mais você deseja?",
    options: [
      "Quero viver só de doces",
      "Quero uma renda extra",
      "Quero ser uma confeiteira profissional",
      "Quero ver como isso funciona",
    ],
  },
  {
    id: 6,
    question: "Como ficam seus caramelizados depois de embalados?",
    options: ["Ficam feios", "Eles derretem em algumas horas", "Não sei fazer"],
  },
  {
    id: 7,
    question: "Qual é o seu maior desafio hoje com doces?",
    options: ["Nunca fiz", "Faço pra família", "Vendo mas não tenho lucro", "Quero vender mais"],
  },
]

export default function QuizDoces() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [fadeOut, setFadeOut] = useState(false)
  const [fadeIn, setFadeIn] = useState(true)
  const [quizStarted, setQuizStarted] = useState(false)

  const progressPercentage = ((currentQuestion + 1) / questions.length) * 100

  const startQuiz = () => {
    setQuizStarted(true)
  }

  useEffect(() => {
    setFadeIn(true)
  }, [currentQuestion])

  // Página de introdução - antes do quiz começar
  if (!quizStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gradient-to-b from-orange-50 to-orange-100 border-none shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="mb-8">
              <Image src="/logo.webp" alt="Viver de Doces Caramelizados" width={200} height={80} className="mx-auto" />
            </div>

            <h1 className="text-2xl font-bold text-orange-900 mb-6 leading-tight">
              VOCÊ ESTÁ PRONTA PRA DESCOBRIR COMO FAZER DOCES CARAMELIZADOS DELICIOSOS?
            </h1>

            <p className="text-gray-700 mb-6 text-sm leading-relaxed">
              Existe uma técnica secreta de caramelização usada pelas Top confeiteiras europeias
            </p>

            <p className="text-gray-800 font-semibold mb-8 text-sm leading-relaxed">
              Clique no botão abaixo e descubra se essa técnica também vai funcionar pra você:
            </p>

            <Button
              onClick={startQuiz}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-full text-lg shadow-lg transform transition hover:scale-105"
            >
              QUERO DESCOBRIR AGORA!
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const handleAnswer = (answer: string) => {
    const newAnswers = [...answers, answer]
    setAnswers(newAnswers)

    setFadeOut(true)

    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1)
        setFadeOut(false)
        setFadeIn(true)
      } else {
        setIsLoading(true)
        startLoadingAnimation()
      }
    }, 300)
  }

  const startLoadingAnimation = () => {
    let progress = 0
    const interval = setInterval(() => {
      progress += 2.5
      setLoadingProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setTimeout(() => {
          window.location.href = "https://chocoliciasdafabi.com/doces"
        }, 500)
      }
    }, 100)
  }

  const redirectToOffer = () => {
    window.location.href = "https://chocoliciasdafabi.com/doces"
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md bg-gradient-to-b from-orange-50 to-orange-100 border-none shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <Image src="/logo.webp" alt="Viver de Doces Caramelizados" width={200} height={80} className="mx-auto" />
            </div>

            <div className="mb-8">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-orange-500 mx-auto mb-4"></div>
              <h2 className="text-xl font-bold text-gray-800 mb-4">Analisando as suas respostas...</h2>
              <Progress value={loadingProgress} className="w-full h-3 bg-orange-200" />
              <p className="text-sm text-gray-600 mt-2">{Math.round(loadingProgress)}%</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const question = questions[currentQuestion]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-orange-100 flex items-start justify-center p-6 pt-12 md:pt-8">
      <Card className="w-full max-w-md bg-gradient-to-b from-orange-50 to-orange-100 border-none shadow-xl">
        <CardContent className="p-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="flex justify-between items-center mb-2"></div>
          </div>

          {/* Header com logo */}
          <div className="mb-6 text-center">
            <Image
              src="/logo.webp"
              alt="Viver de Doces Caramelizados"
              width={150}
              height={60}
              className="mx-auto mb-4"
            />
            <div className="h-2 bg-orange-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-orange-400 to-yellow-400 rounded-full transition-all duration-500 ease-out"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Pergunta com fade effect */}
          <div className={`text-center mb-8 transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
            <h2 className="text-xl font-bold text-gray-800 mb-4 leading-tight">{question.question}</h2>
            <p className="text-gray-600 text-sm">Selecione a sua resposta</p>
          </div>

          {/* Opções com fade effect */}
          <div className={`space-y-4 transition-opacity duration-300 ${fadeOut ? "opacity-0" : "opacity-100"}`}>
            {question.options.map((option, index) => (
              <Button
                key={index}
                onClick={() => handleAnswer(option)}
                className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-white font-semibold py-6 px-6 rounded-full shadow-lg transform transition hover:scale-105 text-sm"
                disabled={fadeOut}
              >
                {option}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
