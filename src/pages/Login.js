import React from 'react';
import { connect } from 'react-redux';
import './Login.css';
import PropTypes from 'prop-types';
import { saveLoginInfo } from '../actions';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      isDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateEmailAndPassword = this.validateEmailAndPassword.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    },
    this.validateEmailAndPassword());
  }

  validateEmailAndPassword() {
    const { email, password } = this.state;
    const regexEmail = /\S+@\S+\.\S+/;
    const MIN_LENGTH = 5;

    if (regexEmail.test(email) && password.length >= MIN_LENGTH) {
      this.setState({
        isDisabled: false,
      });
    } else {
      this.setState({
        isDisabled: true,
      });
    }
  }

  /* handleClick(event) {
    event.preventDefault();
    // console.log(this.props);
    const { history } = this.props;
    const { email } = this.state;
    saveLoginInfo(email);
    history.push('/carteira');
  } */

  render() {
    const { isDisabled, email, password } = this.state;
    const { history, dispatch } = this.props;

    return (
      <div className="login">
        <form className="login-form">
          <h1 className="login-title">TrybeWallet</h1>
          <div className="form-login">
            <label htmlFor="email-input">
              <p>Login</p>
              <input
                data-testid="email-input"
                type="email"
                placeholder="Digite o seu e-mail"
                onChange={ this.handleChange }
                value={ email }
                name="email"
              />
            </label>

            <label htmlFor="password-input">
              <p>Senha</p>
              <input
                data-testid="password-input"
                type="password"
                placeholder="Digite a sua senha"
                value={ password }
                name="password"
                onChange={ this.handleChange }
              />
            </label>
            <button
              className="btn-login"
              type="submit"
              disabled={ isDisabled }
              onClick={ (event) => {
                event.preventDefault();
                dispatch(saveLoginInfo(email));
                history.push('/carteira');
              } }
            >
              Entrar
            </button>
          </div>

        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
