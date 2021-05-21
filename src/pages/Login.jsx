import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
  FormHelperText
} from '@material-ui/core';
import AuthService from '../services/auth.service';

const Login = () => {
  const navigate = useNavigate();
  const [msgErro, setMsgErro] = useState(null);

  const cbSubmit = (values, { setSubmitting }) => {
    setMsgErro(null);
    AuthService.login(values.user, values.password)
      .then(
        () => {
          navigate('/app/obras');
        },
        (error) => {
          setSubmitting(false);
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setMsgErro(resMessage);
        }
      );
  };

  return (
    <>
      <Helmet>
        <title>Entrar | Engelive</title>
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
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              user: '',
              password: ''
            }}
            validationSchema={Yup.object().shape({
              user: Yup.string().max(255).required('Usuário é obrigatório'),
              password: Yup.string().max(255).required('Senha é obrigatória')
            })}
            onSubmit={cbSubmit}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 3 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Entrar
                  </Typography>
                  <Typography
                    color="textSecondary"
                    variant="body2"
                  >
                    Entrar com usuário e senha
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.user && errors.user)}
                  fullWidth
                  helperText={touched.user && errors.user}
                  label="Usuário"
                  margin="normal"
                  name="user"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.user}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Senha"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                {msgErro &&
                  <FormHelperText error>
                    {msgErro}
                  </FormHelperText>}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Entrar
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Não tem uma conta?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/register"
                    variant="h6"
                  >
                    Criar conta
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Login;
