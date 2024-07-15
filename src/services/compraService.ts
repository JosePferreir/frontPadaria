import { Compra } from "@/model/Compra";
import api from "./api";
import { DetalhesCompraProduto } from "@/model/DetalhesCompraProduto";
import { DetalhesCompraMP } from "@/model/DetalhesCompraMP";

const getAllCompras = async () => {
    try {
        const response = await api.get('/compra/all');
        const compraList = response.data.map((item: any) => Compra.fromDTO(item));
        return compraList;
    } catch (error) {
        console.error('Erro ao buscar compras:', error);
        throw error;
    }
}

const getDetailsProduto = async (id: number) => {
    try {
        const response = await api.get(`compra/produto/detalhes/${id}`);
        const detalhesCompraProduto = response.data.map((item:any)=> DetalhesCompraProduto.fromDTO(item));
        return detalhesCompraProduto;
    } catch (error) {
        console.error('Erro ao buscar detalhes do produto:', error);
        throw error;
    }
}

const getDetailsMP = async (id: number) => {
    try {
        const response = await api.get(`compra/mp/detalhes/${id}`);
        const detalhesCompraMP = response.data.map((item:any)=> DetalhesCompraMP.fromDTO(item));
        return detalhesCompraMP;
    } catch (error) {
        console.error('Erro ao buscar detalhes da matéria-prima:', error);
        throw error;
    }
}
export {
    getAllCompras,
    getDetailsProduto,
    getDetailsMP
}