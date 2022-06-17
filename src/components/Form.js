import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getCoins from '../services/coinsAPI';
import { saveCurrenciesInfo, saveExpensesInfo } from '../actions';

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: '',
      description: '',
      currency: '',
      method: 'Cartão de crédito',
      tag: 'Alimentação',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    this.getApiCoins();
  }

  getApiCoins = async () => {
    const { dispatch } = this.props;
    const apiCoins = await getCoins();

    dispatch(saveCurrenciesInfo(Object.keys(apiCoins)));

    this.setState({
      currency: Object.keys(apiCoins)[0],
    });
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  async handleClick(event) {
    event.preventDefault();
    const currenciesAPI = await getCoins();
    const { value, description, currency, method, tag } = this.state;
    const { dispatch, expenses } = this.props;
    const LAST_POSITION = -1;
    const lastExpenseId = (expenses.slice(LAST_POSITION)[0] || {}).id;
    const nextId = typeof lastExpenseId === 'undefined' ? 0 : lastExpenseId + 1;

    const expenseObj = {
      id: nextId,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates: currenciesAPI,
    };

    dispatch(saveExpensesInfo(expenseObj));

    this.setState({
      value: '',
    });
  }

  render() {
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = this.props;
    console.log(currencies);

    return (
      <div>
        <form>
          <label htmlFor="value">
            <p>Valor</p>
            <input
              type="number"
              data-testid="value-input"
              onChange={ this.handleChange }
              name="value"
              value={ value }
            />
          </label>

          <label htmlFor="description">
            <p>Descrição</p>
            <input
              type="text"
              data-testid="description-input"
              onChange={ this.handleChange }
              name="description"
              value={ description }
            />
          </label>

          <label htmlFor="currency">
            <p>Moeda</p>
            <select
              id="currency"
              data-testid="currency-input"
              onChange={ this.handleChange }
              value={ currency }
              name="currency"
            >
              {
                currencies.filter((coin) => coin !== 'USDT').map((coin) => (
                  <option
                    key={ coin }
                    data-testid={ coin }
                  >
                    {coin}
                  </option>))
              }
            </select>
          </label>

          <label htmlFor="method">
            <p>Método de pagamento</p>
            <select
              id="method"
              data-testid="method-input"
              onChange={ this.handleChange }
              value={ method }
              name="method"
            >
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Cartão de débito">Cartão de débito</option>
              <option value="Dinheiro">Dinheiro</option>
            </select>
          </label>

          <label htmlFor="tag">
            <p>Categoria</p>
            <select
              id="tag"
              data-testid="tag-input"
              onChange={ this.handleChange }
              value={ tag }
              name="tag"
            >
              <option value="Alimentação">Alimentação</option>
              <option value="Lazer">Lazer</option>
              <option value="Trabalho">Trabalho</option>
              <option value="Transporte">Transporte</option>
              <option value="Saúde">Saúde</option>
            </select>
          </label>

          <button
            type="submit"
            onClick={ this.handleClick }
          >
            Adicionar Despesa

          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

Form.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Form);
