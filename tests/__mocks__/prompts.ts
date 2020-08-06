const answers: Record<any, any> = {}

const prompts = async (question: {
  type: string
  name: string
  message: string
}) => ({
  [question.name]: answers[question.name],
})

prompts.setAnswer = (name: string, value: any) => {
  answers[name] = value
}

module.exports = prompts
