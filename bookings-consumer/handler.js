import { unmarshall }  from "@aws-sdk/util-dynamodb"
import moment from 'moment'
const listen = async (event) => {

  for (const record of event.Records) {
    const { eventName, dynamodb } = record;
    if (eventName === 'INSERT') {
      const { NewImage } = dynamodb;
      const booking = unmarshall(NewImage);
      console.log('New booking', moment(booking.date).format('llll'));
    }
  }

};

export {listen}
