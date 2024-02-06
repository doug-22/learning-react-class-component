import { Component } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import AuthService from '../services/authService';

class PrivateRoute extends Component {
  render() {
    const { component } = this.props;
    if (!AuthService.isAuthenticated()) {
      return <Navigate to="/" />;
    }
    return component;
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.element.isRequired
};

export default PrivateRoute;
