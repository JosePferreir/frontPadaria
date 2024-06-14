export class MateriaPrima {
    id: number | undefined;
    ativo: boolean;
    descricao: string;
    unidadeUtilizada: string;
    unidadeComprada: string;

    constructor(
        descricao: string = '',
        unidadeUtilizada: string = '',
        unidadeComprada: string = '',
        ativo: boolean = true,
        id?: number,
    ) {
        this.id = id;
        this.ativo = ativo;
        this.descricao = descricao;
        this.unidadeUtilizada = unidadeUtilizada;
        this.unidadeComprada = unidadeComprada;
    }

    static fromDTO(dto: any): MateriaPrima {
        return new MateriaPrima(
            dto.descricao,
            dto.unidadeUtilizada,
            dto.unidadeComprada,
            dto.ativo,
            dto.id
        );
    }
}