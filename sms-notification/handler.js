import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT;
const authToken = process.env.TWILIO_API_KEY;

const client = twilio(accountSid, authToken);


const send = async (event) => {
  const smsPromise = []
  for (const record of event.Records) {
    const message =  JSON.parse(record.body).Message
    
    smsPromise.push(  
      client.messages.create({
         body: message,
         from: process.env.PHONE_FROM,
         to: process.env.PHONE_TO
       })

    )
  
  }

    await Promise.all(smsPromise)
};

export {send}