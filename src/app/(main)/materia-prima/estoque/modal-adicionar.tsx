import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography, FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Badge, IconButton, TableContainer, Table, Paper, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { EstoqueMP} from '@/model/EstoqueMP'; // Ajuste o caminho conforme necessário
import { MateriaPrima } from '@/model/MateriaPrima';
import { getAllMpAtivos, saveEstoqueMP } from '@/services/materiaPrimaService';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ReceiptLongOutlinedIcon from '@mui/icons-material/ReceiptLongOutlined';

interface ModalAddEstoqueMPProps {
    open: boolean;
    onClose: () => void;
}

const ModalAddEstoqueMP: React.FC<ModalAddEstoqueMPProps> = ({ open, onClose }) => {
    const [estoqueMP, setEstoqueMP] = useState<EstoqueMP>(new EstoqueMP());
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [materiaPrimaList, setMateriaPrimaList] = useState<MateriaPrima[]>([]);
    const [compraList, setCompraList] = useState<EstoqueMP[]>([]);
    const [showResumo, setShowResumo] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            setEstoqueMP(new EstoqueMP());
            const result = await getAllMpAtivos();
            setMateriaPrimaList(result);
        };
        fetchData();
    }, [open]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement | { name?: string; value: unknown }>) => {
        const { name, value } = event.target;
        setEstoqueMP(prevState => ({
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
        const selectedMateriaPrima = materiaPrimaList.find(mp => mp.id === value);
        setEstoqueMP(prevState => ({
            ...prevState,
            materiaPrima: selectedMateriaPrima || new MateriaPrima()
        }));
        setErrors(prevState => ({
            ...prevState,
            materiaPrima: ''
        }));
    };

    const validate = () => {
        let tempErrors: { [key: string]: string } = {};
        if (!estoqueMP.materiaPrima?.id) tempErrors.materiaPrima = 'Matéria-prima é obrigatória';
        if (!estoqueMP.validade) tempErrors.validade = 'Validade é obrigatória';
        if (!estoqueMP.quantidade) tempErrors.quantidade = 'Quantidade é obrigatória';
        if (!estoqueMP.quantidadeUnidade) tempErrors.quantidadeUnidade = 'Quantidade por unidade é obrigatória';
        if (!estoqueMP.valor) tempErrors.valor = 'Valor é obrigatório';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async () => {
        setShowResumo(true);
    };

    function handleAdd(): void {
        if(validate()){
            console.log(estoqueMP);
            setCompraList([...compraList, estoqueMP]);
            setEstoqueMP(new EstoqueMP());
        }
    }
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
    };

    async function handleFinish(): Promise<void> {
        await saveEstoqueMP(compraList);
        setCompraList([]);
        setShowResumo(false);
        onClose();
    }
    function handleRemove(item: EstoqueMP): void {
        setCompraList(compraList.filter(mp => mp.materiaPrima?.id !== item.materiaPrima?.id));
    }

    return (
        <Dialog open={open} onClose={onClose} maxWidth="md">
            <DialogTitle component="div">
                <Typography variant="h6" align="center">
                    Compra de matéria-prima
                </Typography>
            </DialogTitle>
            <DialogContent>
                {!showResumo ? (
                    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                        <FormControl fullWidth required error={!!errors.materiaPrima}>
                            <InputLabel id="materiaPrima-label">Matéria-prima</InputLabel>
                            <Select
                                labelId="materiaPrima-label"
                                name="materiaPrima"
                                value={estoqueMP.materiaPrima?.id || ''}
                                onChange={handleSelectChange}
                                label="Matéria-prima"
                            >
                                {materiaPrimaList.map(mp => (
                                    <MenuItem key={mp.id} value={mp.id}>{mp.descricao}</MenuItem>
                                ))}
                            </Select>
                            {errors.materiaPrima && <Typography color="error">{errors.materiaPrima}</Typography>}
                        </FormControl>
                        <TextField
                            label="Quantidade"
                            name="quantidade"
                            type="number"
                            value={estoqueMP.quantidade || ''}
                            onChange={handleChange}
                            error={!!errors.quantidade}
                            helperText={errors.quantidade}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Quantidade por Unidade"
                            name="quantidadeUnidade"
                            type="number"
                            value={estoqueMP.quantidadeUnidade || ''}
                            onChange={handleChange}
                            error={!!errors.quantidadeUnidade}
                            helperText={errors.quantidadeUnidade}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Validade"
                            name="validade"
                            type="date"
                            value={estoqueMP.validade || ''}
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
                            value={estoqueMP.valor || ''}
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
                                    <TableCell>Descrição</TableCell>
                                    <TableCell>Quantidade</TableCell>
                                    <TableCell>Quantidade/Unidade</TableCell>
                                    <TableCell>Validade</TableCell>
                                    <TableCell>Valor</TableCell>
                                    <TableCell></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {compraList.map((item, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{item.materiaPrima?.descricao}</TableCell>
                                        <TableCell>{item.quantidade}</TableCell>
                                        <TableCell>{item.quantidadeUnidade}</TableCell>
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
                        <Button variant='contained' onClick={handleAdd} color="warning" sx={{right:20}}>
                            Adicionar
                        </Button>
                            <Badge badgeContent={compraList.length} color="primary" sx={{right:15}}>
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
                        <Button variant='contained' onClick={()=> setShowResumo(false)} color="error">Voltar</Button>
                    </DialogActions>
            )}
        </Dialog>
    );
}

export default ModalAddEstoqueMP;