import { Component } from 'react';
import Icon from '../../assets/icon-repo.svg';
import './styles.sass';
import Button from '../Button';
import { AiOutlineStar, AiFillStar } from 'react-icons/ai';
import { FaTrashCan } from 'react-icons/fa6';
import PropTypes from 'prop-types';

class Card extends Component {
  constructor(props) {
    super(props);

    this.state = {
      header: { id: '', title: 'Título', favorite: false },
      body: [
        { label: 'Stars', value: '' },
        { label: 'Forks', value: '' },
        { label: 'Open Issues', value: '' },
        { label: 'Age', value: '' },
        { label: 'Last Commit', value: '' },
        { label: 'License', value: '' }
      ],
      languages: ''
    };
  }

  componentDidMount() {
    this.setState({
      ...this.state,
      header: {
        id: this.props.data.id,
        title: this.props.data.name,
        favorite: this.props.data.favorite
      },
      body: [
        { label: 'Stars', value: this.props.data.stars },
        { label: 'Forks', value: this.props.data.forks },
        { label: 'Open Issues', value: this.props.data.openIssues },
        { label: 'Age', value: this.props.data.age },
        { label: 'Last Commit', value: this.props.data.lastCommit },
        {
          label: 'License',
          value: this.props.data.license?.name || 'N/A'
        }
      ],
      languages: this.props.data.language.toUpperCase()
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data !== this.props.data) {
      this.setState({
        ...this.state,
        header: {
          id: this.props.data.id,
          title: this.props.data.name,
          favorite: this.props.data.favorite
        },
        body: [
          { label: 'Stars', value: this.props.data.stars },
          { label: 'Forks', value: this.props.data.forks },
          { label: 'Open Issues', value: this.props.data.openIssues },
          { label: 'Age', value: this.props.data.age },
          { label: 'Last Commit', value: this.props.data.lastCommit },
          {
            label: 'License',
            value: this.props.data.license?.name || 'N/A'
          }
        ],
        languages: this.props.data.language.toUpperCase()
      });
    }
  }

  render() {
    const { header, body, languages } = this.state;
    const { onFavorite, onDelete, type = 'card' } = this.props;

    return (
      <div
        className={`wrapper-card-component ${type === 'list' ? 'list' : 'card'}`}
      >
        <div className={`header-card ${type === 'list' ? 'list' : 'card'}`}>
          <img src={Icon} alt="ìcone Card" />
          <h1>{header.title}</h1>
          <div className="wrapper-icons">
            <Button
              variant="icon-button-primary"
              icon={
                header.favorite ? (
                  <AiFillStar size={15} />
                ) : (
                  <AiOutlineStar size={15} />
                )
              }
              onClick={() => onFavorite(header.id)}
            />
            <Button
              variant="icon-button-primary"
              icon={<FaTrashCan size={20} />}
              onClick={() => onDelete(header.id)}
            />
          </div>
        </div>
        <div className={`body-card ${type === 'list' ? 'list' : 'card'}`}>
          {body.map((item, idx) => (
            <p key={idx}>
              <strong>{item.label}</strong> {item.value}
            </p>
          ))}
        </div>
        <div className="footer-card">
          <span>{languages}</span>
        </div>
      </div>
    );
  }
}

Card.propTypes = {
  onFavorite: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
  type: PropTypes.string
};

export default Card;
