import {
  Typography,
  Box
} from '@material-ui/core';

const Logo = () => (
  <Box display="flex" flexDirection="row" alignItems="center" justifyContent="center">
    <img
      alt="Logo"
      src="/logo.png"
      height={50}
    />
    <Box m={1}/>
    <Typography
      align="center"
      color="white"
      variant="engelive"
    >
      Engelive
    </Typography>
  </Box>
);

export default Logo;
