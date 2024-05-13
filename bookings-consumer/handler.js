import { unmarshall }  from "@aws-sdk/util-dynamodb"
import moment from 'moment'
import { SNSClient, PublishCommand } from "@aws-sdk/client-sns";

const client = new SNSClient()


const listen = async (event) =>
  {
  for (const record of event.Records) {
    const snsPromises = []
    const { eventName, dynamodb } = record;
    if (eventName === 'INSERT') {
      const { NewImage } = dynamodb;
      const booking = unmarshall(NewImage);
      const params = {
        TopicArn: process.env.SNS_NOTIFICATIONS_TOPIC,
        Message: `New booking on ${moment(booking.date).format('llll')}`,
      }
      const command = new PublishCommand(params)
      snsPromises.push(client.send(command))
    }
    await Promise.all(snsPromises)
    console.log('New bookings')

  }

};

export {listen}
