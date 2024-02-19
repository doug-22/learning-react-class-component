import { Component } from 'react';
import { IoIosArrowDown } from 'react-icons/io';
import PropTypes from 'prop-types';
import './styles.sass';
import Button from '../Button';
// import { PiListFill } from 'react-icons/pi';

class Select extends Component {
  constructor(props) {
    super(props);

    this.state = {
      valueFilter: props.value,
      options: props.options,
      openSelect: false
    };

    this.handleOpenSelect = this.handleOpenSelect.bind(this);
    this.handleCloseSelect = this.handleCloseSelect.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.value !== this.props.value) {
      this.setState({
        valueFilter: this.state.options.find(
          (item) => item.value === this.props.value
        ).label
      });
    }
  }

  handleOpenSelect(e, state) {
    if (e.target.tagName === 'LI') {
      this.setState({ openSelect: false });
      return;
    }
    if (state === 'open' && !this.state.openSelect) {
      this.setState({ openSelect: true });
      return;
    }
    if (state === 'close') {
      this.handleCloseSelect();
    }
  }

  handleCloseSelect() {
    setTimeout(() => {
      this.setState({ openSelect: false });
    }, 70);
  }

  handleChange(e) {
    const { value } = e.target;
    this.setState({ valueFilter: value });
  }

  handleClick(item) {
    this.props.onClick(item);
    this.setState({ valueFilter: item.label });
  }

  render() {
    const { openSelect, valueFilter, options } = this.state;
    const { placeholder = 'placeholder', type = 'default', value } = this.props;

    const optionsFiltered =
      type === 'default'
        ? options.filter((item) =>
            item.label.toLowerCase().includes(valueFilter.toLowerCase())
          )
        : options;

    return (
      <>
        {type === 'default' && (
          <div
            className="wrapper-select-component"
            onClick={(e) => this.handleOpenSelect(e, 'open')}
            onBlur={(e) => this.handleOpenSelect(e, 'close')}
          >
            <div className="wrapper-input-select">
              <input
                type="text"
                value={valueFilter}
                onChange={this.handleChange}
                placeholder={placeholder}
                className={`${valueFilter ? 'valid' : 'not-valid'}`}
              />
              <IoIosArrowDown className="arrow-select" />
            </div>

            <ul
              id="wrapper-options-select"
              className={`${openSelect ? 'options-open' : 'options-close'}`}
            >
              {optionsFiltered.map((item) => (
                <li key={item.value} onClick={() => this.handleClick(item)}>
                  {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
        {type === 'button' && (
          <div
            className="wrapper-select-component button-toogle"
            onClick={(e) => this.handleOpenSelect(e, 'open')}
            onBlur={(e) => this.handleOpenSelect(e, 'close')}
          >
            <Button
              variant="icon-button-primary"
              icon={optionsFiltered.find((item) => item?.value === value)?.icon}
            />

            <ul
              id="wrapper-options-select"
              className={`${openSelect ? 'options-open button-toogle' : 'options-close'}`}
            >
              {optionsFiltered.map((item) => (
                <li key={item.value} onClick={() => this.handleClick(item)}>
                  {item?.icon} {item.label}
                </li>
              ))}
            </ul>
          </div>
        )}
      </>
    );
  }
}

Select.propTypes = {
  options: PropTypes.array.isRequired,
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.string
};

export default Select;
