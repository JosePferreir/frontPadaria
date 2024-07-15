import { Produto } from './Produto';

export class EstoqueProduto {
    id: number | undefined;
    produto: Produto | undefined;
    validade: Date;
    quantidade: number;
    dataCriacao: Date;
    valor: number;

    constructor(
        validade: Date = new Date(),
        quantidade: number = 0,
        dataCriacao: Date = new Date(),
        produto?: Produto,
        id?: number,
        valor: number = 0
    ) {
        this.id = id;
        this.produto = produto;
        this.validade = validade;
        this.quantidade = quantidade;
        this.dataCriacao = dataCriacao;
        this.valor = valor;
    }

    static fromDTO(dto: any): EstoqueProduto {
        return new EstoqueProduto(
            new Date(dto.validade),
            dto.quantidade,
            dto.dataCriacao ? new Date(dto.dataCriacao) : new Date(),
            dto.produto ? Produto.fromDTO(dto.produto) : undefined,
            dto.id,
            dto.valor
        );
    }
}