import { Item } from "aws-sdk/clients/simpledb";
import { IDynamoDbRepository } from "./dynamodb-repository.interface";
import { PutItemInputAttributeMap } from "aws-sdk/clients/dynamodb";
import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, GetCommand, PutCommand, UpdateCommand } from "@aws-sdk/lib-dynamodb";
import { fromTokenFile } from "@aws-sdk/credential-providers";


/*
  ** to localstack testes **
  const dynamoDbConfig: AWS.DynamoDB.DocumentClient.DocumentClientOptions & AWS.DynamoDB.ClientConfiguration = {
  endpoint: 'http://localhost:4566',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'test',  
    secretAccessKey: 'test'
  }
};
  const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoDbConfig);
*/


export class DynamoDbRepository implements IDynamoDbRepository{
  
  private readonly tableName = "pagamentos";
  private readonly dynamoDb: DynamoDBDocumentClient;

  constructor() {
    console.log('incializando configuração do dynamo')
    const client = new DynamoDBClient({
      region: 'us-east-1',
      credentials: fromTokenFile({
        roleArn: process.env.AWS_ROLE_ARN,
        webIdentityTokenFile: process.env.AWS_WEB_IDENTITY_TOKEN_FILE
      })
    });
    this.dynamoDb = DynamoDBDocumentClient.from(client);

    console.log(this.dynamoDb.config.credentials);
  }  
  

    async create(item: PutItemInputAttributeMap): Promise<void> {
      console.log('create method called')
      const command = new PutCommand({
        TableName: this.tableName,
        Item: item,
      });
      await this.dynamoDb.send(command);
    }
 
    async read(id: string): Promise<Item | null> {
      const command = new GetCommand({
        TableName: this.tableName,
        Key: { id },
      });
      const result = await this.dynamoDb.send(command);
      return result.Item as Item || null;
    }

    async update(id: string, attributes: Partial<Item>): Promise<void> {
      const updateExpression = 'set ' + Object.keys(attributes).map((key, index) => `#${key} = :val${index}`).join(', ');
      const expressionAttributeNames = Object.keys(attributes).reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {});
      const expressionAttributeValues = Object.values(attributes).reduce((acc, val, index) => ({ ...acc, [`:val${index}`]: val }), {});
  
      const command = new UpdateCommand({
        TableName: this.tableName,
        Key: { id },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
      });
      await this.dynamoDb.send(command);
    }
  }