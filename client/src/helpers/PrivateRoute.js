import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Cookies from 'universal-cookie';

class PrivateRoute extends React.Component {
    state = {
        haveAccess: false,
        loaded: false,
    }
  
    componentDidMount() {
        const cookies = new Cookies();
        const username = cookies.get('username');
        if (username) {
            this.setState({
                haveAccess: true,
                loaded: true,
            })
        }
    }

    render() {
      const { component: Component, ...rest } = this.props
      const { loaded, haveAccess } = this.state
      if (!loaded) return null
      return (
        <Route {...rest} render={(props) => (
          haveAccess ? <Component {...props} /> : <Redirect to='/login' />
        )} />
      )
    }
}

export default PrivateRoute;

