import { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.sass';

class Input extends Component {
  render() {
    const { label, placeholder, onChange, required } = this.props;
    return (
      <div className="wrapper-input">
        <label htmlFor="">
          {label}
          {required && <span>*</span>}
        </label>
        <input
          type="text"
          placeholder={placeholder}
          onChange={onChange}
          required={required}
        />
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default Input;
