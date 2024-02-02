import { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.sass';

class Input extends Component {
  render() {
    const { label, placeholder, onChange, required, error } = this.props;
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
          className={`${error && 'error'}`}
        />
        <span className="message-error">{error}</span>
      </div>
    );
  }
}

Input.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  required: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string
};

export default Input;
