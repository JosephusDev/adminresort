import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Icon, IconButton, TableFooter, LinearProgress, Button, TextField, Typography } from '@mui/material';
import { LayoutBaseDePagina } from '../../shared/layouts';
import {Api} from '../../shared/services/api/Index';
import { MyModalAlerta } from '../../shared/components';
import { useAuthContext } from '../../shared/contexts';
import { toast } from 'react-toastify';


interface ReservaData {
  id_reserva: number;
  cliente: string;
  numero: string;
  estado: string;
  data_out: string;
  data_in: string;
  dias: number;
  total: number;
}

export const Reserva: React.FC = () => {

    const notify = () => toast.error('Reserva cancelada!', { autoClose: 2000, position: 'bottom-right' });
    
    const notifyConfirmada = () => toast.error('Reserva confirmada!', { autoClose: 2000, position: 'bottom-right' });
    
    const { idUsuario } = useAuthContext();

    const [reservas, setReservas] = useState<ReservaData[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const [modalVisivel, setModalVisivel] = useState(false)
    const [modalVisivelConfirmar, setModalVisivelConfirmar] = useState(false)
    const [reserva, setReserva] = useState(-1)

    const abrirModal = (id: number) => {
        setReserva(id)
        setModalVisivel(true)
    }

    const abrirModalConfirmar = (id: number) => {
      setReserva(id)
      setModalVisivelConfirmar(true)
  }

    const formatDate = (dateString: string) => {
        console.log(dateString)
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        
        return `${day}/${month}/${year}`;
    };

    const elimReserva = () => {
        Api.delete(`/reserva/${reserva}`)
      .then(response => {
        notify()
        setModalVisivel(false)
        carregarReservas()
      })
      .catch(error => {
        console.error('Erro ao eliminar a reserva:', error);
      });
    }

    const confirmarReserva = () => {
      Api.put(`/reserva/confirmar/${reserva}`)
    .then(response => {
      notifyConfirmada()
      setModalVisivelConfirmar(false)
      carregarReservas()
    })
    .catch(error => {
      console.error('Erro ao confirmar a reserva:', error);
    });
  }

    const carregarReservas = () => {
        Api.get<ReservaData[]>(`/reserva/all`)
        .then(response => {
          setReservas(response.data);
          setIsLoading(false)
        })
        .catch(error => {
          console.error('Erro ao buscar as reservas:', error);
        });
    }

  useEffect(() => {
    carregarReservas()
  }, [reservas]);

  return (
    <LayoutBaseDePagina
      titulo='Reservas'
    >
      <Box width='100%' display='flex'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Eliminar</TableCell>
                <TableCell>Confirmar</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Quarto</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Check-in</TableCell>
                <TableCell>Check-out</TableCell>
                <TableCell>Dias</TableCell>
                <TableCell>Total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservas.map(reserva => (
                <TableRow key={reserva.id_reserva}>
                  <TableCell><IconButton disabled={reserva.estado === 'pendente' ? false : true} onClick={()=>abrirModal(reserva.id_reserva)} color='primary'><Icon>delete</Icon></IconButton></TableCell>
                  <TableCell><IconButton disabled={reserva.estado === 'pendente' ? false : true} onClick={()=>abrirModalConfirmar(reserva.id_reserva)} color='primary'><Icon>check</Icon></IconButton></TableCell>
                  <TableCell>{reserva.cliente}</TableCell>
                  <TableCell>{reserva.numero}</TableCell>
                  <TableCell>{reserva.estado}</TableCell>
                  <TableCell>{formatDate(reserva.data_in)}</TableCell>
                  <TableCell>{formatDate(reserva.data_out)}</TableCell>
                  <TableCell>{reserva.dias}</TableCell>
                  <TableCell>{reserva.total.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
                {isLoading && (
                    <TableRow>
                        <TableCell  align="center" colSpan={9}>
                            <LinearProgress variant='indeterminate'/>
                        </TableCell>
                    </TableRow>
                )}
            </TableFooter>
          </Table>
        </TableContainer>
      </Box>
      <MyModalAlerta
        open={modalVisivel}
        onClose={()=>setModalVisivel(false)}
      >
        <Typography 
            variant='h6'
            sx={{paddingY: 2}}
        >
            Deseja eliminar a reserva?
        </Typography>
        <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={elimReserva}
            endIcon={<Icon>delete</Icon>}
        >Eliminar</Button>
      </MyModalAlerta>
      <MyModalAlerta
        open={modalVisivelConfirmar}
        onClose={()=>setModalVisivelConfirmar(false)}
      >
        <Typography 
            variant='h6'
            sx={{paddingY: 2}}
        >
            Deseja confirmar a reserva?
        </Typography>
        <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={confirmarReserva}
            endIcon={<Icon>check</Icon>}
        >Confirmar</Button>
      </MyModalAlerta>
    </LayoutBaseDePagina>
  );
};
