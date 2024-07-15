export class Compra {
    id: number | undefined;
    valorTotal: number;
    tipoCompra: string;
    data: Date;

    constructor(
        valorTotal: number,
        tipoCompra: string,
        data: Date,
        id?: number
    ) {
        this.id = id;
        this.valorTotal = valorTotal;
        this.tipoCompra = tipoCompra;
        this.data = data;
    }

    static fromDTO(dto: any): Compra {
        return new Compra(
            dto.valorTotal,
            dto.tipoCompra,
            new Date(dto.data),
            dto.id
        );
    }
}