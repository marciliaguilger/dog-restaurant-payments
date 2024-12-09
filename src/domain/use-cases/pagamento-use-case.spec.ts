import { Test, TestingModule } from "@nestjs/testing"
import { PagamentoUseCase } from "./pagamento-use-case.service"
import { IPagamentoGateway } from "../ports/pagamento-gateway.interface";
import { Pagamento } from "../entities/pagamento.entity";
import { TipoPagamento } from "../value-objects/tipo-pagamento";
import { StatusPagamento } from "../value-objects/status-pagamento";
import { randomUUID } from "crypto";

describe('PagamentoUseCase', () => {
    let service: PagamentoUseCase;
    let mockPagamentoGateway: jest.Mocked<IPagamentoGateway>;

    beforeEach(async () => {
        mockPagamentoGateway = {
            save: jest.fn(),
            findById: jest.fn(),
        } as unknown as jest.Mocked<IPagamentoGateway>;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PagamentoUseCase,
                {
                    provide: IPagamentoGateway,
                    useValue: mockPagamentoGateway
                },
            ],
        }).compile();

        service = module.get<PagamentoUseCase>(PagamentoUseCase);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a pagamento and save it', () => {
            const clienteId = '123';
            const pedidoId = '123';
            const tipoPagamento = TipoPagamento.Pix;

            const pagamento = service.create(clienteId, pedidoId, tipoPagamento);

            expect(mockPagamentoGateway.save).toHaveBeenCalledWith(expect.any(Pagamento));
            expect(pagamento).toBeInstanceOf(Pagamento);
            expect(pagamento.clienteId).toBe(clienteId);
            expect(pagamento.pedidoId).toBe(pedidoId);
            expect(pagamento.tipoPagamento).toBe(tipoPagamento);
        });
    });

    describe('cancelar', () => {
        it('should cancel a pagamento and update its status', async () => {
            const pagamento = new Pagamento('123', '123', TipoPagamento.Pix);
            pagamento.criarNovoPagamento(randomUUID());
            mockPagamentoGateway.findById.mockResolvedValue(pagamento);

            const status = await service.cancelar(pagamento.id as any);

            expect(status).toBe(StatusPagamento.Cancelado);
            expect(mockPagamentoGateway.save).toHaveBeenCalledWith(expect.any(Pagamento));
        });
    });

    describe('aprovar', () => {
        it('should approve a pagamento and update its status', async () => {
            const pagamento = new Pagamento('123', '123', TipoPagamento.Pix);
            pagamento.criarNovoPagamento(randomUUID());
            mockPagamentoGateway.findById.mockResolvedValue(pagamento);

            const status = await service.aprovar(pagamento.id as any);

            expect(status).toBe(StatusPagamento.Aprovado);
            expect(mockPagamentoGateway.save).toHaveBeenCalledWith(expect.any(Pagamento));
        });
    });

});