// Coloque aqui suas actions
export const LOGIN_USER = 'LOGIN_USER';

const saveLoginInfo = (email) => ({
  type: LOGIN_USER,
  payload: email,
});

export default saveLoginInfo;
