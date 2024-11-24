import { UUID } from "crypto";
import { Pagamento } from "src/domain/entities/pagamento.entity";
import { IPagamentoGateway } from "src/domain/ports/pagamento-gateway.interface";
import { Inject } from "@nestjs/common";
import { IPagamentoRepository } from "src/domain/ports/pagamento-repository.interface";
import { StatusPagamento } from "src/domain/value-objects/status-pagamento";
import { TipoPagamento } from "src/domain/value-objects/tipo-pagamento";
import { PagamentoModel } from "../presenters/db-model/pagamento.model";

export class PagamentoGateway implements IPagamentoGateway {
    
    constructor(
    @Inject(IPagamentoRepository)
        private readonly repository: IPagamentoRepository
    ){}

    save(pagamento: Pagamento) {
        
        const pagamentoModel: PagamentoModel = {
            id: pagamento.id as UUID,
            clienteId: pagamento.clienteId,
            pedidoId: pagamento.pedidoId,
            tipoPagamento: pagamento.tipoPagamento as TipoPagamento,
            codigoPagamento: pagamento.codigoPagamento, 
            status: pagamento.status as StatusPagamento,
            dataUltimaAtualizacao: new Date(pagamento.dataUltimaAtualizacao), 
        };
        this.repository.save(pagamentoModel)
    }
    async findById(pagamentoId: UUID): Promise<Pagamento> {
        const model =  await this.repository.findById(pagamentoId)
        let pagamentoEntity = new Pagamento(model.clienteId, model.pedidoId,model.tipoPagamento)
        return pagamentoEntity.setPagamento(model.id, model.status, model.dataUltimaAtualizacao)
    }
}