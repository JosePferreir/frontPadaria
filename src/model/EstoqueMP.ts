import { MateriaPrima } from './MateriaPrima';

export class EstoqueMP {
    id: number | undefined;
    materiaPrima: MateriaPrima | undefined;
    validade: Date;
    quantidade: number;
    quantidadeUnidade: number;
    totalUnidadeUtilizada: number;
    valor: number;

    constructor(
        validade: Date = new Date(),
        quantidade: number = 0,
        quantidadeUnidade: number = 0,
        totalUnidadeUtilizada: number = 0,
        valor: number = 0,
        materiaPrima?: MateriaPrima,
        id?: number,
    ) {
        this.id = id;
        this.materiaPrima = materiaPrima;
        this.validade = validade;
        this.quantidade = quantidade;
        this.quantidadeUnidade = quantidadeUnidade;
        this.totalUnidadeUtilizada = totalUnidadeUtilizada;
        this.valor = valor;
    }

    static fromDTO(dto: any): EstoqueMP {
        return new EstoqueMP(
            new Date(dto.validade),
            dto.quantidade,
            dto.quantidadeUnidade,
            dto.totalUnidadeUtilizada,
            dto.valor,
            dto.materiaPrima ? MateriaPrima.fromDTO(dto.materiaPrima) : undefined,
            dto.id
        );
    }
}