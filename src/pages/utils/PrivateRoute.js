import { Component } from 'react';
import { Navigate } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    const { isAuthenticated, component: Component } = this.props;

    if (isAuthenticated) {
      return <Component />;
    }
    return <Navigate to={{ pathname: '/' }} />;
  }
}

export default PrivateRoute;
