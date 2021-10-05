//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'
import 'font-awesome/css/font-awesome.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css' // lista de icones https://icons.getbootstrap.com/
import Menu from "./componentes/Menu";
import Estado from "./componentes/estado/Estado";
import Cidade from "./componentes/cidade/Cidade";
import Pessoa from "./componentes/pessoa/Pessoa";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import Login from './componentes/login/Login'
import PrivateRoute  from './componentes/PrivateRoute';

function App() {
  return (
    <Router>
      <Menu />
      <Switch>
        <PrivateRoute exact path="/estado" component={Estado} />
        <PrivateRoute exact path="/cidade" component={Cidade}/>
        <PrivateRoute exact path="/pessoa" component={Pessoa}/>
        <Route exact path="/login" render={() => <Login />} />
      </Switch>
    </Router>
  );
}

export default App;
