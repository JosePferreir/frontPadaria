import axios from 'axios';

// Criação da instância do Axios
const api = axios.create({
    baseURL: 'http://localhost:8080/',
    headers: {
        'Content-Type': 'application/json',
    }
});

// Função para configurar o token no Axios
export const setAuthToken = (token: string | null) => {
    if (token) {
        // Adiciona o token aos headers Authorization
        api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
        // Remove o token se não estiver presente
        delete api.defaults.headers.common['Authorization'];
    }
};

// Configuração de um interceptor para adicionar o token em cada requisição
api.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default api;