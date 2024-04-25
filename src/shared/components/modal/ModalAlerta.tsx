import { ReactNode } from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { Divider, useMediaQuery, useTheme } from '@mui/material';

interface MyModalProps {
    children: ReactNode;
    open: boolean;
    onClose: () => void;
}

export const MyModalAlerta: React.FC<MyModalProps> = ({ children, open, onClose }) => {

    const theme = useTheme();
    const smDown = useMediaQuery(theme.breakpoints.down('sm'));
    const mdDown = useMediaQuery(theme.breakpoints.down('md'));
    const modalWidth = smDown ? 280 : mdDown ? 320 : '30%';

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: modalWidth,
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: 24,
        p: 4,
      };

  return (
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={onClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2" color='primary'>
              Alerta
            </Typography>
            <Divider color='0C68F0' sx={{marginY: 1}}/>
            <Typography id="transition-modal-description" sx={{ mt: 1, textAlign: 'center' }}>
              {children}
            </Typography>
          </Box>
        </Fade>
      </Modal>
  );
}