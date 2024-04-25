import { Box, Button, Icon, IconButton, Paper, TextField, useTheme } from '@mui/material';

import { Environment } from '../../environment';


interface IFerramentasDaListagemProps {
  valorDatain?: Date;
  valorDataout?: Date;
  mostrarInputBusca?: boolean;
  aoMudarDatain?: (novaData: Date) => void;
  aoMudarDataout?: (novaData: Date) => void;
  aoClicarEmPesquisar?: () => void;
  textoBotaoNovo?: string;
  mostrarBotaoNovo?: boolean;
  aoClicarEmNovo?: () => void;
}
export const FerramentasDaListagem: React.FC<IFerramentasDaListagemProps> = ({
  valorDatain,
  valorDataout,
  aoMudarDatain,
  aoMudarDataout,
  mostrarInputBusca = false,
  aoClicarEmPesquisar,
  aoClicarEmNovo,
  textoBotaoNovo = 'Nova',
  mostrarBotaoNovo = true,
}) => {
  const theme = useTheme();

  return (
    <Box
      gap={1}
      padding={2}
      paddingX={1}
      display="flex"
      alignItems="center"
      height={theme.spacing(2)}
      component={Paper}
    >
      {mostrarInputBusca && (
        <>
          <TextField 
            label="Ckeck-in"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }} 
            onChange={(e) => aoMudarDatain?.(new Date(e.target.value))}
            value={valorDatain}
            size="small"
          />
          <TextField 
            label="Ckeck-out"
            type="date"
            fullWidth
            InputLabelProps={{ shrink: true }} 
            onChange={(e) => aoMudarDataout?.(new Date(e.target.value))}
            value={valorDataout}
            size="small"
          />
          <Button
            color='primary'
            onClick={aoClicarEmPesquisar}
            variant='contained'
          ><Icon>search</Icon></Button>
      </>
      )}

      <Box flex={1} display="flex" justifyContent="end">
        {mostrarBotaoNovo && (
          <Button
            color='primary'
            disableElevation
            variant='contained'
            onClick={aoClicarEmNovo}
            endIcon={<Icon>add</Icon>}
          >{textoBotaoNovo}</Button>
        )}
      </Box>
    </Box>
  );
};
