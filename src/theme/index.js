import { createMuiTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#F4F6F8',
      paper: colors.common.white
    },
    primary: {
      light: '#676767',
      main: '#424242',
      dark: '#2e2e2e',
      contrastText: '#ffffff',
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c',
      white: colors.common.white
    }
  },
  shadows,
  typography
});

export default theme;
