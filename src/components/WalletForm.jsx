import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  actionFetchCurrencies,
  addExpense,
  saveUpdatedExpense,
} from '../redux/actions/walletAction';

const USD = 'USD';
const DINHEIRO = 'Dinheiro';
const ALIMENTACAO = 'Alimentação';

class WalletForm extends Component {
  state = {
    value: '',
    currency: USD,
    method: DINHEIRO,
    tag: ALIMENTACAO,
    description: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCurrencies());
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    }, this.verifyInputs);
  };

  handleClickSubmit = (event) => {
    event.preventDefault();
    const {
      dispatch,
    } = this.props;
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    dispatch(addExpense({
      value,
      currency,
      method,
      tag,
      description,
    }));
    this.setState({
      value: '',
      currency: USD,
      method: DINHEIRO,
      tag: ALIMENTACAO,
      description: '',
    });
  };

  handleUpdate = (event) => {
    event.preventDefault();
    const {
      dispatch,
      idToEdit,
    } = this.props;
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    dispatch(saveUpdatedExpense({
      idToEdit,
      expense: {
        value,
        currency,
        method,
        tag,
        description,
      },
    }));
    this.setState({
      value: '',
      currency: USD,
      method: DINHEIRO,
      tag: ALIMENTACAO,
      description: '',
    });
  };

  render() {
    const {
      value,
      currency,
      method,
      tag,
      description,
    } = this.state;

    const {
      currencies,
      editor,
    } = this.props;

    // form onReset
    return (
      <form onSubmit={ editor ? this.handleUpdate : this.handleClickSubmit }>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            data-testid="value-input"
            id="value"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            type="text"
            data-testid="currency-input"
            id="currency"
            name="currency"
            value={ currency }
            onChange={ this.handleChange }
          >
            {
              currencies.map((coin) => (
                <option value={ coin } key={ coin }>{ coin }</option>
              ))
            }
          </select>
        </label>

        <label htmlFor="method">
          Método de pagamento:
          <select
            data-testid="method-input"
            id="method"
            name="method"
            value={ method }
            onChange={ this.handleChange }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria:
          <select
            data-testid="tag-input"
            id="tag"
            name="tag"
            value={ tag }
            onChange={ this.handleChange }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            data-testid="description-input"
            id="description"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <button type="submit">{ editor ? 'Editar despesa' : 'Adicionar despesa' }</button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
