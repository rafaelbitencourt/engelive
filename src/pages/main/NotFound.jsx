import {
  Box,
  Typography
} from '@material-ui/core';
import { Pagina } from 'components';

const NotFound = () => (
  <Pagina
    titulo="Página indisponível"
    propsContainer={{ height: 1, maxWidth: "md" }}
  >
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 1
      }}
    >
      <Typography
        align="center"
        variant="h1"
      >
        Esta página não está disponível
      </Typography>
      <Typography
        align="center"
        variant="subtitle2"
      >
        O link pode não estar funcionando ou a página pode ter sido removida.
        Verifique se o link que você está tentando abrir está correto.
      </Typography>
      <Box sx={{ textAlign: 'center' }}>
        <img
          alt="Under development"
          src="/logo.png"
          style={{
            marginTop: 50,
            display: 'inline-block',
            minWidth: '40%',
            width: 300
          }}
        />
      </Box>
    </Box>
  </Pagina>
);

export default NotFound;
