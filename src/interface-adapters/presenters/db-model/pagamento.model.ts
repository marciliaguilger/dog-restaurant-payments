import { UUID } from "crypto";
import { StatusPagamento } from "src/domain/value-objects/status-pagamento";
import { TipoPagamento } from "src/domain/value-objects/tipo-pagamento";

export interface PagamentoModel {
    id: UUID ;
    clienteId: string;
    pedidoId: string;
    tipoPagamento: TipoPagamento;
    codigoPagamento?: string;
    status: StatusPagamento;    
    dataUltimaAtualizacao: Date;
}