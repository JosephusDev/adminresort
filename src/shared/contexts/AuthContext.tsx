import React, { ReactNode, createContext, useCallback, useContext, useState } from 'react';
import { Api } from '../services/api/Index';
import { useNavigate } from 'react-router-dom';

// Definição da forma dos dados no contexto
interface AuthContextData {
    isAuthenticated: boolean;
    carregando: boolean;
    handleLogin: (usuario: string, senha: string) => Promise<void>;
    handleLogout: () => void;
    setIdUsuario: React.Dispatch<React.SetStateAction<number>>;
    idUsuario: number;
}

// Criando o contexto com o tipo definido
const AuthContext = createContext<AuthContextData>({} as AuthContextData);

// Hook personalizado para utilizar o contexto
export const useAuthContext = () => {
    return useContext(AuthContext);
}

interface MyAuthProps {
    children: ReactNode;
}

export const Auth: React.FC<MyAuthProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [carregando, setCarregando] = useState(false);
    const [idUsuario, setIdUsuario] = useState(-1)
    const navigate = useNavigate();

    const handleLogin = useCallback(async (usuario: string, senha: string) => {
        setCarregando(true)
        try {
            const response = await Api.post('/funcionarios/logar', {
                usuario: usuario,
                senha: senha
            });
            if (response.status === 200 && response.data.length > 0) {
                setIsAuthenticated(true);
                setIdUsuario(response.data[0].id)
            } else {
                setIdUsuario(0)
                console.error('Usuário não encontrado ou erro na resposta do servidor');
            }
            setCarregando(false)
        } catch (error) {
            setIdUsuario(0)
            console.error(error);
            setCarregando(false)
        }
    }, []);


    const handleLogout = useCallback(() => {
        setIsAuthenticated(false);
        setIdUsuario(-1)
        navigate("/")
    }, [navigate]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, handleLogin, handleLogout, idUsuario, setIdUsuario, carregando }}>
            {children}
        </AuthContext.Provider>
    );
}
