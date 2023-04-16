import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense, updateExpense } from '../redux/actions/walletAction';

class Table extends Component {
  handleClickDelete = (id) => {
    const {
      dispatch,
    } = this.props;
    dispatch(deleteExpense(id));
  };

  handleClickUpdate = (id) => {
    const {
      dispatch,
    } = this.props;
    dispatch(updateExpense(id));
  };

  render() {
    const {
      expenses,
    } = this.props;

    return (
      <>
        <table border={ 1 }>
          <thead>
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {
              expenses?.map(({
                id,
                description,
                tag,
                method,
                value,
                currency,
                exchangeRates,
              }) => (
                <tr key={ id }>
                  <td>{ description }</td>
                  <td>{ tag }</td>
                  <td>{ method }</td>
                  <td>{ (Number(value)).toFixed(2) }</td>
                  <td>{ exchangeRates[currency].name }</td>
                  <td>{ (Number(exchangeRates[currency].ask)).toFixed(2) }</td>
                  <td>
                    { (Number(value) * Number(exchangeRates[currency].ask)).toFixed(2) }
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      type="button"
                      data-testid="edit-btn"
                      onClick={ () => this.handleClickUpdate(id) }
                    >
                      Editar
                    </button>
                    <button
                      type="button"
                      data-testid="delete-btn"
                      onClick={ () => this.handleClickDelete(id) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        { expenses.length === 0 && <div>Nenhum despesa registrada até o momento...</div> }
      </>
    );
  }
}

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
