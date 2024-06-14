"use client";
import '@/style/globals.css';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, Grid, Paper, Typography, styled } from '@mui/material';
import InventoryIcon from '@mui/icons-material/Inventory';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import StoreIcon from '@mui/icons-material/Store';
import { ShoppingCartOutlined, StorefrontOutlined, Inventory2Outlined } from '@mui/icons-material';
import Link from 'next/link';

function Inicial() {
    const router = useRouter();

    const goTo = async (page:string) => {
        router.push(`/${page}`);
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexGrow: 1, gap: 2,padding:2, margin: 2, bgcolor:'#fff',height:'87%' }}>
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
                onClick={() => goTo('materia-prima')}
            >
                <Inventory2Outlined sx={{ fontSize: 40, color: '#D2691E' }} />
                <Typography variant="h6" sx={{ marginTop: 1, color: '#D2691E' }}>
                    Matéria-prima
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
          onClick={() => goTo('produto')}
        >
            <StorefrontOutlined sx={{ fontSize: 40, color: '#D2691E' }} />
            <Typography variant="h6" sx={{ marginTop: 1, color: '#D2691E' }}>
              Produtos
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
            <ShoppingCartOutlined sx={{ fontSize: 40, color: '#D2691E' }} />
            <Typography variant="h6" sx={{ marginTop: 1, color: '#D2691E' }}>
              Compras
            </Typography>
          </Paper>
        </Box>
          
        
      );
}

export default Inicial;

