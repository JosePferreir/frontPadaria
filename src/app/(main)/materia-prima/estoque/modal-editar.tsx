import React, { useState, useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Box, Typography } from '@mui/material';
import { EstoqueMP } from '@/model/EstoqueMP'; // Ajuste o caminho conforme necessário
import { editEstoqueMP } from '@/services/materiaPrimaService';

interface ModalEditEstoqueMPProps {
    open: boolean;
    onClose: () => void;
    item: EstoqueMP | null;
}

const ModalEditEstoqueMP: React.FC<ModalEditEstoqueMPProps> = ({ open, onClose, item }) => {
    const [estoqueMP, setEstoqueMP] = useState<EstoqueMP>(new EstoqueMP());
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        if (item) {
            setEstoqueMP(item);
        }
    }, [item]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setEstoqueMP(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validate = () => {
        let tempErrors: { [key: string]: string } = {};
        if (!estoqueMP.validade) tempErrors.validade = 'Validade é obrigatória';
        if (!estoqueMP.quantidade) tempErrors.quantidade = 'Quantidade é obrigatória';
        if (!estoqueMP.quantidadeUnidade) tempErrors.quantidadeUnidade = 'Quantidade por unidade é obrigatória';
        if (!estoqueMP.totalUnidadeUtilizada) tempErrors.total = 'Total é obrigatório';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validate()) {
            await editEstoqueMP(estoqueMP);
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle component="div">
                <Typography variant="h6" align="center">
                    Editar Estoque de {estoqueMP.materiaPrima?.descricao}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
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
                        label="Total"
                        name="totalUnidadeUtilizada"
                        type="number"
                        value={estoqueMP.totalUnidadeUtilizada || ''}
                        onChange={handleChange}
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
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-around' }}>
                <Button variant="contained" onClick={onClose} color="error">Cancelar</Button>
                <Button variant="contained" onClick={handleSubmit} color="success">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalEditEstoqueMP;