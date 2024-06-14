"use client";
import '@/style/globals.css';
import SideMenu from '@/components/SideMenu';
import Box from '@mui/material/Box';
import { AppBar, IconButton, Toolbar } from "@mui/material";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import {laranja} from '@/style/theme';
import { ThemeProvider } from '@emotion/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { setAuthToken } from '@/services/api';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
    const router = useRouter();
    const destruirToken = () => {
        sessionStorage.removeItem('token');
        setAuthToken(null); 
        router.push('/login');
    }

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        console.log('Token recuperado do sessionStorage:', token);
        if(!token) {
            router.push('/login');
        }
    }, []);
    return (
        <html lang="en">
            <body>
                <Box sx={{ display: 'flex' }}>
                    <ThemeProvider theme={laranja}>
                        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                            <Toolbar>
                                <IconButton
                                    size="large"
                                    edge="start"
                                    color="inherit"
                                    aria-label="menu"
                                    sx={{ ml: 'auto' }}
                                    onClick={destruirToken}
                                >
                                    <LogoutOutlinedIcon/>
                                </IconButton>
                            </Toolbar>
                        </AppBar>
                    </ThemeProvider>
                    <SideMenu />
                    <Box sx={{ flexGrow: 1 , height:'100vh'}}>
                        <Toolbar />
                        {children}
                    </Box>
                </Box>
            </body>
        </html>
    )
}
