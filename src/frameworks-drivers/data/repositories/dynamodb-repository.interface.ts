import { PutItemInputAttributeMap } from "aws-sdk/clients/dynamodb";
import { Item } from "aws-sdk/clients/simpledb";

export interface IDynamoDbRepository {
    create(item: PutItemInputAttributeMap): Promise<void> 
    read(id: string): Promise<Item | null>
    update(id: string, attributes: Partial<Item>): Promise<void>
}

export const IDynamoDbRepository = Symbol('IDynamoDbRepository')