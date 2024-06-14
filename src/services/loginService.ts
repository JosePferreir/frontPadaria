import Usuario from '@/model/Usuario';
import api from './api';

const login = async (usuario: Usuario) => {
    try {
        const response = await api.post('/auth/login', usuario);
        const { token } = response.data;
        if (typeof window !== 'undefined') {
            sessionStorage.setItem('token', token);
        }
        return token;
    } catch (error) {
        console.error('Erro de login:', error);
        throw error;
    }
}

const logout = () => {
    if (typeof window !== 'undefined') {
        sessionStorage.removeItem('token');
    }
};

export { login, logout };