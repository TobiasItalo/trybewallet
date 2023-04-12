import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { email } = this.props;

    return (
      <header>
        <h1>TrybeWallet</h1>
        <p data-testid="email-field">{ email }</p>
        <p data-testid="total-field">
          {'0 '}
          <span data-testid="header-currency-field">BRL</span>
        </p>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
});

export default connect(mapStateToProps)(Header);
