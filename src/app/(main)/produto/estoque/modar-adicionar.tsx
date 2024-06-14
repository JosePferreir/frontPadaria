import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, IconButton, MenuItem, FormControl, InputLabel, Select, SelectChangeEvent } from '@mui/material';
import { Produto } from '@/model/Produto'; // Ajuste o caminho conforme necessário
import { editProduto, getAllProdutosAtivos, getProdutoMPbyId, saveEstoqueProduto } from '@/services/produtoService'; // Ajuste o caminho conforme necessário
import { MateriaPrima } from '@/model/MateriaPrima';
import { getAllMp, getAllMpAtivos } from '@/services/materiaPrimaService';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import HighlightOffOutlinedIcon from '@mui/icons-material/HighlightOffOutlined';
import { ProdutoMP } from '@/model/ProdutoMP';
import { get } from 'http';
import { EstoqueProduto } from '@/model/EstoqueProduto';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

interface ModalEstoqueProdutoProps {
    open: boolean;
    onClose: () => void;
}

const ModalEstoqueProduto: React.FC<ModalEstoqueProdutoProps> = ({ open, onClose}) => {
    const [produto, setProduto] = useState<Produto>(new Produto());
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [materiaPrimaList, setMateriaPrimaList] = useState<MateriaPrima[]>([]);
    const [isEdit, setIsEdit] = useState(false);
    const [produtosAtivos, setProdutosAtivos] = useState<Produto[]>([]);
    const [estoqueProduto, setEstoqueProduto] = useState<EstoqueProduto>(new EstoqueProduto)
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState<'success' | 'error'>('success');
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllProdutosAtivos();
            setProdutosAtivos(result);
        };
        fetchData();
    }, []);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEstoqueProduto(prevState => ({
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

    const handleProdutoChange = (event: SelectChangeEvent<number>) => {
        const { value } = event.target;
        const selectedProduto = produtosAtivos.find(prod => prod.id === value);
        setEstoqueProduto(prevState => ({
            ...prevState,
            produto: selectedProduto || new Produto()
        }));

        if (value) {
            setErrors(prevErrors => {
                const newErrors = { ...prevErrors };
                delete newErrors['produto'];
                return newErrors;
            });
        }
    };



    const validate = () => {
        let tempErrors: { [key: string]: string } = {};
        if (!estoqueProduto.produto?.id) tempErrors.produto = 'Produto é obrigatório';
        if (!estoqueProduto.quantidade) tempErrors.quantidade = 'Quantidade é obrigatória';
        if (!estoqueProduto.validade) tempErrors.validade = 'Validade é obrigatória';
        if (!estoqueProduto.dataCriacao) tempErrors.dataCriacao = 'Data de criação é obrigatória';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validate()) {
            try {
                const message = await saveEstoqueProduto(estoqueProduto);
                setSnackbarMessage(message);
                setSnackbarSeverity('success');
                setIsEdit(false);
                onClose();
                setEstoqueProduto(new EstoqueProduto());
            } catch (error) {
                setSnackbarMessage(error.response.data);
                setSnackbarSeverity('error');
            } finally {
                setSnackbarOpen(true);
            }
        }
    };

    const handleClose = () => {
        onClose();
        setIsEdit(false);
        setEstoqueProduto(new EstoqueProduto());
    }

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} maxWidth="lg">
            <DialogTitle component="div">
                <Typography variant="h6" align="center">
                    Produção
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                    <FormControl fullWidth required error={!!errors.produto}>
                        <InputLabel id="produto-label">Produto</InputLabel>
                        <Select
                            labelId="produto-label"
                            name="produto"
                            value={estoqueProduto.produto?.id || ''}
                            onChange={handleProdutoChange}
                            label="Produto"
                        >
                            {produtosAtivos.map((prod) => (
                                <MenuItem key={prod.id} value={prod.id}>
                                    {prod.nome}
                                </MenuItem>
                            ))}
                        </Select>
                        {errors.produto && <Typography color="error">{errors.produto}</Typography>}
                    </FormControl>
                    <TextField
                        label="Quantidade"
                        name="quantidade"
                        type="number"
                        value={estoqueProduto.quantidade}
                        onChange={handleChange}
                        error={!!errors.quantidade}
                        helperText={errors.quantidade}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Data criação"
                        name="dataCriacao"
                        type="date"
                        value={estoqueProduto.dataCriacao}
                        onChange={handleChange}
                        error={!!errors.dataCriacao}
                        helperText={errors.dataCriacao}
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                    <TextField
                        label="Validade"
                        name="validade"
                        type="date"
                        value={estoqueProduto.validade}
                        onChange={handleChange}
                        error={!!errors.validade}
                        helperText={errors.validade}
                        fullWidth
                        required
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-around' }}>
                <Button variant="contained" onClick={handleClose} color="error">Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit} color="success">{isEdit ? 'Editar' : 'Salvar'}</Button>
            </DialogActions>
            <Snackbar open={snackbarOpen} autoHideDuration={4000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Dialog>
    );
}

export default ModalEstoqueProduto;