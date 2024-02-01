import { Component } from 'react';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { AiFillGithub } from 'react-icons/ai';
import './styles.sass';
import Divider from '../../components/Divider';

class LoginPage extends Component {
  constructor(props) {
    super(props);
    this.state = { value: '' };

    this.onChange = this.onChange.bind(this);
  }

  onChange(e) {
    this.setState({ value: e.target.value });
  }

  render() {
    return (
      <main>
        <div className="wrapper-form">
          <AiFillGithub className="icon-login" size={50} />
          <h1 className="title-login">Sign In</h1>
          <Button
            label="Entrar com Github"
            onClick={() => console.log('clicou')}
          />
          <Divider text="ou entre com o seu nome" />
          <Input
            label="Nome"
            placeholder="Insira o seu nome"
            onChange={this.onChange}
            required
          />
          <Button
            label="Entrar"
            type="secondary"
            onClick={() => console.log(this.state.value)}
          />
        </div>
      </main>
    );
  }
}

export default LoginPage;
