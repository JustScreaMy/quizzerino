interface Answer {
	id: string
	text: string
}

interface Question {
	text: string
	answers: Array<Answer>
	correct: string
}

export { Answer, Question }
