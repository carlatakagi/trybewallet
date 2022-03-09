import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// replace para não esquecer: https://developer.mozilla.org/pt-BR/docs/Web/JavaScript/Reference/Global_Objects/String/replace
class ExpensesTable extends Component {
  render() {
    const { expenses } = this.props;

    return (
      <table>
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

        {expenses.map((expense) => (
          <tbody key={ expense.id }>
            <tr>
              <td>{expense.description}</td>
              <td>{expense.tag}</td>
              <td>{expense.method}</td>
              <td>{expense.value}</td>
              <td>
                {
                  (expense.exchangeRates[expense.currency].name)
                    .replace('/Real Brasileiro', '')
                }
              </td>
              <td>
                {
                  (expense.exchangeRates[expense.currency].name)
                    .replace('/Real Brasileiro', '')
                }
              </td>
              <td>
                {
                  (expense.exchangeRates[expense.currency].ask * expense.value).toFixed(2)
                }
              </td>
              <td>Real</td>
              <td>botão editar e excluir</td>
            </tr>
          </tbody>
        ))}
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

ExpensesTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(mapStateToProps)(ExpensesTable);
