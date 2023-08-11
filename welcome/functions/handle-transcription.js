const axios = require("axios");

exports.handler = async function(context, event, callback) {
  const text = event.TranscriptionText;
  console.log(`The transcription: ${text}`);
  const response = await axios.post("https://superclass-song-suggestor-8505.twil.io/suggest", {
    Text: text
  });
	const twiml = new Twilio.twiml.VoiceResponse();
  twiml.say('Based on what you requested...');
  twiml.say(response.data.message);
  twiml.play(response.data.song);
  console.log(`TwiML ${twiml}`);
  const client = context.getTwilioClient();
  const call = await client.calls.create({
    to: event.From,
    from: "+17078737252",
    twiml: twiml.toString()
  });
  console.log(`Call was ${call.sid}`);
  return callback(null);
};