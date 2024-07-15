"use client";
import React, { ChangeEvent, useEffect, useState } from 'react';
import { Container, Button, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Paper, Box, Stack, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { Add, Edit, Delete, Check, South } from '@mui/icons-material';
import { Compra } from '@/model/Compra';
import { getAllCompras } from '@/services/compraService';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import ModalDetails from './modal-detalhes';

function GerenciarCompras() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [compraList, setCompraList] = useState<Compra[]>([]);
    const [filteredCompraList, setFilteredCompraList] = useState<Compra[]>([]);
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Compra | null>(null);
    const [openModal, setOpenModal] = useState(false);
    const [selectedCompra, setSelectedCompra] = useState<Compra | null>(null);
    const [openDetailsModal, setOpenDetailsModal] = useState(false);


    useEffect(() => {
        const fetchData = async () => {
            const result = await getAllCompras();
            setCompraList(result);
            setFilteredCompraList(result);
            setFilteredCompraList(sortAndFilter(result, searchTerm));
        };
        fetchData();
    }, []);

    const sortAndFilter = (data: Compra[], term: string) => {
        return data
            .filter(item =>
                item.tipoCompra.toLowerCase().includes(term) ||
                item.data.toString().toLowerCase().includes(term) ||
                item.valorTotal.toString().toLowerCase().includes(term)
            )
            .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());
    };

    const handleSearch = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value.toLowerCase();
        setSearchTerm(value);
        setFilteredCompraList(sortAndFilter(compraList, value));
    };

    const handleClose = () => {
        setSelectedCompra(null);
        setOpenDetailsModal(false);
    };

    const openDetails = (item: Compra) => {
        setSelectedCompra(item);
        setOpenDetailsModal(true);
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
                    <Typography variant="h4">Gerenciar Compras</Typography>
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
                                <TableCell>Tipo</TableCell>
                                <TableCell>Data da Compra</TableCell>
                                <TableCell>Valor Total</TableCell>
                                <TableCell align='center'>Detalhes</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredCompraList.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.tipoCompra}</TableCell>
                                    <TableCell>{new Date(item.data).toLocaleDateString()}</TableCell>
                                    <TableCell>{item.valorTotal}</TableCell>
                                    <TableCell align='center'>
                                        <Button variant="contained" color="warning" sx={{ mr: 1 }} onClick={() => openDetails(item)}>
                                            <ControlPointIcon />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Stack>
            <ModalDetails
                open={openDetailsModal}
                onClose={handleClose}
                compra={selectedCompra}
            />
        </Box>
    );
}

export default GerenciarCompras;