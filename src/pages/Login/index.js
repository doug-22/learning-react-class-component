import { Component } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { AiFillGithub } from 'react-icons/ai';
import './styles.sass';
import Divider from '../../components/Divider';
import AuthService from '../../services/authService';
import { withRouter } from '../../utils/withRouter';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.onChange = this.onChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e) {
    e.preventDefault();
    AuthService.login(this.state.value);
    this.props.navigate('/dashboard');
  }

  render() {
    return (
      <main>
        <div className="wrapper-form">
          <AiFillGithub className="icon-login" size={50} />
          <h1 className="title-login">Sign In</h1>
          <Button label="Entrar com Github" onClick={this.teste} />
          <Divider text="ou entre com o seu nome" />
          <form onSubmit={this.handleSubmit}>
            <Input
              label="Nome"
              placeholder="Insira o seu nome"
              onChange={this.onChange}
              required
            />
            <Button label="Entrar" variant="secondary" type="submit" />
          </form>
        </div>
      </main>
    );
  }
}

export default withRouter(LoginPage);
