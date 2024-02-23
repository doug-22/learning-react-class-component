import { Component } from 'react';
import './styles.sass';
import Button from '../Button';
import { AiOutlinePlus } from 'react-icons/ai';
// import RepoService from '../../services/repoService';
import { getItemLocalStorage } from '../../functions';
import PropTypes from 'prop-types';

class AddRepositoryButton extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      open: false
    };

    this.addRepository = this.addRepository.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleOpenModal = this.handleOpenModal.bind(this);
  }

  addRepository() {
    const repos = getItemLocalStorage('REPOS') ?? [];
    if (repos.find((item) => item?.name === this.state.value)) {
      return;
    }
    this.props.handleSubmit(this.state.value);
    this.handleOpenModal();
  }

  onChange(e) {
    const { value } = e.target;
    this.setState({ value: value });
  }

  handleOpenModal() {
    this.setState({ open: !this.state.open });
  }

  render() {
    const { open } = this.state;

    return (
      <div className="wrapper-add-repository-component">
        <Button
          variant="icon-button-secondary"
          icon={<AiOutlinePlus size={25} />}
          onClick={this.handleOpenModal}
        />
        {open && (
          <div className="wrapper-add-repository-content">
            <div className="wrapper-add-repository-input">
              <h5>New repository</h5>
              <span>
                Repository <strong>*</strong>
              </span>
              <input
                type="text"
                value={this.state.value}
                onChange={this.onChange}
                placeholder="Repository name"
              />
            </div>
            <div className="wrapper-add-repository-buttons">
              <button
                className="button-cancel-repository"
                onClick={this.handleOpenModal}
              >
                Cancel
              </button>
              <button
                className="button-add-repository"
                onClick={this.addRepository}
                disabled={!this.state.value}
              >
                Add
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

AddRepositoryButton.propTypes = {
  handleSubmit: PropTypes.func.isRequired
};

export default AddRepositoryButton;
