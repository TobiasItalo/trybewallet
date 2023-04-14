import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  sumTotal = () => {
    const {
      expenses,
    } = this.props;
    return expenses.reduce((acc, { value, currency, exchangeRates }) => {
      const convertCoin = Number(value) * Number(exchangeRates[currency].ask);
      return acc + convertCoin;
    }, 0);
  };

  render() {
    const {
      email,
    } = this.props;

    return (
      <header>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{ email }</p>
        <p>
          {'Despesa Total: R$ '}
          <span data-testid="total-field">{ this.sumTotal().toFixed(2) }</span>
          {' '}
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.shape({}).isRequired).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
