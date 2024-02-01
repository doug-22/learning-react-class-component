import { Component } from 'react';
import { Navigate } from 'react-router-dom';

class PrivateRoute extends Component {
  render() {
    const { isAuthenticated, component: Component } = this.props;
    return isAuthenticated ? <Component /> : <Navigate to="/" />;
  }
}

export default PrivateRoute;
