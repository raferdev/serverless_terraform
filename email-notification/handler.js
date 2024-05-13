import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_SERVER,
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_FROM,
    pass: process.env.EMAIL_FROM_PASSWORD,
  },
});
console.log(process.env.EMAIL_FROM, process.env.EMAIL_FROM_PASSWORD, process.env.EMAIL_TO, process.env.SMTP_SERVER)

const send = async (event) => {
  const emailPromises = []
  for (const record of event.Records) {
   const message =  JSON.parse(record.body).Message

 emailPromises.push(  transporter.sendMail({
    from: `"Bookings 👻" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO, 
    subject: "Booking confirmed ✔", 
    text: message,
    html: message,
  }))
  }
  await Promise.all(emailPromises)  
  console.log('Emails sent')
}

export {send}