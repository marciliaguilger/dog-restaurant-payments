import { randomUUID, UUID } from "crypto";
import { IAggregateRoot } from "../base/aggregate-root.interface";
import { StatusPagamento } from "../value-objects/status-pagamento";
import { TipoPagamento } from "../value-objects/tipo-pagamento";

export class Pagamento implements IAggregateRoot {
    private _pagamentoId: UUID ;
    private _clienteId: string;
    private _pedidoId: string;
    private _tipoPagamento: TipoPagamento;
    private _codigoPagamento?: string;
    private _statusPagamento: StatusPagamento;    
    private _dataUltimaAtualizacao: Date;

    constructor(clienteId: string, pedidoId: string, tipoPagamento: TipoPagamento) {
        this._clienteId = clienteId;
        this._pedidoId = pedidoId;
        this._tipoPagamento = tipoPagamento;
    }

    setPagamento(pagamentoId: UUID, status: StatusPagamento, dataUltimaAtualizacao: Date): Pagamento {
        this._pagamentoId = pagamentoId
        this._statusPagamento = status
        this._dataUltimaAtualizacao = dataUltimaAtualizacao
        
        return this;
    } 

    get status(): StatusPagamento { 
        return this._statusPagamento
    }

    get id(): string {
        return this._pagamentoId.toString();
    }

    get clienteId(): string {
        return this._clienteId;
    }

    get pedidoId(): string {
        return this._pedidoId;
    }

    get tipoPagamento(): TipoPagamento {
        return this._tipoPagamento;
    }

    get codigoPagamento(): string | undefined {
        return this._codigoPagamento;
    }

    get dataUltimaAtualizacao(): Date {
        return this._dataUltimaAtualizacao;
    }

    criarNovoPagamento(codigoPagamento: string) {
        this._pagamentoId = randomUUID()
        this._statusPagamento = StatusPagamento.Criado;
        this._dataUltimaAtualizacao = new Date();
        this._codigoPagamento = codigoPagamento;
    }

    cancelarPagamento(): StatusPagamento {
        if (this._statusPagamento === StatusPagamento.Criado) {
            this._statusPagamento = StatusPagamento.Cancelado;
            return this._statusPagamento;
        }
        throw new Error(`Status do pagamento ${this._statusPagamento} não permite cancelamento`);
    }

    aprovarPagamento(): StatusPagamento {
        if (this._statusPagamento === StatusPagamento.Criado) {
            this._statusPagamento = StatusPagamento.Aprovado;
            this._dataUltimaAtualizacao = new Date();
            return this._statusPagamento;
        }
        throw new Error(`Status do pagamento ${this._statusPagamento} não permite aprovação `);
    }


}
