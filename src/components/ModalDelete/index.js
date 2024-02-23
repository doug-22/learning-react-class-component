import { Component } from 'react';
import PropTypes from 'prop-types';
import { GoAlertFill } from 'react-icons/go';
import { AiOutlineClose } from 'react-icons/ai';
import './styles.sass';
import Button from '../Button';

class ModalDelete extends Component {
  render() {
    const { onDelete, data, onClose } = this.props;
    return (
      <div className="wrapper-modal-delete-component">
        <div className="wrapper-modal-container">
          <div className="wrapper-header-modal">
            <div>
              <GoAlertFill size={25} />
              <h3>Delete repository</h3>
            </div>
            <Button
              variant="icon-button-primary"
              icon={<AiOutlineClose size={25} />}
              onClick={onClose}
            />
          </div>
          <div className="wrapper-body-modal">
            <p>
              Are you sure to delete the <strong>{data.name}</strong>{' '}
              repository?
            </p>
          </div>
          <div className="wrapper-footer-modal">
            <button className="button-cancel-delete" onClick={onClose}>
              Cancel
            </button>
            <button
              className="button-confirm-delete"
              onClick={() => onDelete(data.id)}
            >
              Add
            </button>
          </div>
        </div>
      </div>
    );
  }
}

ModalDelete.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
};

export default ModalDelete;
