import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  render() {
    const { user } = this.props;
    return (
      <header>
        <h1>TrybeWallet</h1>

        <p data-testid="email-field">{ `E-mail: ${user}` }</p>
        <p data-testid="total-field">Despesa total: R$ 0,00</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  user: state.user.email,
});

Header.propTypes = {
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
