import { useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { experimentalStyled } from '@material-ui/core';
import DashboardNavbar from './DashboardNavbar';
import DashboardSidebar from './DashboardSidebar';
import AuthService from 'services/auth.service';

const DashboardLayoutRoot = experimentalStyled('div')(
  ({ theme }) => ({
    backgroundColor: theme.palette.background.default,
    display: 'flex',
    height: '100%',
    overflow: 'hidden',
    width: '100%'
  })
);

const DashboardLayoutWrapper = experimentalStyled('div')(
  ({ theme }) => ({
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: 64,
    [theme.breakpoints.up('lg')]: {
      paddingLeft: 256
    }
  })
);

const DashboardLayoutContainer = experimentalStyled('div')({
  display: 'flex',
  flex: '1 1 auto',
  overflow: 'hidden'
});

const DashboardLayoutContent = experimentalStyled('div')({
  flex: '1 1 auto',
  height: '100%',
  overflow: 'auto'
});

const DashboardLayout = () => {
  const [isMobileNavOpen, setMobileNavOpen] = useState(false);
  const usuario = AuthService.getCurrentUser();
  let navigate = useNavigate();

  const logOut = () => {
    AuthService.logout();
    navigate("/");
  }

  return (
    <DashboardLayoutRoot>
      <DashboardNavbar
        onMobileNavOpen={() => setMobileNavOpen(true)}
        logOut={logOut}
      />
      <DashboardSidebar
        onMobileClose={() => setMobileNavOpen(false)}
        openMobile={isMobileNavOpen}
        logOut={logOut}
        user={usuario}
      />
      <DashboardLayoutWrapper>
        <DashboardLayoutContainer>
          <DashboardLayoutContent>
            <Outlet />
          </DashboardLayoutContent>
        </DashboardLayoutContainer>
      </DashboardLayoutWrapper>
    </DashboardLayoutRoot>
  );
};

export default DashboardLayout;
