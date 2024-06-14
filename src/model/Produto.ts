import { ProdutoMP } from "./ProdutoMP";

export class Produto {
    id: number | undefined;
    nome: string;
    unidadeUtilizada: string;
    ativo: boolean;
    produtoMp: ProdutoMP[];

    constructor(
        nome: string = '',
        unidadeUtilizada: string = '',
        ativo: boolean = true,
        produtoMp: ProdutoMP[] = [],
        id?: number
    ) {
        this.id = id;
        this.nome = nome;
        this.unidadeUtilizada = unidadeUtilizada;
        this.ativo = ativo;
        this.produtoMp = produtoMp;
    }

    static fromDTO(dto: any): Produto {
        return new Produto(
            dto.nome,
            dto.unidadeUtilizada,
            dto.ativo,
            dto.produtoMp ? dto.produtoMp.map((mp: any) => ProdutoMP.fromDTO(mp)) : [],
            dto.id
        );
    }
}