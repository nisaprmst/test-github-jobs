import { Switch, Route, BrowserRouter, withRouter } from 'react-router-dom';
import NotFound from './components/NotFound';
import Navbar from './components/Navbar';
import Search from './components/Search';
import Details from './components/Details'
import PrivateRoute from './helpers/PrivateRoute';
import Login from './components/Login';

import './App.css';

function App() {
  const DefaultRoutes = () => {
    return (
      <div className="App">
        <Navbar />
        <Switch>
          <PrivateRoute path="/jobs" exact component={Search} />
          <PrivateRoute path="/job/details" component={Details} />
          <PrivateRoute component={NotFound} />
        </Switch>
      </div>
    )
  };

  const LoginRoutes = () => {
    return (
      <div>
        <Switch>
          <Route path="/login" exact component={Login} />
        </Switch>
      </div>
    )
  }

  return (
    <BrowserRouter>
      <Switch>
        <Route exact component={LoginRoutes} path="/login" />
        <Route exact component={DefaultRoutes} />
      </Switch>
    </BrowserRouter>
  );

}

export default App;
