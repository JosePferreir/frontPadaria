import { MateriaPrima } from '@/model/MateriaPrima';
import { save, update } from '@/services/materiaPrimaService';
import { Box, Dialog, DialogContent, DialogTitle, TextField, DialogActions, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

interface ModalGerenciarMPProps {
    open: boolean;
    onClose: () => void;
    item?: MateriaPrima | null;
}

const ModalGerenciarMP: React.FC<ModalGerenciarMPProps> = ({ open, onClose, item }) => {
    const [materiaPrima, setMateriaPrima] = useState<MateriaPrima>(new MateriaPrima());
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [editMode, setEditMode] = useState(false);

    useEffect(() => {
        if (item) {
            setMateriaPrima(item);
            setEditMode(true);
        } else {
            setMateriaPrima(new MateriaPrima());
        }
        setErrors({});
    }, [open, item]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setMateriaPrima(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const validate = () => {
        let tempErrors: { [key: string]: string } = {};
        if (!materiaPrima.descricao) tempErrors.descricao = 'Descrição é obrigatória';
        if (!materiaPrima.unidadeComprada) tempErrors.unidadeComprada = 'Unidade comprada é obrigatória';
        if (!materiaPrima.unidadeUtilizada) tempErrors.unidadeUtilizada = 'Unidade utilizada é obrigatória';
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async () => {
        if (validate()) {
            if (!editMode) {
                await save(materiaPrima);
            } else{
                await update(materiaPrima);
            }
            onClose();
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>
                <Typography variant="h6" align="center">
                    {item ? `Editar ${item.descricao}` : 'Nova Matéria-Prima'}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
                    <TextField
                        label="Descrição"
                        name="descricao"
                        value={materiaPrima.descricao}
                        onChange={handleChange}
                        error={!!errors.descricao}
                        helperText={errors.descricao}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Unidade Comprada"
                        name="unidadeComprada"
                        value={materiaPrima.unidadeComprada}
                        onChange={handleChange}
                        error={!!errors.unidadeComprada}
                        helperText={errors.unidadeComprada}
                        fullWidth
                        required
                    />
                    <TextField
                        label="Unidade Utilizada"
                        name="unidadeUtilizada"
                        value={materiaPrima.unidadeUtilizada}
                        onChange={handleChange}
                        error={!!errors.unidadeUtilizada}
                        helperText={errors.unidadeUtilizada}
                        fullWidth
                        required
                    />
                </Box>
            </DialogContent>
            <DialogActions sx={{ justifyContent: 'space-around' }}>
                <Button onClick={onClose} variant='contained' color="error">Cancelar</Button>
                <Button onClick={handleSubmit} variant='contained' color="success">Salvar</Button>
            </DialogActions>
        </Dialog>
    );
}

export default ModalGerenciarMP;