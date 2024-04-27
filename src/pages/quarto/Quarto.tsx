import React, { useState, useEffect } from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Icon, IconButton, TableFooter, LinearProgress, Button, TextField, Typography, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import {MyModal} from '../../shared/components/modal/Modal';
import { FerramentasDaListagem, MyModalAlerta } from '../../shared/components';
import { LayoutBaseDePagina } from '../../shared/layouts';
import {Api} from '../../shared/services/api/Index'
import { toast } from 'react-toastify';

interface QuartoData {
  id: number;
  numero: string;
  descricao: string;
  preco: number;
  estado: string;
  tipo: string;
}

export const Quarto: React.FC = () => {

    const notify = () => toast.success('Quarto adicionado!', { autoClose: 2000, position: 'bottom-right' });

    const notifyEliminar = () => toast.error('Eliminado com sucesso!', { autoClose: 2000, position: 'bottom-right' });

    const notifyEditar = () => toast.success('Editado com sucesso!', { autoClose: 2000, position: 'bottom-right' });

    const [quartos, setQuartos] = useState<QuartoData[]>([]);
    const [isLoading, setIsLoading] = useState(true)
    const [visivelModal, setVisivelModal] = useState(false)
    const [visivelModalAdicionar, setVisivelModalAdicionar] = useState(false)
    const [visivelModalEditar, setVisivelModalEditar] = useState(false)
    const [quarto, setQuarto] = useState(-1)
    const [numero, setNumero] = useState(-1)
    const [descricao, setDescricao] = useState('')
    const [preco, setPreco] = useState(0)

    const [tipoQuarto, setTipoQuarto] = useState('');
    const [estadoQuarto, setEstadoQuarto] = useState('');

  const abrirModal = (id: number) => {
    setQuarto(id)
    setVisivelModal(true)
  }

  const abrirModalEditar = (id: number, numero: number, tipo: string, descricao: string, preco: number, estado: string) => {
    setQuarto(id)
    setNumero(numero)
    setTipoQuarto(tipo)
    setDescricao(descricao)
    setPreco(preco)
    setEstadoQuarto(estado)
    setVisivelModalEditar(true)
  }

  
  const carregarQuartos = async () => {
    try {
      const response = await Api.get<QuartoData[]>('/');
      setQuartos(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Erro ao buscar os quartos:', error);
    }
  };

  const elimQuarto = () => {
    Api.delete(`/${quarto}`)
      .then(response => {
        notifyEliminar()
        setVisivelModal(false)
        carregarQuartos()
      })
      .catch(error => {
        console.error('Erro ao eliminar quarto:', error);
      });
    }
  
    const adicionarQuarto = () => {
      Api.post('/', {
        numero: numero,
        tipo: tipoQuarto,
        descricao: descricao,
        preco: preco,
        estado: 'livre'
      })
        .then(response => {
          console.log(response)
          notify()
          carregarQuartos()
          setVisivelModalAdicionar(false)
        })
        .catch(error => {
          console.error('Erro ao adicionar o quarto:', error);
      });
    }

    const editarQuarto = () => {
      Api.put(`/${quarto}`, {
        numero: numero,
        tipo: tipoQuarto,
        descricao: descricao,
        preco: preco,
        estado: estadoQuarto
      })
        .then(response => {
          console.log(response)
          notifyEditar()
          carregarQuartos()
          setVisivelModalEditar(false)
        })
        .catch(error => {
          console.error('Erro ao editar o quarto:', error);
      });
    }
  

  useEffect(() => {
  
    // Chamar carregarQuartos imediatamente
    carregarQuartos();
  
    // Chamar carregarQuartos a cada 1 minuto
    const intervalId = setInterval(carregarQuartos, 60000);
  
    // Limpar o intervalo ao desmontar o componente
    return () => clearInterval(intervalId);
  }, [quartos]);
  

  return (
    <LayoutBaseDePagina
      titulo='Quartos'
      barraDeFerramentas={
        <FerramentasDaListagem 
          mostrarBotaoNovo={true}
          textoBotaoNovo='Novo'
          aoClicarEmNovo={()=>setVisivelModalAdicionar(true)}
      />}
    >
      <Box width='100%' display='flex'>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Eliminar</TableCell>
                <TableCell>Editar</TableCell>
                <TableCell>Quarto</TableCell>
                <TableCell>Tipo</TableCell>
                <TableCell>Descrição</TableCell>
                <TableCell>Preço</TableCell>
                <TableCell>Estado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {quartos.map(quarto => (
                <TableRow key={quarto.id}>
                  <TableCell><IconButton onClick={()=>abrirModal(Number(quarto.id))} color='primary'><Icon>delete</Icon></IconButton></TableCell>
                  <TableCell><IconButton onClick={()=>abrirModalEditar(Number(quarto.id), Number(quarto.numero), quarto.tipo, quarto.descricao, Number(quarto.preco), quarto.estado)} color='primary'><Icon>edit</Icon></IconButton></TableCell>
                  <TableCell>{quarto.numero}</TableCell>
                  <TableCell>{quarto.tipo}</TableCell>
                  <TableCell>{quarto.descricao}</TableCell>
                  <TableCell>{quarto.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'AOA' })}</TableCell>
                  <TableCell>{quarto.estado}</TableCell>
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
        open={visivelModal}
        onClose={()=>setVisivelModal(false)}
      >
        <Typography 
            variant='h6'
            sx={{paddingY: 2}}
        >
            Deseja eliminar o quarto?
        </Typography>
        <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={elimQuarto}
            endIcon={<Icon>delete</Icon>}
        >Eliminar</Button>
      </MyModalAlerta>
      <MyModal
        open={visivelModalAdicionar}
        onClose={()=>setVisivelModalAdicionar(false)}
        titulo='Adicionar quarto'
      >
        <TextField 
            label="Quarto nº"
            type="number"
            fullWidth
            sx={{marginBottom: 2}}
            onChange={(e)=>setNumero(Number(e.target.value))}
            size="small"
        />
        <FormControl fullWidth size="small" sx={{marginBottom: 3}}>
            <InputLabel id="tipo-quarto-label">Tipo de quarto</InputLabel>
            <Select
                labelId="tipo-quarto-label"
                id="tipo-quarto"
                value={tipoQuarto}
                label="Tipo de quarto"
                onChange={(event)=>setTipoQuarto(event.target.value)}
                sx={{ textAlign: 'left' }}
            >
                <MenuItem value="Simples">Simples</MenuItem>
                <MenuItem value="Duplo">Duplo</MenuItem>
                <MenuItem value="VIP">VIP</MenuItem>
            </Select>
        </FormControl>
        <TextField 
            label="Descrição"
            type="text"
            fullWidth
            sx={{marginBottom: 2}}
            onChange={(e)=>setDescricao(e.target.value)}
            size="small"
            multiline={true}
        />
        <TextField 
            label="Preço"
            type="number"
            fullWidth
            sx={{marginBottom: 2}}
            onChange={(e)=>setPreco(Number(e.target.value))}
            size="small"
        />
        <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={adicionarQuarto}
            endIcon={<Icon>add_circle</Icon>}
        >Adicionar</Button>
      </MyModal>
      <MyModal
        open={visivelModalEditar}
        onClose={()=>setVisivelModalEditar(false)}
        titulo='Editar quarto'
      >
        <TextField 
            label="Quarto nº"
            type="number"
            fullWidth
            sx={{marginBottom: 2}}
            onChange={(e)=>setNumero(Number(e.target.value))}
            value={numero}
            size="small"
        />
        <FormControl fullWidth size="small" sx={{marginBottom: 3}}>
            <InputLabel id="tipo-quarto-label">Tipo de quarto</InputLabel>
            <Select
                labelId="tipo-quarto-label"
                id="tipo-quarto"
                value={tipoQuarto}
                label="Tipo de quarto"
                onChange={(event)=>setTipoQuarto(event.target.value)}
                sx={{ textAlign: 'left' }}
            >
                <MenuItem value="Simples">Simples</MenuItem>
                <MenuItem value="Duplo">Duplo</MenuItem>
                <MenuItem value="VIP">VIP</MenuItem>
            </Select>
        </FormControl>
        <TextField 
            label="Descrição"
            type="text"
            fullWidth
            sx={{marginBottom: 2}}
            onChange={(e)=>setDescricao(e.target.value)}
            size="small"
            multiline={true}
            value={descricao}
        />
        <TextField 
            label="Preço"
            type="number"
            fullWidth
            sx={{marginBottom: 2}}
            onChange={(e)=>setPreco(Number(e.target.value))}
            size="small"
            value={preco}
        />
        <FormControl fullWidth size="small" sx={{marginBottom: 3}}>
            <InputLabel id="estado-quarto-label">Estado</InputLabel>
            <Select
                labelId="estado-quarto-label"
                id="estado-quarto"
                value={estadoQuarto}
                label="Estado do quarto"
                onChange={(event)=>setEstadoQuarto(event.target.value)}
                sx={{ textAlign: 'left' }}
            >
                <MenuItem value="Livre">Livre</MenuItem>
                <MenuItem value="Ocupado">Ocupado</MenuItem>
            </Select>
        </FormControl>
        <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={editarQuarto}
            endIcon={<Icon>edit_circle</Icon>}
        >Editar</Button>
      </MyModal>
    </LayoutBaseDePagina>
  );
};
