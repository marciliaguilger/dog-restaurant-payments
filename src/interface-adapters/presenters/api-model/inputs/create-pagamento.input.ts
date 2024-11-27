import { TipoPagamento } from "src/domain/value-objects/tipo-pagamento"

export class CreatePagamentoInput {
    clienteId: string
    pedidoId: string
    valor: number
    tipoPagamento: TipoPagamento
}