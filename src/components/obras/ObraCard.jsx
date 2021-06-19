import PropTypes from 'prop-types';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Grid,
  Typography
} from '@material-ui/core';
import { 
  HomeWork, 
  CalendarToday
} from '@material-ui/icons';
import { Link } from "react-router-dom";

const ObraCard = ({ obra, ...rest }) => (
  <Card
    component={Link}
    to={`/app/obra/${obra.id}`}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%'
    }}
    {...rest}
  >
    <CardContent>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          pb: 3
        }}
      >
        <HomeWork fontSize="large" color="action" />
      </Box>
      <Typography
        align="center"
        color="textPrimary"
        gutterBottom
        variant="h4"
      >
        {obra.nome}
      </Typography>
    </CardContent>
    <Box sx={{ flexGrow: 1 }} />
    <Divider />
    <Box sx={{ p: 2 }}>
        <Grid
          item
          sx={{
            alignItems: 'center',
            display: 'flex'
          }}
        >
      <CalendarToday color="action" />
      <Typography
        color="textSecondary"
        display="inline"
        sx={{ pl: 1 }}
        variant="body2"
      >
        {obra.previsao && new Date(obra.previsao).toLocaleDateString()}
      </Typography>
      </Grid>
    </Box>
  </Card>
);

ObraCard.propTypes = {
  obra: PropTypes.object.isRequired
};

export default ObraCard;