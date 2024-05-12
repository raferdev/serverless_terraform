'use strict';

import {v4 as uuid} from 'uuid'
import bcrypt from 'bcryptjs'
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { PutCommand, DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const register = async (event) => {
  const body = JSON.parse(event.body);

  const command = new PutCommand({
    TableName: process.env.DYNAMODB_USERS,
    Item: {
      id: uuid(),
      name: body.name,
      email: body.email,
      password: bcrypt.hashSync(body.password, 10),
    },
  });

  const response = await docClient.send(command);
  return response
};

export {register}