import { MateriaPrima } from '@/model/MateriaPrima';
import api from './api';
import { EstoqueMP } from '@/model/EstoqueMP';

const getAllMp = async (): Promise<MateriaPrima[]> => {
    try {
        const response = await api.get('/materia_prima/all');
        const materiaPrimaList = response.data.map((item: any) => MateriaPrima.fromDTO(item));
        return materiaPrimaList;
    } catch (error) {
        console.error('Erro ao buscar matéria-prima:', error);
        throw error;
    }
}
const save = async (materiaPrima: MateriaPrima): Promise<any> => {
    try {
        const response = await api.post('/materia_prima/save', materiaPrima);
        return response.data;
    } catch (error) {
        console.error('Erro ao salvar matéria-prima:', error);
        throw error;
    }
}

const update = async (materiaPrima: MateriaPrima): Promise<any> => {
    try {
        const response = await api.put(`/materia_prima/update/${materiaPrima.id}`, materiaPrima);
        return response.data;
    } catch (error) {
        console.error('Erro ao atualizar matéria-prima:', error);
        throw error;
    }
}

const inactivate = async (id: number): Promise<any> => {
    try {
        const response = await api.put(`/materia_prima/inactivate/${id}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao inativar matéria-prima:', error);
        throw error;
    }
}
const getAllMpAtivos = async (): Promise<MateriaPrima[]> => {
    try {
        const response = await api.get('/materia_prima/all/ativos');
        const materiaPrimaList = response.data.map((item: any) => MateriaPrima.fromDTO(item));
        return materiaPrimaList;
    } catch (error) {
        console.error('Erro ao buscar matéria-prima:', error);
        throw error;
    }

}

const saveEstoqueMP = async (estoqueMPList: EstoqueMP[]): Promise<any> => {
    try {
        const response = await api.post('/estoque_mp/save', estoqueMPList);
        return response.data;
    } catch (error) {
        console.error('Erro ao salvar estoque de matéria-prima:', error);
        throw error;
    }
}

const getAllEstoqueMP = async (): Promise<EstoqueMP[]> => {
    try {
        const response = await api.get('/estoque_mp/all');
        const estoqueMPList = response.data.map((item: any) => EstoqueMP.fromDTO(item));
        return estoqueMPList;
    } catch (error) {
        console.error('Erro ao buscar estoque de matéria-prima:', error);
        throw error;
    }

}

const editEstoqueMP = async (estoqueMP: EstoqueMP): Promise<any> => {
    try {
        const response = await api.put(`/estoque_mp/update/${estoqueMP.id}`, estoqueMP);
        return response.data;
    } catch (error) {
        console.error('Erro ao editar estoque de matéria-prima:', error);
        throw error;
    }

}

export { getAllMp, save, update, inactivate, getAllMpAtivos, saveEstoqueMP, getAllEstoqueMP, editEstoqueMP };