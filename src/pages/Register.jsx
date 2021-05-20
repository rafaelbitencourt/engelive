import { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography,
  FormHelperText
} from '@material-ui/core';
import AuthService from '../services/auth.service';

const Register = () => {
  const navigate = useNavigate();
  const [msgErro, setMsgErro] = useState(null);

  const cbSubmit = (values, { setSubmitting }) => {
    AuthService.register(values)
      .then(
        () => {
          navigate('/login');
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
        <title>Criar conta | Engelive</title>
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
        </Container>
      </Box>
    </>
  );
};

export default Register;
