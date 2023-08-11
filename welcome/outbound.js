const Twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;

const client = new Twilio(accountSid, authToken);

client.calls.create({
  to: process.env.CRAIGS_PHONE,
  from: "+17078737252",
  twiml: `
  <Response>
    <Say voice="Polly.Joey-Neural">This is your child's school calling, it is closed today. Give them a new video game.</Say>
  </Response>
  `
}).then((call) => console.log(`Call ${call.sid} was created`));