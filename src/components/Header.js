import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      totalExpenses: 0,
    };

    this.sumExpenses = this.sumExpenses.bind(this);
  }

  // baseado no código do link: https://reactjs.org/docs/react-component.html#componentdidupdate
  componentDidUpdate(prevProps) {
    const { expenses } = this.props;

    if (expenses.length !== prevProps.expenses.length) {
      this.sumExpenses();
    }
  }

  // linhas 26 a 37 tive ajuda da minha irmã
  sumExpenses() {
    const { expenses } = this.props;

    const totalPrice = expenses.reduce((total, expense) => {
      const currencyObj = expense.exchangeRates[expense.currency];
      const exchange = expense.value * currencyObj.ask;
      return exchange + total;
    }, 0);

    this.setState({
      totalExpenses: totalPrice.toFixed(2),
    });
  }

  render() {
    const { totalExpenses } = this.state;
    const { user } = this.props;

    return (
      <header>
        <h1>TrybeWallet</h1>

        <p data-testid="email-field">{ `E-mail: ${user}` }</p>
        <p data-testid="total-field">{`Despesa total: R$ ${totalExpenses}`}</p>
        <p data-testid="header-currency-field">BRL</p>
      </header>
    );
  }
}

// le o estado
const mapStateToProps = (state) => ({
  user: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  user: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Header);
