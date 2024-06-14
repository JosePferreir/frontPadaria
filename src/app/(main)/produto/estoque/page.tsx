"use client";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Box, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import { Add, Edit, CloseOutlined as CloseOutlinedIcon, SettingsOutlined as SettingsOutlinedIcon } from '@mui/icons-material';
import { Produto } from '@/model/Produto';
import { getAllEstoqueProduto, getAllProdutos, inactivateProduto } from '@/services/produtoService'; 
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import { EstoqueProduto } from '@/model/EstoqueProduto';
import ModalEstoqueProduto from './modar-adicionar';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

function GerenciarProdutos() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [produtoList, setProdutoList] = useState<Produto[]>([]);
    const [filteredProdutoList, setFilteredProdutoList] = useState<Produto[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Produto | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [editItem, setEditItem] = useState<Produto | null>(null);

    const [estoqueProdutoList, setEstoqueProdutoList] = useState<EstoqueProduto[]>([]);
    const [filteredEstoqueProdutoList, setFilteredEstoqueProdutoList] = useState<EstoqueProduto[]>([]);
    const [openModalProducao, setOpenModalProducao] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllEstoqueProduto();
            setEstoqueProdutoList(result);
            setFilteredEstoqueProdutoList(result);
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
        setOpenModalProducao(false);
        setSelectedItem(null);
    };

    const handleOpenProducao = () => {
        setOpen(false);
        setOpenModalProducao(true);
        //setOpenModal(true);
    }

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

    const handleEdit = (item: EstoqueProduto) => {
        //setEditItem(item);
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
                        <Inventory2OutlinedIcon sx={{ fontSize: 40 }} />
                    </Box>
                    <Typography variant="h4">Estoque de Produtos</Typography>
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button variant="contained" color="warning" startIcon={<Add />} size='medium' onClick={() => setOpen(true)}>
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
                                <TableCell>Quantidade</TableCell>
                                <TableCell>Unidade utilizada</TableCell>
                                <TableCell>Validade</TableCell>
                                <TableCell>Data criação</TableCell>
                                <TableCell align='center'><SettingsOutlinedIcon /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEstoqueProdutoList.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.produto?.nome}</TableCell>
                                    <TableCell>{item.quantidade}</TableCell>
                                    <TableCell>{item.produto?.unidadeUtilizada}</TableCell>
                                    <TableCell>{new Date(item.validade).toLocaleDateString()}</TableCell>
                                    <TableCell>{new Date(item.dataCriacao).toLocaleDateString()}</TableCell>
                                    <TableCell align='center'>
                                        <Button onClick={() => handleEdit(item)} sx={{ mr: 1 }} variant="contained" color="warning">
                                            <Edit />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
            <ModalEstoqueProduto
                open={openModalProducao}
                onClose={handleClose}
            >

            </ModalEstoqueProduto>
            <Dialog
                open={open}
                onClose={handleClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogContent>
                <Stack direction='row' justifyContent="space-evenly">
                    <Paper
                        sx={{
                            height: 100,
                            width: '28%',
                            textAlign: 'center',
                            padding: 2,
                            alignItems: 'center',
                            borderRadius: 5,
                            cursor: 'pointer',
                            '&:hover': {
                            backgroundColor: '#f5f5f5',
                            boxShadow: 6, 
                            },
                        }}
                        elevation={3}
                        onClick={handleOpenProducao}
                    >
                        <Typography variant="h6" sx={{ marginTop: 1, color: '#D2691E' }}>
                            Produção
                        </Typography>
                    </Paper>
                    <Paper
                        sx={{
                            height: 100,
                            width: '28%',
                            textAlign: 'center',
                            padding: 2,
                            alignItems: 'center',
                            borderRadius: 5,
                            cursor: 'pointer',
                            '&:hover': {
                            backgroundColor: '#f5f5f5',
                            boxShadow: 6, 
                            },
                        }}
                        elevation={3}
                    >
                        <Typography variant="h6" sx={{ marginTop: 1, color: '#D2691E' }}>
                            Compra
                        </Typography>
                    </Paper>
                </Stack>
                </DialogContent>
                <DialogActions sx={{justifyContent:'center'}}>
                    <Button onClick={handleClose} color="error" variant="contained">
                        Cancelar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default GerenciarProdutos;