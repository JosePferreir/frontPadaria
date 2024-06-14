"use client";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import { Add, Edit, CloseOutlined as CloseOutlinedIcon, SettingsOutlined as SettingsOutlinedIcon } from '@mui/icons-material';
import { Produto } from '@/model/Produto';
import { getAllProdutos, inactivateProduto } from '@/services/produtoService'; 
import ModalGerenciarProduto from './modal-gerenciar'; 
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';

function GerenciarProdutos() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [produtoList, setProdutoList] = useState<Produto[]>([]);
    const [filteredProdutoList, setFilteredProdutoList] = useState<Produto[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Produto | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [editItem, setEditItem] = useState<Produto | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllProdutos();
            setProdutoList(result);
            setFilteredProdutoList(result);
        };
        fetchData();
    }, []);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        const filteredData = produtoList.filter(item =>
            item.nome.toLowerCase().includes(value)
        );
        setFilteredProdutoList(filteredData);
    };

    const handleInactivateActivate = (item: Produto) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
    };

    const handleConfirmInactivateActivate = async () => {
        if (selectedItem) {
            await inactivateProduto(selectedItem.id!);
            handleClose();
            const result = await getAllProdutos();
            setProdutoList(result);
            setFilteredProdutoList(result.filter((item: { nome: string; }) => item.nome.toLowerCase().includes(searchTerm)));
        }
    };

    const closeModal = async () => {
        setOpenModal(false);
        const result = await getAllProdutos();
        setProdutoList(result);
        setFilteredProdutoList(result.filter((item: { nome: string; }) => item.nome.toLowerCase().includes(searchTerm)));
    };

    const handleEdit = (item: Produto) => {
        setEditItem(item);
        setOpenModal(true);
    };

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexGrow: 1, gap: 2, padding: 2, margin: 2, bgcolor: '#fff', height: '87%' }}>
            <Stack spacing={2} sx={{ width: '100%' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: 60,
                        height: 60,
                        borderRadius: '50%',
                        bgcolor: '#e0e0e0',
                    }}>
                        <EditCalendarOutlinedIcon sx={{ fontSize: 40 }} />
                    </Box>
                    <Typography variant="h4">Gerenciar Produtos</Typography>
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button variant="contained" color="warning" startIcon={<Add />} size='medium' onClick={() => setOpenModal(true)}>
                        Novo
                    </Button>
                </Box>
                <TextField 
                    variant="outlined" 
                    placeholder="Buscar" 
                    value={searchTerm} 
                    onChange={handleSearch} 
                    fullWidth 
                    margin="normal"
                />
                <TableContainer component={Paper} sx={{ maxHeight: '70vh' }}>
                    <Table stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell>Descrição</TableCell>
                                <TableCell>Unidade utilizada</TableCell>
                                <TableCell align='center'><SettingsOutlinedIcon /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredProdutoList.map((item) => (
                                <TableRow key={item.id} sx={{ textDecoration: item.ativo ? 'none' : 'line-through', color: item.ativo ? 'inherit' : 'red' }}>
                                    <TableCell>{item.nome}</TableCell>
                                    <TableCell>{item.unidadeUtilizada}</TableCell>
                                    <TableCell align='center'> 
                                        <Button onClick={() => handleEdit(item)} sx={{ mr: 1 }} variant="contained" color="warning">
                                            <Edit />
                                        </Button>
                                        {item.ativo ? (
                                            <Button onClick={() => handleInactivateActivate(item)} variant="contained" color="error">
                                                <CloseOutlinedIcon />
                                            </Button>
                                        ) : (
                                            <Button onClick={() => handleInactivateActivate(item)} variant="contained" color="success">
                                                <CheckOutlinedIcon />
                                            </Button>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
            <ModalGerenciarProduto
                open={openModal}
                onClose={closeModal}
                item={editItem}
            />
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Confirmar {selectedItem?.ativo ? 'Inativação' : 'Ativação'}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja {selectedItem?.ativo ? 'inativar' : 'ativar'} o produto {selectedItem?.nome}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="contained">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmInactivateActivate} color={selectedItem?.ativo ? "error" : "success"} variant="contained" autoFocus>
                        {selectedItem?.ativo ? 'Inativar' : 'Ativar'}
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default GerenciarProdutos;