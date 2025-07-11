import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Home from './pages/Home/Home';
import Menu from './pages/Menu/Menu';
import Register from './pages/Register/Register';
import Login from './pages/Login/login';
import Principal from './pages/Principal/principal';
import Tienda from './pages/Tienda/Tienda';
//import Consejos from './pages/Consejos/Consejos';
import Configuracion from './pages/Configuracion/configuracion';
import Resultado from './pages/Resultado/resultado'; // ajusta el path si es necesario

/* Estilos de Ionic */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Paleta de color oscuro del sistema */
import '@ionic/react/css/palettes/dark.system.css';

/* Variables personalizadas */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/home">
          <Home />
        </Route>
        <Route exact path="/menu">
          <Menu />
        </Route>
        <Route exact path="/register">
          <Register />
        </Route>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/principal">
          <Principal />
        </Route>
        <Route exact path="/resultado">
          <Resultado />
        </Route>
        <Route exact path="/tienda">
          <Tienda />
        </Route>
        <Route exact path="/">
          <Redirect to="/home" />
        </Route>
         <Route exact path="/configuracion">
          <Configuracion />
        </Route>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
