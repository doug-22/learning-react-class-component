import { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.sass';

class Button extends Component {
  render() {
    const { label, onClick, type = 'primary' } = this.props;

    return (
      <button className={type} onClick={onClick}>
        {label}
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  type: PropTypes.string
};

export default Button;
