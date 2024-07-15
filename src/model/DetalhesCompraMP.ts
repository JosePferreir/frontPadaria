export class DetalhesCompraMP {
    materiaPrima: string;
    unidade: string;
    quantidadeUnidade: number;
    quantidade: number;
    validade: Date;
    valor: number;

    constructor(
        materiaPrima: string,
        unidade: string,
        quantidadeUnidade: number,
        quantidade: number,
        validade: Date,
        valor: number
    ) {
        this.materiaPrima = materiaPrima;
        this.unidade = unidade;
        this.quantidadeUnidade = quantidadeUnidade;
        this.quantidade = quantidade;
        this.validade = validade;
        this.valor = valor;
    }

    static fromDTO(dto: any): DetalhesCompraMP {
        return new DetalhesCompraMP(
            dto.materiaPrima,
            dto.unidade,
            dto.quantidadeUnidade,
            dto.quantidade,
            new Date(dto.validade),
            dto.valor
        );
    }
}