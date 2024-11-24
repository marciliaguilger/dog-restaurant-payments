import { Test, TestingModule } from "@nestjs/testing"
import { PagamentoUseCase } from "./pagamento-use-case.service"
import { IPagamentoGateway } from "../ports/pagamento-gateway.interface";
import { Pagamento } from "../entities/pagamento.entity";
import { TipoPagamento } from "../value-objects/tipo-pagamento";

describe ('PagamentoUseCase', () => {
    let service: PagamentoUseCase
    let mockPagamentoGateway: Partial<IPagamentoGateway>;

    beforeEach(async() => {
        mockPagamentoGateway = {
            save: jest.fn().mockImplementation(()=> {
                return new Pagamento("123", "123", TipoPagamento.Pix, "123")
            }),
            findById: jest.fn(),
        }
        
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                PagamentoUseCase,
                {
                    provide: IPagamentoGateway,
                    useValue: mockPagamentoGateway
                },
        ]
        }).compile();
    
        service = module.get<PagamentoUseCase>(PagamentoUseCase);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
    
    
});

