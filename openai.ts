const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: 'sk-...',
});
const openai = new OpenAIApi(configuration);
const response = openai.createCompletion({
  model: "text-davinci-003",
  prompt: "Назови 5 хронических заболеваний. Только названия",
  max_tokens: 100,
  temperature: 0,
}).then((data) => console.log(data.data));