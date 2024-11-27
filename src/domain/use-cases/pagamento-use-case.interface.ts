import { UUID } from "crypto";
import { Pagamento } from "../entities/pagamento.entity";
import { TipoPagamento } from "../value-objects/tipo-pagamento";
import { StatusPagamento } from "../value-objects/status-pagamento";

export interface IPagamentoUseCase {
    create(clienteId: string, pedidoId: string, tipoPagamento: TipoPagamento): Pagamento
    cancelar(pagamentoId: UUID): Promise<StatusPagamento>
    aprovar(pagamentoId: UUID): Promise<StatusPagamento>
}

export const IPagamentoUseCase = Symbol('IPagamentoUseCase')