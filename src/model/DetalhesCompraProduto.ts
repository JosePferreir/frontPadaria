export class DetalhesCompraProduto {
    produto: string;
    unidade: string;
    quantidade: number;
    valor: number;
    validade: Date;

    constructor(
        produto: string,
        unidade: string,
        quantidade: number,
        valor: number,
        validade: Date
    ) {
        this.produto = produto;
        this.unidade = unidade;
        this.quantidade = quantidade;
        this.valor = valor;
        this.validade = validade;
    }

    static fromDTO(dto: any): DetalhesCompraProduto {
        return new DetalhesCompraProduto(
            dto.produto,
            dto.unidade,
            dto.quantidade,
            dto.valor,
            new Date(dto.validade)
        );
    }
}