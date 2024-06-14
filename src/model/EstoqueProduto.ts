import { Produto } from './Produto';

export class EstoqueProduto {
    id: number | undefined;
    produto: Produto | undefined;
    validade: Date;
    quantidade: number;
    dataCriacao: Date;

    constructor(
        validade: Date = new Date(),
        quantidade: number = 0,
        dataCriacao: Date = new Date(),
        produto?: Produto,
        id?: number
    ) {
        this.id = id;
        this.produto = produto;
        this.validade = validade;
        this.quantidade = quantidade;
        this.dataCriacao = dataCriacao;
    }

    static fromDTO(dto: any): EstoqueProduto {
        return new EstoqueProduto(
            new Date(dto.validade),
            dto.quantidade,
            dto.dataCriacao ? new Date(dto.dataCriacao) : new Date(),
            dto.produto ? Produto.fromDTO(dto.produto) : undefined,
            dto.id
        );
    }
}