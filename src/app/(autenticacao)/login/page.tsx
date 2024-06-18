"use client";
import { useState } from 'react';
import { useRouter} from 'next/navigation'
import { login } from '../../../services/loginService'
import Usuario from '@/model/Usuario';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { ThemeProvider } from '@mui/material';
import {grey, padrao} from '@/style/theme';
import Link from 'next/link';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import { setAuthToken } from '@/services/api';


function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [open, setOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const router = useRouter();

    const logar = async () => {
        try {
            const usuario = new Usuario(email,senha);
            const token = await login(usuario);
            console.log(sessionStorage.getItem('token'));
            setAuthToken(token);
            router.push('/');
        } catch (error: any) {
            setErrorMessage(error.response.data);
            setOpen(true);
        }
    }

  return (
    <div >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                style={{ height: '98vh' }}
                bgcolor={grey.palette.primary.main}
            >
                <ThemeProvider theme={padrao}> 
                    <Box
                        padding={4}
                        display="flex"
                        flexDirection="column"
                        alignItems="center"
                        borderRadius={1}
                        bgcolor="#FFF"
                        sx={{ minWidth: 275}}
                        boxShadow={1}
                    >
                        <Typography variant="h5" component="h5">
                            Login
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ pt: 3 }}>
                            <TextField
                                id="outlined-basic"
                                label="Email*"
                                variant="outlined"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}/>
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ pt: 2 }}>
                        <TextField
                            id="outlined-password-input"
                            label="Password*"
                            type="password"
                            autoComplete="current-password"
                            value={senha}
                            onChange={(e) => setSenha(e.target.value)}/>
                        </Typography>
                        <Typography variant="body2" component="div" sx={{ pt: 2 }}>
                            <Button onClick={logar} variant="contained">Logar</Button>
                        </Typography>
                    </Box>
                </ThemeProvider>
                <Snackbar open={open} autoHideDuration={5000} onClose={() => setOpen(false)}>
                    <Alert variant="filled" onClose={() => setOpen(false)} severity="error" sx={{ width: '100%' }}>
                        {errorMessage}
                    </Alert>
                </Snackbar>
            </Box>
    </div>
  );
}

export default Login;