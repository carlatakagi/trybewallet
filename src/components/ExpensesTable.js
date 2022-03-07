import React, { Component } from 'react';

class ExpensesTable extends Component {
  render() {
    return (
      <div>
        <header>
          <h3>Descrição</h3>
          <h3>Tag</h3>
          <h3>Método de pagamento</h3>
          <h3>Valor</h3>
          <h3>Moeda</h3>
          <h3>Câmbio utilizado</h3>
          <h3>Valor convertido</h3>
          <h3>Moeda de conversão</h3>
          <h3>Editar/Excluir</h3>
        </header>
      </div>
    );
  }
}

export default ExpensesTable;
