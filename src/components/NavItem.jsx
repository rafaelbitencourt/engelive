import {
  NavLink as RouterLink,
  matchPath,
  useLocation
} from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button, ListItem } from '@material-ui/core';

const NavItem = ({
  href,
  icon: Icon,
  title,
  cb,
  ...rest
}) => {
  const location = useLocation();

  const active = href ? !!matchPath({
    path: href,
    end: false
  }, location.pathname) : false;

  return (
    <Button
      component={RouterLink}
      sx={{
        color: 'text.secondary',
        fontWeight: 'bold',
        justifyContent: 'flex-start',
        letterSpacing: 0,
        textTransform: 'none',
        width: '100%',
        ...(active && {
          color: 'primary.main'
        }),
        '& svg': {
          mr: 1
        }
      }}
      to={href}
      onClick={cb}
    >
      {Icon && (
        <Icon size="20" />
      )}
      <span>
        {title}
      </span>
    </Button>
  );
};

NavItem.propTypes = {
  href: PropTypes.string,
  icon: PropTypes.elementType,
  title: PropTypes.string
};

export default NavItem;
