let answer: boolean = false

const prompts = async (question: {
  type: string,
  name: string,
  message: string,
}) => ({[question.name]: answer})

prompts.setAnswer = (val: boolean) => {
  answer = val
}

module.exports = prompts
