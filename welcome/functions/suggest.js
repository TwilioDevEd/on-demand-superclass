const {stripIndents} = require("common-tags");
const { Configuration, OpenAIApi } = require("openai");

exports.handler = async function(context, event, callback) {
  const text = event.Text;
  const configuration = new Configuration({
    apiKey: context.OPENAI_API_KEY
  });

  const openai = new OpenAIApi(configuration);

  const prompt = stripIndents`
    You are able to extract sentiment from a statement and use it to suggest music.

    You should keep your responses short and succinct.

    You should preface your ideas with we instead of I.

    Below are some examples.

    Human: I have had a bad day and am really tired.
    AI: Because you are tired, we suggest some uplifiting pop music. This should get you going!

    Human: I want to relax and read a book.
    AI: We recommend classical music for times when you want to use your brain.

    Human: ${text}
    AI: `;
  console.log(`Prompting with ${text}`);
  const response = await openai.createCompletion({
    prompt,
    model: "text-davinci-003",
    temperature: 0.7, //A number between 0 and 1 that determines how many creative risks the engine takes when generating text.
    max_tokens: 300, // Maximum completion length.
  });
  return callback(null, {
    message: response.data.choices[0].text.trim(),
    // TODO: Maybe make this a Rick Roll?
    song: "https://twil.io/not-a-rick-roll"
  });
};