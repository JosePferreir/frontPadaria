import { EstoqueProduto } from '@/model/EstoqueProduto';
import api from './api';
import { Produto } from '@/model/Produto';

const getAllProdutos = async () => {
    try {
        const response = await api.get('/produto/all');
        const produtoList = response.data.map((item: any) => Produto.fromDTO(item));
        return produtoList;
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        throw error;
    }
}

const saveProduto = async (produto: Produto) => {
    try {
        const response = await api.post('/produto/save', produto);
        return response.data;
    } catch (error) {
        console.error('Erro ao salvar produto:', error);
        throw error;
    }
}

const inactivateProduto = async (id: number) => {
    try {
        const response = await api.put(`/produto/inactivate/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao inativar produto:', error);
        throw error;
    }
}

const getProdutoMPbyId = async (id: number) => {
    try {
        const response = await api.get(`/produto/produtoMp/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar produto MP:', error);
        throw error;
    }

}

const editProduto = async (produto: Produto) => {
    try {
        const response = await api.put(`/produto/update/${produto.id}`, produto);
        return response.data;
    } catch (error) {
        console.error('Erro ao editar produto:', error);
        throw error;
    }

}

const getAllProdutosAtivos = async (): Promise<Produto[]> => {
    try {
        const response = await api.get('/produto/all/ativos');
        const materiaPrimaList = response.data.map((item: any) => Produto.fromDTO(item));
        return materiaPrimaList;
    } catch (error) {
        console.error('Erro ao buscar matéria-prima:', error);
        throw error;
    }

}

const saveEstoqueProduto = async (estoqueProduto: EstoqueProduto): Promise<string> => {
    try {
        const response = await api.post('/estoque_produto/save', estoqueProduto);
        return response.data;
    } catch (error) {
        console.error('Erro ao salvar estoque produto:', error);
        throw error;
    }
}

const getAllEstoqueProduto = async () => {
    try {
        const response = await api.get('/estoque_produto/all');
        const EstoqueProdutoList = response.data.map((item: any) => EstoqueProduto.fromDTO(item));
        return EstoqueProdutoList;
    } catch (error) {
        console.error('Erro ao buscar estoque produto:', error);
        throw error;
    }

}

const saveCompraProduto = async (estoqueProdutoList: EstoqueProduto[]): Promise<string> => {
    try {
        const response = await api.post('/estoque_produto/save_compra', estoqueProdutoList);
        return response.data;
    } catch (error) {
        console.error('Erro ao salvar estoque produto:', error);
        throw error;
    }
}
const editEstoqueProduto = async (estoqueProduto: EstoqueProduto): Promise<string> => {
    try {
        const response = await api.put(`/estoque_produto/update/${estoqueProduto.id}`, estoqueProduto);
        return response.data;
    } catch (error) {
        console.error('Erro ao editar estoque produto:', error);
        throw error;
    }

}

export {
    getAllProdutos,
    saveProduto,
    inactivateProduto,
    getProdutoMPbyId,
    editProduto,
    getAllProdutosAtivos,
    saveEstoqueProduto,
    getAllEstoqueProduto,
    saveCompraProduto,
    editEstoqueProduto
}