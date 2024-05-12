import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { QueryCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const login = async (event) => {
    const body = JSON.parse(event.body);

    const command = new QueryCommand({
        TableName: process.env.DYNAMODB_USERS,
        IndexName: process.env.EMAIL_GSI,
        KeyConditionExpression: "email = :email",
        ExpressionAttributeValues: {
            ":email": body.email
        }
    });

    const data = await docClient.send(command);
    const user = data.Items[0]; 
    
    if (user) {
        if(bcrypt.compareSync(body.password, user.password)) {
            delete user.password
            return {
                statusCode: 200,
                body: JSON.stringify({
                    token: jwt.sign(user, process.env.JWT_SECRET) })
            }
        }

        return {
                statusCode: 401,
                body: JSON.stringify({
                    message: 'Invalid credentials'
                })
        }
    }
    
    return {
        statusCode: 401,
        body: JSON.stringify({
            message: 'Invalid credentials'
        })
    }
}

export { login }