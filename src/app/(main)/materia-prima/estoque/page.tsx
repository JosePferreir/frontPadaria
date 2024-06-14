"use client";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Box, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import { Add, Edit, Delete, Check } from '@mui/icons-material';
import { MateriaPrima } from '@/model/MateriaPrima';
import { getAllEstoqueMP, getAllMp, inactivate } from '@/services/materiaPrimaService';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import { EstoqueMP } from '@/model/EstoqueMP';

import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import ModalAddEstoqueMP from './modal-adicionar';
import ModalEditEstoqueMP from './modal-editar';

function PageEstoqueMP() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [estoqueMPList, setEstoqueMPList] = useState<EstoqueMP[]>([]);
    const [filteredEstoqueMPList, setFilteredEstoqueMPList] = useState<EstoqueMP[]>([]);
    const [openAddModal, setOpenAddModal] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<EstoqueMP | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllEstoqueMP();
            setEstoqueMPList(result);
            setFilteredEstoqueMPList(result);
        };
        fetchData();
    }, []);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        /*setSearchTerm(value);
        const filteredData = materiaPrimaList.filter(item =>
            item.descricao.toLowerCase().includes(value) ||
            item.unidadeComprada.toLowerCase().includes(value) ||
            item.unidadeUtilizada.toLowerCase().includes(value)
        );
        setFilteredMateriaPrimaList(filteredData);
        * */
    };

    const closeModalAdd = async () => {
        setOpenAddModal(false);
        const fetchData = async () => {
            const result = await getAllEstoqueMP();
            setEstoqueMPList(result);
            setFilteredEstoqueMPList(result);
        };
        fetchData();
    };

    const handleOpenEditModal = (item: EstoqueMP) => {
        setSelectedItem(item);
        setIsEditModalOpen(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        const fetchData = async () => {
            const result = await getAllEstoqueMP();
            setEstoqueMPList(result);
            setFilteredEstoqueMPList(result);
        };
        fetchData();
        setSelectedItem(null);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        });
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
                    <Typography variant="h4">Estoque matéria-prima</Typography>
                </Stack>
                <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
                    <Button variant="contained" color="warning" startIcon={<Add />} size='medium' onClick={() => setOpenAddModal(true)}>
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
                                <TableCell>Validade</TableCell>
                                <TableCell>Quantidade</TableCell>
                                <TableCell>Unidade utilizada</TableCell>
                                <TableCell>Quantidade/<br/>unidade</TableCell>
                                <TableCell>Total</TableCell>
                                <TableCell align='center'><SettingsOutlinedIcon /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredEstoqueMPList.map((item) => (
                                <TableRow key={item.id} sx={{}}>
                                    <TableCell>{item.materiaPrima?.descricao}</TableCell>
                                    <TableCell>{formatDate(item.validade.toString())}</TableCell>
                                    <TableCell>{item.quantidade}</TableCell>
                                    <TableCell>{item.materiaPrima?.unidadeUtilizada}</TableCell>
                                    <TableCell>{item.quantidadeUnidade}</TableCell>
                                    <TableCell>{item.totalUnidadeUtilizada}</TableCell>
                                    <TableCell align='center'>
                                        <Button variant="contained" color="warning" sx={{ mr: 1 }} onClick={() => handleOpenEditModal(item)}>
                                            <Edit />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
            <ModalAddEstoqueMP
                open={openAddModal}
                onClose={closeModalAdd}
            />
            <ModalEditEstoqueMP
                open={isEditModalOpen}
                onClose={handleCloseEditModal}
                item={selectedItem}
            />
        </Box>
    );
}

export default PageEstoqueMP;