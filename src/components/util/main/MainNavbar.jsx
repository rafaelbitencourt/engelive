import { Link as RouterLink } from 'react-router-dom';
import { AppBar, Toolbar } from '@material-ui/core';
import { Logo } from 'components';

const MainNavbar = (props) => (
  <AppBar
    elevation={0}
    {...props}
  >
    <Toolbar sx={{ height: 64 }}>
      <RouterLink to="/">
        <Logo />
      </RouterLink>
    </Toolbar>
  </AppBar>
);

export default MainNavbar;
