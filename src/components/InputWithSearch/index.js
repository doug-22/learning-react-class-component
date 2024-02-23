import { Component } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import PropTypes from 'prop-types';
import Button from '../Button';
import './styles.sass';

class InputWithSearch extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: ''
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    const { value } = e.target;
    this.setState({ value: value });
  }

  render() {
    const { value } = this.state;
    const { onClick, placeholder } = this.props;
    return (
      <div className="wrapper-input-search-component">
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={this.onChange}
        />
        <Button
          variant="icon-button-primary"
          icon={<AiOutlineSearch size={20} />}
          onClick={() => onClick(value)}
        />
      </div>
    );
  }
}

InputWithSearch.propTypes = {
  onClick: PropTypes.func,
  placeholder: PropTypes.string
};

export default InputWithSearch;
