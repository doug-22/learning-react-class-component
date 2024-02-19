import { Component } from 'react';
import PropTypes from 'prop-types';
import './styles.sass';

class Divider extends Component {
  render() {
    const { text } = this.props;
    return (
      <div className="wrapper-divider-component">
        {text && <span>{text}</span>}
      </div>
    );
  }
}

Divider.propTypes = {
  text: PropTypes.string
};

export default Divider;
