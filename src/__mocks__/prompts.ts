const answers: Record<string, any> = {};

interface Prompts {
  (question: {
    type: string;
    name: string;
    message: string;
  }): Promise<Record<string, any>>;
  setAnswer: (name: string, value: any) => void;
}

const prompts = (async (question: { name: string }) => ({
  [question.name]: answers[question.name],
})) as unknown as Prompts;

prompts.setAnswer = (name: string, value: any) => {
  answers[name] = value;
};

export default prompts;
