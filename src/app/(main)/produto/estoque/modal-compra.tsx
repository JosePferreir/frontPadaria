import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Badge, TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Produto } from '@/model/Produto'; // Ajuste o caminho conforme necessário
import { EstoqueProduto } from '@/model/EstoqueProduto';
import { getAllProdutosAtivos, saveCompraProduto, saveEstoqueProduto } from '@/services/produtoService';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

interface ModalCompraProdutoProps {
    open: boolean;
    onClose: () => void;
}

const ModalCompraProduto: React.FC<ModalCompraProdutoProps> = ({ open, onClose }) => {
    const [estoqueProduto, setEstoqueProduto] = useState<EstoqueProduto>(new EstoqueProduto());
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [produtoList, setProdutoList] = useState<Produto[]>([]);
    const [compraList, setCompraList] = useState<EstoqueProduto[]>([]);
    const [showResumo, setShowResumo] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setEstoqueProduto(new EstoqueProduto());
            const result = await getAllProdutosAtivos();
            setProdutoList(result);
        };
        fetchData();
    }, [open]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setEstoqueProduto(prevState => ({
            ...prevState,
            [name!]: value
        }));
        setErrors(prevState => ({
            ...prevState,
            [name!]: ''
        }));
    };

    const handleSelectChange = (event: SelectChangeEvent<number>) => {
        const { value } = event.target;
        const selectedProduto = produtoList.find(prod => prod.id === value);
        setEstoqueProduto(prevState => ({
            ...prevState,
            produto: selectedProduto || new Produto()
        }));
        setErrors(prevState => ({
            ...prevState,
            produto: ''
        }));
    };

    const validate = () => {
        let tempErrors: { [key: string]: string } = {};
        if (!estoqueProduto.produto?.id) tempErrors.produto = 'Produto é obrigatório';
        if (!estoqueProduto.validade) tempErrors.validade = 'Validade é obrigatória';
        if (!estoqueProduto.quantidade) tempErrors.quantidade = 'Quantidade é obrigatória';
        if (!estoqueProduto.valor) tempErrors.valor = 'Valor é obrigatório';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async () => {
        setShowResumo(true);
    };

    const handleAdd = () => {
        if (validate()) {
            setCompraList([...compraList, estoqueProduto]);
            setEstoqueProduto(new EstoqueProduto());
        }
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    const handleFinish = async () => {
        //await saveEstoqueProduto(compraList);
        await saveCompraProduto(compraList);
        setCompraList([]);
        setShowResumo(false);
        onClose();
    };

    const handleRemove = (item: EstoqueProduto) => {
        setCompraList(compraList.filter(prod => prod.produto?.id !== item.produto?.id));
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">
            <DialogTitle component="div">
                <Typography variant="h6" align="center">
                    Compra de Produto
                </Typography>
            </DialogTitle>
            <DialogContent>
                {!showResumo ? (
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <FormControl fullWidth required error={!!errors.produto}>
                            <InputLabel id="produto-label">Produto</InputLabel>
                            <Select
                                labelId="produto-label"
                                name="produto"
                                value={estoqueProduto.produto?.id || ''}
                                onChange={handleSelectChange}
                                label="Produto"
                            >
                                {produtoList.map(prod => (
                                    <MenuItem key={prod.id} value={prod.id}>{prod.nome}</MenuItem>
                                ))}
                            </Select>
                            {errors.produto && <Typography color="error">{errors.produto}</Typography>}
                        </FormControl>
                        <TextField
                            label="Quantidade"
                            name="quantidade"
                            type="number"
                            value={estoqueProduto.quantidade || ''}
                            onChange={handleChange}
                            error={!!errors.quantidade}
                            helperText={errors.quantidade}
                            fullWidth
                            required
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
                        <TextField
                            label="Valor"
                            name="valor"
                            type="number"
                            value={estoqueProduto.valor || ''}
                            onChange={handleChange}
                            error={!!errors.valor}
                            helperText={errors.valor}
                            fullWidth
                            required
                        />
                    </Box>
                ) : (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Nome</TableCell>
                                    <TableCell>Quantidade</TableCell>
                                    <TableCell>Validade</TableCell>
                                    <TableCell>Valor</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {compraList.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.produto?.nome}</TableCell>
                                        <TableCell>{item.quantidade}</TableCell>
                                        <TableCell>{formatDate(item.validade.toString())}</TableCell>
                                        <TableCell>{item.valor}</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="error" onClick={() => handleRemove(item)}>
                                                <CloseOutlinedIcon />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </DialogContent>
            {!showResumo ? (
                <div>
                    <DialogActions sx={{ justifyContent: 'space-around' }}>
                        <Button variant='contained' onClick={handleAdd} color="warning" sx={{ right: 20 }}>
                            Adicionar
                        </Button>
                        <Badge badgeContent={compraList.length} color="primary" sx={{ right: 15 }}>
                            <ReceiptLongOutlinedIcon />
                        </Badge>
                    </DialogActions>
                    <DialogActions sx={{ justifyContent: 'space-around' }}>
                        <Button variant='contained' onClick={handleSubmit} color="success">Continuar</Button>
                        <Button variant='contained' onClick={onClose} color="error">Cancelar</Button>
                    </DialogActions>
                </div>
            ) : (
                <DialogActions sx={{ justifyContent: 'space-around' }}>
                    <Button variant='contained' onClick={handleFinish} color="success">Finalizar</Button>
                    <Button variant='contained' onClick={() => setShowResumo(false)} color="error">Voltar</Button>
                </DialogActions>
            )}
        </Dialog>
    );
};

export default ModalCompraProduto;
