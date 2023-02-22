interface Answer {
	id: string
	text: string
}

interface Question {
	text: string
	answers: Array<Answer>
	correct: string
}

class Quizzerino {
	private quiz: HTMLElement
	private submitButton: HTMLElement
	private resultsElement: HTMLElement
	private questions: Question[]

	public constructor(
		quizFormId: string,
		submitButtonId: string,
		resultsId: string,
		questions: Question[]
	) {
		const formElement = document.getElementById(quizFormId)
		if (!formElement) {
			throw new Error('Quiz form not found!')
		}
		this.quiz = formElement

		const buttonElement = document.getElementById(submitButtonId)
		if (!buttonElement) {
			throw new Error('Submit button not found!')
		}
		this.submitButton = buttonElement

		const resultsElement = document.getElementById(resultsId)
		if (!resultsElement) {
			throw new Error('Quiz form not found!')
		}
		this.resultsElement = resultsElement

		this.questions = questions
	}

	public initialize() {
		this.questions.forEach(this.generateQuestion.bind(this))
		this.submitButton.addEventListener('click', this.evaluateQuiz.bind(this))
	}

	private generateQuestion(question: Question, questionIndex: number) {
		const questionWrapper = document.createElement('div')
		questionWrapper.className = 'question'

		const questionEl = document.createElement('p')
		questionEl.innerHTML = question.text
		questionWrapper.appendChild(questionEl)

		const answersWrapper = document.createElement('div')
		answersWrapper.className = 'answers'
		questionWrapper.appendChild(answersWrapper)

		question.answers.forEach((answer, answerIndex) => {
			const answerId = `${questionIndex}${answerIndex}`

			const answerWrapper = document.createElement('div')
			answerWrapper.className = 'answer'

			const answerEl = document.createElement('input')
			answerEl.type = 'radio'
			answerEl.name = `${questionIndex}`
			answerEl.value = answer.id
			answerEl.id = answerId

			const label = document.createElement('label')
			label.htmlFor = answerId
			label.innerHTML = answer.text
			answerWrapper.appendChild(answerEl)
			answerWrapper.appendChild(label)
			answersWrapper.appendChild(answerWrapper)
		})
		this.quiz.appendChild(questionWrapper)
	}

	private evaluateQuiz(event: MouseEvent) {
		let correct = 0
		let wrong = 0
		let missing = 0
		event.preventDefault()
		this.questions.forEach((question, i) => {
			const userAnswer: HTMLInputElement | null = document.querySelector(
				`input[name="${i}"]:checked`
			)
			if (!userAnswer) {
				missing += 1
				return
			}
			if (userAnswer.value !== question.correct) {
				wrong += 1
				return
			}
			correct += 1
		})
		const correctEl = document.createElement('p')
		correctEl.className = 'result'
		correctEl.innerHTML = `Správné odpovědi: ${correct}`
		this.resultsElement.appendChild(correctEl)

		const wrongEl = document.createElement('p')
		wrongEl.className = 'result'
		wrongEl.innerHTML = `Špatné odpovědi: ${wrong}`
		this.resultsElement.appendChild(wrongEl)

		const missingEl = document.createElement('p')
		missingEl.className = 'result'
		missingEl.innerHTML = `Chybějící odpovědi: ${missing}`
		this.resultsElement.appendChild(missingEl)

		const percentageEl = document.createElement('p')
		const percent = 100 * (correct / (correct + wrong + missing))
		percentageEl.className = 'result'
		percentageEl.innerHTML = `Úspěšnost v procentech: ${percent}%`
		this.resultsElement.appendChild(percentageEl)
	}
}
