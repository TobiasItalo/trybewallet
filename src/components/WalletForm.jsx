import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  actionFetchCurrencies,
  addExpense,
  saveUpdatedExpense,
} from '../redux/actions/walletAction';

const INITIAL_STATE = {
  value: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
  inEditing: false,
};

class WalletForm extends Component {
  state = INITIAL_STATE;

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(actionFetchCurrencies());
  }

  componentDidUpdate(prevProps) {
    const {
      idToEdit,
      editor,
    } = this.props;
    const { inEditing } = this.state;
    if ((editor && !inEditing) || (editor && prevProps.idToEdit !== idToEdit)) {
      this.setExpenseToEdit();
    }
    if (!editor && prevProps.editor) {
      this.setState(INITIAL_STATE);
    }
  }

  setExpenseToEdit = () => {
    const { expenses, idToEdit } = this.props;
    const currExpense = expenses.find((expense) => expense.id === idToEdit);
    if (currExpense) {
      const {
        value,
        currency,
        method,
        tag,
        description,
      } = currExpense;
      this.setState({
        value,
        currency,
        method,
        tag,
        description,
        inEditing: true,
      });
    }
  };

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
    this.setState(INITIAL_STATE);
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
    this.setState(INITIAL_STATE);
  };

  render() {
    const { value, currency, method, tag, description } = this.state;

    const { currencies, editor, isLoading } = this.props;

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

        <button type="submit" disabled={ isLoading }>
          { editor ? 'Editar despesa' : 'Adicionar despesa' }
          { isLoading && <i className="fa fa-spinner fa-pulse fa-fw" />}
        </button>
      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
  isLoading: state.wallet.isLoading,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.string.isRequired,
    currency: PropTypes.string.isRequired,
    method: PropTypes.string.isRequired,
    tag: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired).isRequired,
  editor: PropTypes.bool.isRequired,
  idToEdit: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
