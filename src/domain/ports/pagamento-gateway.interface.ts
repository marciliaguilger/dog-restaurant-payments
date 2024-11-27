import { UUID } from "crypto"
import { Pagamento } from "../entities/pagamento.entity"

export interface IPagamentoGateway {
    save(pagamento: Pagamento)
    findById(pagamentoId: UUID): Promise<Pagamento>
}


export const IPagamentoGateway= Symbol('IPagamentoGateway')