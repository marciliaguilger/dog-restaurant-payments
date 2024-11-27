import AWS from "aws-sdk";
import { Item } from "aws-sdk/clients/simpledb";
import { IDynamoDbRepository } from "./dynamodb-repository.interface";
import { PutItemInputAttributeMap } from "aws-sdk/clients/dynamodb";

AWS.config.update({ region: 'us-east-1'});

/*const dynamoDbConfig: AWS.DynamoDB.DocumentClient.DocumentClientOptions & AWS.DynamoDB.ClientConfiguration = {
  endpoint: 'http://localhost:4566',
  region: 'us-east-1',
  credentials: {
    accessKeyId: 'test',  
    secretAccessKey: 'test'
  }
};*/


//const dynamoDb = new AWS.DynamoDB.DocumentClient(dynamoDbConfig);
const dynamoDb = new AWS.DynamoDB.DocumentClient();

export class DynamoDbRepository implements IDynamoDbRepository{
    private tableName = "pagamentos";

    async create(item: PutItemInputAttributeMap): Promise<void> {      
        await dynamoDb.put({
          TableName: this.tableName,
          Item: item,
        }).promise();
      }
 
      async read(id: string): Promise<Item | null> {
        const result = await dynamoDb.get({
          TableName: this.tableName,
          Key: { id },
        }).promise();
 
        return result.Item as Item || null;
      }

      async update(id: string, attributes: Partial<Item>): Promise<void> {
        const updateExpression = 'set ' + Object.keys(attributes).map((key, index) => `#${key} = :val${index}`).join(', ');
        const expressionAttributeNames = Object.keys(attributes).reduce((acc, key) => ({ ...acc, [`#${key}`]: key }), {});
        const expressionAttributeValues = Object.values(attributes).reduce((acc, val, index) => ({ ...acc, [`:val${index}`]: val }), {});
 
        await dynamoDb.update({
          TableName: this.tableName,
          Key: { id },
          UpdateExpression: updateExpression,
          ExpressionAttributeNames: expressionAttributeNames,
          ExpressionAttributeValues: expressionAttributeValues,
        }).promise();
      }

}