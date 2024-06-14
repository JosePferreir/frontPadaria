import { MateriaPrima } from './MateriaPrima';

export class ProdutoMP {
    id: number | undefined;
    materiaPrima: MateriaPrima;
    quantidade: number;

    constructor(
        materiaPrima: MateriaPrima,
        quantidade: number = 0,
        id?: number
    ) {
        this.id = id;
        this.materiaPrima = materiaPrima;
        this.quantidade = quantidade;
    }

    static fromDTO(dto: any): ProdutoMP {
        return new ProdutoMP(
            MateriaPrima.fromDTO(dto.materiaPrima),
            dto.quantidade,
            dto.id
        );
    }
}