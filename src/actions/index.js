// Coloque aqui suas actions
export const LOGIN_USER = 'LOGIN_USER';
export const API_COIN = 'API_COIN';
export const CURRENCIES_CHANGE = 'CURRENCIES_CHANGE';
export const EXPENSES_CHANGE = 'EXPENSES_CHANGE';

export const saveLoginInfo = (email) => ({
  type: LOGIN_USER,
  payload: email,
});

export const requestAPI = () => ({
  type: API_COIN,
});

export const saveCurrenciesInfo = (value) => ({
  type: CURRENCIES_CHANGE,
  payload: value,
});

export const saveExpensesInfo = (value) => ({
  type: EXPENSES_CHANGE,
  payload: value,
});
