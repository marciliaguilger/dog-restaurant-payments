import { Test, TestingModule } from '@nestjs/testing';
import { PagamentoController } from './pagamento.controller';
import { IPagamentoUseCase } from '../../domain/use-cases/pagamento-use-case.interface';
import { CreatePagamentoInput } from '../../interface-adapters/presenters/api-model/inputs/create-pagamento.input';
import { TipoPagamento } from '../../domain/value-objects/tipo-pagamento';
import { Pagamento } from '../../domain/entities/pagamento.entity';

describe('PagamentoController', () => {
  let pagamentoController: PagamentoController;
  let pagamentoUseCaseMock: jest.Mocked<IPagamentoUseCase>;

  beforeEach(async () => {
    pagamentoUseCaseMock = {
      create: jest.fn() as jest.MockedFunction<typeof pagamentoUseCaseMock.create>,
      cancelar: jest.fn(),
      aprovar: jest.fn()
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [PagamentoController],
      providers: [
        {
          provide: IPagamentoUseCase,
          useValue: pagamentoUseCaseMock,
        },
      ],
    }).compile();

    pagamentoController = module.get<PagamentoController>(PagamentoController);
  });

  describe('createPagamento', () => {
    it('should create a pagamento and return its id', async () => {
      const input: CreatePagamentoInput = {
        clienteId: 'client-123',
        pedidoId: 'order-123',
        valor: 100,
        tipoPagamento: TipoPagamento.Cartao,
      };

      const pagamentoEntity = new Pagamento(input.clienteId, input.pedidoId, input.tipoPagamento);
      pagamentoEntity.criarNovoPagamento('codigo123');

      pagamentoUseCaseMock.create = jest.fn().mockResolvedValue(pagamentoEntity as Pagamento);

      const id = await pagamentoController.createPagamento(input);

      expect(pagamentoUseCaseMock.create).toHaveBeenCalledWith(
        input.clienteId,
        input.pedidoId,
        input.tipoPagamento
      );
    });
  });

  describe('health', () => {
    it('should return "Ok"', async () => {
      const result = await pagamentoController.health();
      expect(result).toEqual('Ok');
    });
  });
});