import { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.sass';

class Button extends Component {
  render() {
    const {
      label,
      onClick,
      variant = 'primary',
      type = 'button',
      icon
    } = this.props;

    return (
      <button className={variant} onClick={onClick} type={type}>
        {label}
        {icon}
      </button>
    );
  }
}

Button.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func,
  variant: PropTypes.string,
  type: PropTypes.string,
  icon: PropTypes.element
};

export default Button;
