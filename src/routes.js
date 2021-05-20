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


// import Account from 'src/pages/Account';
// import CustomerList from 'src/pages/CustomerList';
// import Dashboard from 'src/pages/Dashboard';
// import Login from 'src/pages/Login';
// import NotFound from 'src/pages/NotFound';
// import ProductList from 'src/pages/ProductList';
// import Register from 'src/pages/Register';
// import Settings from 'src/pages/Settings';

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

      // { path: 'dashboard', element: <Dashboard /> },
      // { path: 'products', element: <ProductList /> },
      // { path: 'settings', element: <Settings /> },
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


          {/* <PrivateRoute path="/obra/:idobra/projeto/:idprojeto/planta/:idplanta/detalhes" component={PlantaDetalhes} /> */}
          //         <PrivateRoute path="/obra/:idobra/projeto/:idprojeto/planta/:idplanta?" component={Planta} />
          //         <PrivateRoute path="/obra/:idobra/projeto/:idprojeto/plantas" component={Plantas} />
          //         <PrivateRoute path="/obra/:idobra/projeto/:idprojeto/detalhe/:iddetalhe?" component={Detalhe} />
          //         <PrivateRoute path="/obra/:idobra/projeto/:idprojeto/detalhes" component={Detalhes} />
          //         <PrivateRoute path="/obra/:idobra/projetos" component={Projetos} />
          //         <PrivateRoute path="/obra/:idobra/projeto/:idprojeto?" component={Projeto} />
          //         <PrivateRoute path="/obra/:idobra?" component={Obra} />
          //         <PrivateRoute path="/obras" component={Obras} />
           //         <PrivateRoute path="/tipos_projetos" component={TiposProjetos} />
           //         <PrivateRoute path="/tipo_projeto/:idtipoprojeto?" component={TipoProjeto} />
    //         <Route path="/register" component={Register} />
    //         <Route path="/login" component={Login} />            
    //         <Route path="/" component={Home}/>


    