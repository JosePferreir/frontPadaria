import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, IconButton, MenuItem } from '@mui/material';
import { Produto } from '@/model/Produto'; // Ajuste o caminho conforme necessário
import { editProduto, getProdutoMPbyId, saveProduto } from '@/services/produtoService'; // Ajuste o caminho conforme necessário
import { MateriaPrima } from '@/model/MateriaPrima';
import { getAllMp, getAllMpAtivos } from '@/services/materiaPrimaService';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { ProdutoMP } from '@/model/ProdutoMP';
import { get } from 'http';

interface ModalGerenciarProdutoProps {
    open: boolean;
    onClose: () => void;
    item: Produto | null;
}

const ModalGerenciarProduto: React.FC<ModalGerenciarProdutoProps> = ({ open, onClose, item }) => {
    const [produto, setProduto] = useState<Produto>(new Produto());
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [materiaPrimaList, setMateriaPrimaList] = useState<MateriaPrima[]>([]);
    const [isEdit, setIsEdit] = useState(false);

    useEffect(() => {
        const fetchProdutoMP = async (id: number) => {
            const result = await getProdutoMPbyId(id);
            setProduto(prevState => ({ ...prevState, produtoMp: result }));
        };
        if (item) {
            setProduto(item);
            fetchProdutoMP(item.id!);
            setIsEdit(true);
        } else {
            setProduto(new Produto());
        }
        const fetchData = async () => {
            const result = await getAllMpAtivos();
            setMateriaPrimaList(result);
        };
        fetchData();
    }, [item]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setProduto(prevState => ({
            ...prevState,
            [name]: value
        }));

        if (value) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[name];
                return newErrors;
            });
        }
    };

    const handleAddProdutoMP = () => {
        setProduto(prevState => ({
            ...prevState,
            produtoMp: [...prevState.produtoMp, new ProdutoMP(new MateriaPrima(), 0)]
        }));
    };

    const handleRemoveProdutoMP = (index: number) => {
        const updatedProdutoMp = produto.produtoMp.filter((_, i) => i !== index);
        setProduto(prevState => ({
            ...prevState,
            produtoMp: updatedProdutoMp
        }));
    };

    const handleMateriaPrimaChange = (index: number) => (event: React.ChangeEvent<{ value: string }>) => {
        const { value } = event.target;
        const updatedProdutoMp = [...produto.produtoMp];
        const materiaPrima = materiaPrimaList.find(mp => mp.id === parseInt(value));
        if (materiaPrima) {
            updatedProdutoMp[index].materiaPrima = materiaPrima;
            setProduto(prevState => ({ ...prevState, produtoMp: updatedProdutoMp }));
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[`materiaPrima_${index}`];
                return newErrors;
            });
        }
    };

    const handleQuantidadeChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value } = event.target;
        const updatedProdutoMp = [...produto.produtoMp];
        updatedProdutoMp[index].quantidade = parseInt(value);
        setProduto(prevState => ({ ...prevState, produtoMp: updatedProdutoMp }));

        if (value) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors[`quantidade_${index}`];
                return newErrors;
            });
        }
    };


    const validate = () => {
        let tempErrors: { [key: string]: string } = {};
        if (!produto.nome) tempErrors.nome = 'Nome é obrigatório';
        if (!produto.unidadeUtilizada) tempErrors.unidadeUtilizada = 'Unidade utilizada é obrigatória';

        produto.produtoMp.forEach((item, index) => {
            if (!item.materiaPrima.id) tempErrors[`materiaPrima_${index}`] = 'Matéria-prima é obrigatória';
            if (!item.quantidade) tempErrors[`quantidade_${index}`] = 'Quantidade é obrigatória';
        });

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async () => {
        console.log("Produto to save:", produto)
        if (validate()) {
            if (isEdit) {
                await editProduto(produto);
            } else {
                await saveProduto(produto);
            }
            setIsEdit(false);
            onClose();
            setProduto(new Produto());
        }
    };

    const handleClose = () => {
        onClose();
        setIsEdit(false);
        setProduto(new Produto());
    }

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
            <DialogTitle component="div">
                <Typography variant="h6" align="center">
                    {produto.id ? `Editar Produto ${produto.nome}` : 'Novo Produto'}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                    <TextField
                        label="Nome"
                        name="nome"
                        value={produto.nome}
                        onChange={handleChange}
                        error={!!errors.nome}
                        helperText={errors.nome}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Unidade Utilizada"
                        name="unidadeUtilizada"
                        value={produto.unidadeUtilizada}
                        onChange={handleChange}
                        error={!!errors.unidadeUtilizada}
                        helperText={errors.unidadeUtilizada}
                        fullWidth
                        required
                    />
                    <Typography variant="h6" align="center">
                        Matérias-primas
                    </Typography>
                    {produto.produtoMp && produto.produtoMp.map((item: ProdutoMP, index: number) => (
                        <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <TextField
                                select
                                label="Matéria-prima"
                                name={`materiaPrima_${index}`}
                                value={item.materiaPrima.id}
                                onChange={handleMateriaPrimaChange(index)}
                                error={!!errors[`materiaPrima_${index}`]}
                                helperText={errors[`materiaPrima_${index}`]}
                                fullWidth
                                required
                            >
                                {materiaPrimaList.map((mp) => (
                                    <MenuItem key={mp.id} value={mp.id}>
                                        {mp.descricao}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <TextField
                                type="number"
                                label="Quantidade"
                                name={`quantidade_${index}`}
                                value={item.quantidade.toString()}
                                onChange={handleQuantidadeChange(index)}
                                error={!!errors[`quantidade_${index}`]}
                                helperText={errors[`quantidade_${index}`]}
                                fullWidth
                                required
                            />
                            <IconButton aria-label="remove" color="error" onClick={() => handleRemoveProdutoMP(index)}>
                                <HighlightOffOutlinedIcon />
                            </IconButton>
                        </Box>
                    ))}
                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <IconButton aria-label="add" color="warning" onClick={handleAddProdutoMP}>
                            <AddCircleOutlineOutlinedIcon />
                        </IconButton>
                    </Box>
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-around' }}>
                <Button variant="contained" onClick={handleClose} color="error">Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit} color="success">{isEdit ? 'Editar' : 'Salvar'}</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalGerenciarProduto;