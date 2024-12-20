import { Body, Controller, Get, Inject, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { IPagamentoUseCase } from "../../domain/use-cases/pagamento-use-case.interface";
import { CreatePagamentoInput } from "../../interface-adapters/presenters/api-model/inputs/create-pagamento.input";

@ApiTags('Pagamento')
@Controller('pagamentos')
export class PagamentoController{
    constructor(
        @Inject(IPagamentoUseCase)
        private readonly pagamentoUseCase: IPagamentoUseCase) { }

    @Post()
    async createPagamento(@Body() input: CreatePagamentoInput): Promise<string> {
        const pagamento = this.pagamentoUseCase.create(input.clienteId, input.pedidoId, input.tipoPagamento)
        return pagamento.id
    }

    @Get()
    async health(): Promise<String> {
        return "Ok"
    }
}