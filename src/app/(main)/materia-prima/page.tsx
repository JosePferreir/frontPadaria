"use client";
import { Inventory2Outlined, StorefrontOutlined } from '@mui/icons-material';
import { Box, Button, Container, Divider, Grid, Paper, Stack, Typography, styled } from '@mui/material';
import { useRouter } from 'next/navigation';
import EditCalendarOutlinedIcon from '@mui/icons-material/EditCalendarOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';

function HomeMP(){
    const router = useRouter();

    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-evenly', flexGrow: 1, gap: 2,padding:2, margin: 2, bgcolor:'#fff',height:'87%' }}>
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
                    <Typography variant="h4">Matéria Prima</Typography>
                </Stack>
                <Divider />
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
                        onClick={() => router.push('/materia-prima/gerenciar')}
                    >
                        <EditCalendarOutlinedIcon sx={{ fontSize: 40, color: '#D2691E' }} />
                        <Typography variant="h6" sx={{ marginTop: 1, color: '#D2691E' }}>
                            Gerenciar
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
                        onClick={() => router.push('/materia-prima/estoque')}
                    >
                        <Inventory2Outlined sx={{ fontSize: 40, color: '#D2691E' }} />
                        <Typography variant="h6" sx={{ marginTop: 1, color: '#D2691E' }}>
                            Estoque
                        </Typography>
                    </Paper>
                </Stack>
            </Stack>
        </Box>
    )
}

export default HomeMP;