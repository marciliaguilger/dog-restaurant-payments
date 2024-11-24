import { Inject } from "@nestjs/common";
import { UUID } from "crypto";
import { IPagamentoRepository } from "src/domain/ports/pagamento-repository.interface";
import { IDynamoDbRepository } from "./dynamodb-repository.interface";
import { PagamentoModel } from "src/interface-adapters/presenters/db-model/pagamento.model";
import { Item } from "aws-sdk/clients/simpledb";

export class PagamentoRepository implements IPagamentoRepository {
    constructor(
        @Inject(IDynamoDbRepository)
        private readonly db: IDynamoDbRepository,
    ){}

    async save(pagamento: PagamentoModel) {
        const item = convertPagamentoEntityToDynamoItem(pagamento);
        this.db.create(item)
    }

    async findById(pagamentoId: UUID): Promise<PagamentoModel> {
        const item = await this.db.read(pagamentoId)
        return convertDynamoItemToModel(item)
    }

}

const convertPagamentoEntityToDynamoItem = (pagamento: PagamentoModel): AWS.DynamoDB.DocumentClient.PutItemInputAttributeMap => {
    return {
        id: pagamento.id,
        clienteId: pagamento.clienteId,
        pedidoId: pagamento.pedidoId,
        tipoPagamento: pagamento.tipoPagamento.toString(),
        codigoPagamento: pagamento.codigoPagamento,
        statusPagamento: pagamento.status.toString(),
        dataUltimaAtualizacao: pagamento.dataUltimaAtualizacao.toISOString(),
    };
};


const convertDynamoItemToModel = (dynamoItem: Item): PagamentoModel => {
    return {
        id: dynamoItem.Attributes['id'],
        clienteId: dynamoItem.Attributes['clienteId'],
        pedidoId: dynamoItem.Attributes['pedidoId'],
        tipoPagamento: dynamoItem.Attributes['tipoPagamento'],
        codigoPagamento: dynamoItem.Attributes['codigoPagamento'],
        status:dynamoItem.Attributes['statusPagamento'],
        dataUltimaAtualizacao: new Date(dynamoItem.Attributes['dataUltimaAtualizacao'])
    }
};  