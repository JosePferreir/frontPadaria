"use client";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Box, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography } from '@mui/material';
import { Add, Edit, Delete, Check } from '@mui/icons-material';
import { MateriaPrima } from '@/model/MateriaPrima';
import { getAllMp, inactivate } from '@/services/materiaPrimaService';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import ModalGerenciarMP from './modal-gerenciar';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';

function GerenciarMP() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [materiaPrimaList, setMateriaPrimaList] = useState<MateriaPrima[]>([]);
    const [filteredMateriaPrimaList, setFilteredMateriaPrimaList] = useState<MateriaPrima[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MateriaPrima | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [editItem, setEditItem] = useState<MateriaPrima | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllMp();
            setMateriaPrimaList(result);
            setFilteredMateriaPrimaList(result);
        };
        fetchData();
    }, []);

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        const filteredData = materiaPrimaList.filter(item =>
            item.descricao.toLowerCase().includes(value) ||
            item.unidadeComprada.toLowerCase().includes(value) ||
            item.unidadeUtilizada.toLowerCase().includes(value)
        );
        setFilteredMateriaPrimaList(filteredData);
    };

    const handleInactivate = (item: MateriaPrima) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedItem(null);
    };

    const handleConfirmInactivate = async () => {
        if (selectedItem) {
            await inactivate(selectedItem.id!);
            handleClose();
            const result = await getAllMp();
            setMateriaPrimaList(result);
            setFilteredMateriaPrimaList(result.filter(item => item.descricao.toLowerCase().includes(searchTerm)));
        }
    };

    const closeModal = async () => {
        setOpenModal(false);
        const result = await getAllMp();
        setMateriaPrimaList(result);
        setFilteredMateriaPrimaList(result.filter(item => item.descricao.toLowerCase().includes(searchTerm)));
    };

    const handleEdit = (item: MateriaPrima) => {
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
                    <Typography variant="h4">Gerenciar matéria-prima</Typography>
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
                                <TableCell>Unidade comprada</TableCell>
                                <TableCell>Unidade utilizada</TableCell>
                                <TableCell align='center'><SettingsOutlinedIcon /></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredMateriaPrimaList.map((item) => (
                                <TableRow key={item.id} sx={{ textDecoration: item.ativo ? 'none' : 'line-through', color: item.ativo ? 'inherit' : 'red' }}>
                                    <TableCell>{item.descricao}</TableCell>
                                    <TableCell>{item.unidadeComprada}</TableCell>
                                    <TableCell>{item.unidadeUtilizada}</TableCell>
                                    <TableCell align='center'>
                                        <Button variant="contained" color="warning" sx={{ mr: 1 }} onClick={() => handleEdit(item)}>
                                            <Edit />
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => handleInactivate(item)}>
                                            <CloseOutlinedIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
            <ModalGerenciarMP
                open={openModal}
                onClose={closeModal}
                item={editItem}
            />
            <Dialog
                open={open}
                onClose={handleClose}
            >
                <DialogTitle>Confirmar Inativação</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Tem certeza que deseja inativar a matéria-prima {selectedItem?.descricao}?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary" variant="contained">
                        Cancelar
                    </Button>
                    <Button onClick={handleConfirmInactivate} color="error" variant="contained" autoFocus>
                        Inativar
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default GerenciarMP;