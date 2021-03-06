import { useEffect } from "react";
import { useAuth } from 'context';
import { Link as RouterLink } from 'react-router-dom';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Link,
  TextField,
  Typography,
  FormHelperText
} from '@material-ui/core';
import useAxios from 'axios-hooks';
import { Pagina } from 'components';

const Login = () => {
  const { setUser } = useAuth();

  const [
    { data, loading, error },
    executeLogin
  ] = useAxios(
    {
      url: 'auth/signin',
      method: 'POST'
    },
    { manual: true }
  )

  const cbSubmit = (values) => {
    executeLogin({
      data: {
        usuario: values.user,
        senha: values.password
      }
    })
  };

  useEffect(() => {
    if (data)
      setUser(data);
  }, [data, setUser]);

  return (
    <Pagina
      titulo="Entrar"
      propsContainer={{ height: 1, maxWidth:"sm" }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          height: 1
        }}
      >
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
                {error &&
                  <FormHelperText error>
                    {error}
                  </FormHelperText>}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={loading}
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
      </Box>
    </Pagina>
  );
};

export default Login;
