import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Typography
} from '@material-ui/core';

const NotFound = () => (
  <>
    <Helmet>
      <title>Página indisponível | Engelive</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center'
      }}
    >
      <Container maxWidth="md">
        <Typography
          align="center"
          color="textPrimary"
          variant="h1"
        >
          Esta página não está disponível
        </Typography>
        <Typography
          align="center"
          color="textPrimary"
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
              // maxWidth: '30%',
              minWidth: '40%',
              width: 300
            }}
          />
        </Box>
      </Container>
    </Box>
  </>
);

export default NotFound;
