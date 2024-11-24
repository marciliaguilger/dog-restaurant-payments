import { UUID } from "crypto";
import { PagamentoModel } from "src/interface-adapters/presenters/db-model/pagamento.model";

export interface IPagamentoRepository {
    save(pagamento: PagamentoModel)
    findById(pagamentoId: UUID): Promise<PagamentoModel>
}

export const IPagamentoRepository = Symbol('IPagamentoRepository')