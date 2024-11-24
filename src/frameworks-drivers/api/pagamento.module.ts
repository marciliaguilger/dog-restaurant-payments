import { Module } from "@nestjs/common";
import { PagamentoController } from "./pagamento.controller";
import { PagamentoUseCase } from "src/domain/use-cases/pagamento-use-case.service";
import { IPagamentoUseCase } from "src/domain/use-cases/pagamento-use-case.interface";
import { IPagamentoGateway } from "src/domain/ports/pagamento-gateway.interface";
import { PagamentoGateway } from "src/interface-adapters/gateways/pagamento.gateway";
import { IPagamentoRepository } from "src/domain/ports/pagamento-repository.interface";
import { PagamentoRepository } from "../data/repositories/pagamento.repository";
import { DynamoDbRepository } from "../data/repositories/dynamodb.repository";
import { IDynamoDbRepository } from "../data/repositories/dynamodb-repository.interface";

@Module({
    imports: [],
    controllers: [PagamentoController],
    providers: [
        PagamentoUseCase,
        {
            provide: IPagamentoUseCase,
            useClass: PagamentoUseCase,
        },
        PagamentoGateway,
        {
            provide: IPagamentoGateway,
            useClass: PagamentoGateway,
        },
        PagamentoRepository,
        {
            provide: IPagamentoRepository,
            useClass: PagamentoRepository,
        },
        DynamoDbRepository,
        {
            provide: IDynamoDbRepository,
            useClass: DynamoDbRepository,
        }
    ],
})
export class PagamentoModule{}