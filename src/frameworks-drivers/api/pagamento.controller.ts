import { Body, Controller, Inject, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Pagamento } from "src/domain/entities/pagamento.entity";
import { IPagamentoUseCase } from "src/domain/use-cases/pagamento-use-case.interface";
import { CreatePagamentoInput } from "src/interface-adapters/presenters/api-model/inputs/create-pagamento.input";

@ApiTags('Pagamento')
@Controller('pagamentos')
export class PagamentoController{
    constructor(
        @Inject(IPagamentoUseCase)
        private readonly pagamentoUseCase: IPagamentoUseCase) { }

    @Post()
    async createPagamento(@Body() input: CreatePagamentoInput): Promise<Pagamento> {
        return this.pagamentoUseCase.create(input.clienteId, input.pedidoId, input.tipoPagamento)
    }
}