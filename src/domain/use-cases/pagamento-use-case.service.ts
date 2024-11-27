import { randomUUID, UUID } from "crypto";
import { Pagamento } from "../entities/pagamento.entity";
import { StatusPagamento } from "../value-objects/status-pagamento";
import { TipoPagamento } from "../value-objects/tipo-pagamento";
import { IPagamentoUseCase } from "./pagamento-use-case.interface";
import { Inject, Injectable } from "@nestjs/common";
import { IPagamentoGateway } from "../ports/pagamento-gateway.interface";

@Injectable()
export class PagamentoUseCase implements IPagamentoUseCase {
    constructor(
        @Inject(IPagamentoGateway)
        private readonly pagamentoGateway: IPagamentoGateway) {}
    

    create(clienteId: string, pedidoId: string, tipoPagamento: TipoPagamento): Pagamento {
        let codigoPagamento = randomUUID().toString()
        let pagamentoEntity = new Pagamento(clienteId, pedidoId, tipoPagamento)
        pagamentoEntity.criarNovoPagamento(codigoPagamento)
        this.pagamentoGateway.save(pagamentoEntity)
        
        return pagamentoEntity
    }
    async cancelar(pagamentoId: UUID): Promise<StatusPagamento> {
        let pagamento = await this.pagamentoGateway.findById(pagamentoId)
        pagamento.cancelarPagamento()
        this.pagamentoGateway.save(pagamento)
        return pagamento.status
    }
    async aprovar(pagamentoId: UUID): Promise<StatusPagamento> {
        let pagamento = await this.pagamentoGateway.findById(pagamentoId)
        pagamento.aprovarPagamento()
        this.pagamentoGateway.save(pagamento)
        return pagamento.status
    }

}