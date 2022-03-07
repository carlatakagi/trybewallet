import React from 'react';
import './Wallet.css';
import Header from '../components/Header';
import Form from '../components/Form';

class Wallet extends React.Component {
  render() {
    return (
      <div>
        <Header />
        <Form />
      </div>
    );
  }
}

export default Wallet;
