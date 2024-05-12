import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { ScanCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);


const list = async (event) => {

    if(event.requestContext.authorizer.lambda.role === "ADMIN"){

        const command = new ScanCommand({
            TableName: process.env.DYNAMODB_BOOKINGS,
          });
        
          const response = await docClient.send(command);
          return {
            statusCode: 200,
            body: JSON.stringify(response.Items)
          }

    }

    return {
        statusCode: 403,
        body: JSON.stringify({ message: "You are not authorized to perform this action." }),
    }
}

export { list }