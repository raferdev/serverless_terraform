import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import {v4 as uuid} from 'uuid'

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);


const create = async (event) => {
  
    const body = JSON.parse(event.body);
    const command = new PutCommand({
      TableName: process.env.DYNAMODB_BOOKINGS,
      Item: {
        id: uuid(),
        date: body.date,
        user: event.requestContext.authorizer.lambda
      },
      
    });
  
    const response = await docClient.send(command);
    return response 
}

export { create }