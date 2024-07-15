import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper } from '@mui/material';
import { getDetailsProduto, getDetailsMP } from '@/services/compraService';
import { Compra } from '@/model/Compra';
import { DetalhesCompraProduto } from '@/model/DetalhesCompraProduto';
import { DetalhesCompraMP } from '@/model/DetalhesCompraMP';

interface ModalDetailsProps {
    open: boolean;
    onClose: () => void;
    compra: Compra | null;
}

const ModalDetails: React.FC<ModalDetailsProps> = ({ open, onClose, compra }) => {
    const [details, setDetails] = useState<(DetalhesCompraProduto | DetalhesCompraMP)[]>([]);

    useEffect(() => {
        const fetchDetails = async () => {
            if (compra?.id) {
                let result; 
                if (compra.tipoCompra === 'Produto') {
                    result = await getDetailsProduto(compra.id);
                } else if (compra.tipoCompra === 'MP') {
                    result = await getDetailsMP(compra.id);
                }
                setDetails(result);
            }
        };
        fetchDetails();
    }, [compra]);

    return (
        <Dialog open={open} onClose={onClose} fullWidth={true} maxWidth="lg">
            <DialogTitle sx={{ textAlign: 'center' }}>Detalhes da Compra</DialogTitle>
            <DialogContent>
                {details.length > 0 ? (
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>{compra?.tipoCompra === 'Produto' ? 'Produto' : 'Matéria Prima'}</TableCell>
                                    <TableCell>Unidade</TableCell>
                                    <TableCell>Quantidade</TableCell>
                                    {compra?.tipoCompra === 'MP' && <TableCell>Quantidade por Unidade</TableCell>}
                                    <TableCell>Validade</TableCell>
                                    <TableCell>Valor</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {details.map((detail, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{'produto' in detail ? detail.produto : detail.materiaPrima}</TableCell>
                                        <TableCell>{detail.unidade}</TableCell>
                                        <TableCell>{detail.quantidade}</TableCell>
                                        {'quantidadeUnidade' in detail && <TableCell>{detail.quantidadeUnidade}</TableCell>}
                                        <TableCell>{new Date(detail.validade).toLocaleDateString()}</TableCell>
                                        <TableCell>{detail.valor}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                ) : (
                    <Typography variant="body1">Carregando...</Typography>
                )}
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">Fechar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default ModalDetails;