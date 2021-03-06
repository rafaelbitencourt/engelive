import { Link as RouterLink, Navigate } from 'react-router-dom';
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

const Register = () => {
  const [
    { data, loading, error },
    executeRegister
  ] = useAxios(
    {
      url: 'auth/signup',
      method: 'POST'
    },
    { manual: true }
  )

  const cbSubmit = (values) => {
    executeRegister({
      data: values
    })
  };

  if (data) return <Navigate to="/login" />

  return (
    <Pagina
      titulo="Criar conta"
      propsContainer={{ height: 1, maxWidth: "sm" }}
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
            email: '',
            usuario: '',
            senha: '',
            confirmacaoSenha: ''
          }}
          validationSchema={
            Yup.object().shape({
              usuario: Yup.string().max(255).required('Usuário é obrigatório'),
              email: Yup.string().email('E-mail inválido').max(255).required('E-mail é obrigatório'),
              senha: Yup.string().max(255).required('Senha é obrigatória'),
              confirmacaoSenha: Yup.string().oneOf([Yup.ref('senha'), null], 'As senhas não conferem')
            })
          }
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
                  Criar nova conta
                </Typography>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="body2"
                >
                  Use e-mail, usuário e senha para criar uma conta
                </Typography>
              </Box>
              <TextField
                error={Boolean(touched.usuario && errors.usuario)}
                fullWidth
                helperText={touched.usuario && errors.usuario}
                label="Usuário"
                margin="normal"
                name="usuario"
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.usuario}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.email && errors.email)}
                fullWidth
                helperText={touched.email && errors.email}
                label="E-mail"
                margin="normal"
                name="email"
                onBlur={handleBlur}
                onChange={handleChange}
                type="email"
                value={values.email}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.senha && errors.senha)}
                fullWidth
                helperText={touched.senha && errors.senha}
                label="Senha"
                margin="normal"
                name="senha"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.senha}
                variant="outlined"
              />
              <TextField
                error={Boolean(touched.confirmacaoSenha && errors.confirmacaoSenha)}
                fullWidth
                helperText={touched.confirmacaoSenha && errors.confirmacaoSenha}
                label="Confirmação de senha"
                margin="normal"
                name="confirmacaoSenha"
                onBlur={handleBlur}
                onChange={handleChange}
                type="password"
                value={values.confirmacaoSenha}
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
                  Criar conta
                </Button>
              </Box>
              <Typography
                color="textSecondary"
                variant="body1"
              >
                Tem conta?
                {' '}
                <Link
                  component={RouterLink}
                  to="/login"
                  variant="h6"
                >
                  Entrar
                </Link>
              </Typography>
            </form>
          )}
        </Formik>
      </Box>
    </Pagina>
  );
};

export default Register;
