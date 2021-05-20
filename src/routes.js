import { Navigate } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import MainLayout from './components/MainLayout';
import Obras from './pages/Obras';
import Obra from './pages/Obra';
import Projetos from './pages/Projetos';
import Projeto from './pages/Projeto';
import Detalhes from './pages/Detalhes';
import Detalhe from './pages/Detalhe';
import Plantas from './pages/Plantas';
import Planta from './pages/Planta';
import PlantaDetalhes from './pages/PlantaDetalhes';

import TiposProjetos from './pages/TiposProjetos';
import TipoProjeto from './pages/TipoProjeto';

import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
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
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Home /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;