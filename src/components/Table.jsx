import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const {
      expenses,
    } = this.props;

    return (
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
            expenses.map(({
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
                <td>próximos requisitos</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
