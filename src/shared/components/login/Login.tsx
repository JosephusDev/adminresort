import React, { useState, useEffect } from 'react';
import { Avatar, Box, Button, Icon, TextField, Typography, useMediaQuery, useTheme } from '@mui/material';
import { useAuthContext } from '../../contexts';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const isMediumScreen = useMediaQuery(theme.breakpoints.down('md'));
    const [utilizador, setUtilizador] = useState('');
    const [senha, setSenha] = useState('');

    const { isAuthenticated, handleLogin, idUsuario, setIdUsuario } = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (idUsuario === 0) {
            notify();
            setIdUsuario(-1)
        }
    }, [idUsuario]);

    const fazerLogin = () => {
        if(!utilizador || !senha){
            notifyPreencherCampos()
        }else{
            setUtilizador("");
            setSenha("");
            handleLogin(utilizador.trim(), senha.trim());
            navigate("/home");
        }
    }

    const notify = () => toast.error('Utilizador não encontrado!', { autoClose: 2000, position: 'bottom-right' });
    const notifyContaCriada = () => toast.success('Conta criada com sucesso!', { autoClose: 2000, position: 'bottom-right' });
    const notifyPreencherCampos = () => toast.error('Preencha todos os campos!', { autoClose: 2000, position: 'bottom-right' });

    if (isAuthenticated) {
        return <>{children}</>;
    }
    
    return (
        <Box
            sx={{
                backgroundColor: '#fff',
                borderRadius: '8px',
                padding: '20px',
                maxWidth: '400px',
                margin: '0 auto',
                marginTop: '80px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
            }}
        >
            <Avatar
                src='https://www.hoteisangola.com/components/com_reservations/gallery/s1/hotels/large/g7/kakanda%20resort%20dundo-1.jpg'
                sx={{ width: theme.spacing(12), height: theme.spacing(12) }}
            />
            <Typography variant='h6' sx={{marginY: 3}}>Kakanda Resort</Typography>
            <TextField
                type='text'
                size='small'
                label='Utilizador'
                fullWidth
                style={{ marginBottom: 25, width: isSmallScreen ? '80%' : isMediumScreen ? '60%' : '60%' }}
                value={utilizador}
                onChange={(e) => setUtilizador(e.target.value)}
            />
            <TextField
                type='password'
                size='small'
                label='Palavra-passe'
                fullWidth
                style={{ marginBottom: 25, width: isSmallScreen ? '80%' : isMediumScreen ? '60%' : '60%' }}
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />
            <Box display="flex" justifyContent="center" width="100%">
                <Button
                    variant="contained"
                    color="primary"
                    disableElevation
                    startIcon={<Icon>login</Icon>}
                    onClick={fazerLogin}
                    style={{ width: isSmallScreen ? "40%" : isMediumScreen ? "60%" : "30%" }}
                >
                    Entrar
                </Button>
            </Box>
        </Box>
    );
};

export default Login;
