# Quizzerino

Are you making a website and need to make a little quiz for the readers? Boy I know the best for you!

You can use Quizzerino to create simple, quick and functioning quiz for your little website.

## How to use this?

It is simple, all you need to do is:

1. Add script tag with src at the end of your body

```html
<script src="https://cdn.jsdelivr.net/npm/@justscreamy/quizzerino@latest/dist/index.js"></script>
```

2. Create your quiz under that!

```html
<script>
	new Quizzerino(
		'idOfYourEmptyQuizElement',
		'idOfYourOwnSubmitButton',
		'idOfYourElementToShowResults',
		[
			{
				text: 'Question text',
				answers: [
					{ id: 'answerId', text: 'answerText' },
					{ id: 'anotherAnswerId', text: 'anotherAnswerText' },
				],
				correct: 'answerId', // <-- id of correct answer
			}, // <-- you can have multiple questions, just use the same format
		]
	).initialize()
</script>
```

3. You are done!

## CSS

You can also style the quiz, it uses css classes

| Element            | Class    |
| ------------------ | -------- |
| the whole question | question |
| all of the answers | answers  |
| the answer         | answer   |
