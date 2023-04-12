import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { saveLogin } from '../redux/actions/userAction';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    isDisabled: true,
  };

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.verifyInputs);
  };

  verifyInputs = () => {
    const {
      email,
      password,
    } = this.state;
    const regexEmail = /\S+@\S+\.\S+/;
    const NUM_MIN_PASSWORD = 6;
    const verifyEmail = regexEmail.test(email);
    const verifyPassword = password.length >= NUM_MIN_PASSWORD;
    this.setState({
      isDisabled: !(verifyEmail && verifyPassword),
    });
  };

  handleClickSubmit = (event) => {
    event.preventDefault();
    const {
      email,
    } = this.state;
    const {
      dispatch,
      history,
    } = this.props;
    dispatch(saveLogin({ email }));
    history.push('/carteira');
  };

  render() {
    const {
      email,
      password,
      isDisabled,
    } = this.state;

    return (
      <div>
        <h2>Login</h2>
        <form
          onSubmit={ this.handleClickSubmit }
        >
          <label htmlFor="email">
            E-mail:
            <input
              data-testid="email-input"
              id="email"
              type="email"
              name="email"
              placeholder="digite seu e-mail"
              value={ email }
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="password">
            Senha:
            <input
              data-testid="password-input"
              id="password"
              type="password"
              name="password"
              placeholder="digite sua senha"
              value={ password }
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="submit"
            disabled={ isDisabled }
          >
            Entrar
          </button>
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
