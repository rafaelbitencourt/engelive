import { 
  DashboardLayout, 
  MainLayout 
} from 'components';

import {
  Home,
  Login,
  NotFound,
  Register,
  Obras,
  Obra,
  Projetos,
  Projeto,
  Detalhes,
  Detalhe,
  Plantas,
  Planta,
  PlantaDetalhes,
  TiposProjetos,
  TipoProjeto
} from 'pages'

import { Navigate } from 'react-router-dom';

const routes = (isLoggedIn) => [
  {
    path: 'app',
    element: isLoggedIn ? <DashboardLayout /> : <Navigate to="/login" />,
    children: [
      { path: 'obras', element: <Obras /> },
      { path: 'obra', element: <Obra /> },
      { path: 'obra/:idobra', element: <Obra /> },
      { path: 'obra/:idobra/projetos', element: <Projetos /> },
      { path: 'obra/:idobra/projeto', element: <Projeto /> },
      { path: 'obra/:idobra/projeto/:idprojeto', element: <Projeto /> },
      { path: 'obra/:idobra/projeto/:idprojeto/detalhes', element: <Detalhes /> },
      { path: 'obra/:idobra/projeto/:idprojeto/detalhe', element: <Detalhe /> },
      { path: 'obra/:idobra/projeto/:idprojeto/detalhe/:iddetalhe', element: <Detalhe /> },
      { path: 'obra/:idobra/projeto/:idprojeto/plantas', element: <Plantas /> },
      { path: 'obra/:idobra/projeto/:idprojeto/planta', element: <Planta /> },
      { path: 'obra/:idobra/projeto/:idprojeto/planta/:idplanta', element: <Planta /> },
      { path: 'obra/:idobra/projeto/:idprojeto/planta/:idplanta/detalhes', element: <PlantaDetalhes /> },
      { path: 'tiposprojetos', element: <TiposProjetos /> },
      { path: 'tipoprojeto', element: <TipoProjeto /> },
      { path: 'tipoprojeto/:idtipoprojeto', element: <TipoProjeto /> },
      { path: '*', element: <NotFound /> }
    ]
  },
  {
    path: '/',
    element: !isLoggedIn ? <MainLayout /> : <Navigate to="/app/obras" />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '/', element: <Home /> },
      { path: '*', element: <NotFound /> }
    ]
  }
];

export default routes;