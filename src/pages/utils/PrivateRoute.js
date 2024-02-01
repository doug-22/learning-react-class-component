import { Component } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

class PrivateRoute extends Component {
  render() {
    const { isAuthenticated, component } = this.props;
    return isAuthenticated ? component : <Navigate to="/" />;
  }
}

PrivateRoute.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  component: PropTypes.element.isRequired
};

export default PrivateRoute;
