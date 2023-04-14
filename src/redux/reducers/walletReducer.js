// import { SAVE_LOGIN } from '../../types/userType';

import {
  // FAILED_REQUEST,
  // IS_LOADING,
  SUCCEEDED_REQUEST } from '../../types/walletTypes';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  // isLoading: false,
  // error: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  // case IS_LOADING:
  //   return {
  //     ...state,
  //     isLoading: true,
  //   };
  // case FAILED_REQUEST:
  //   return {
  //     ...state,
  //     isLoading: false,
  //     error: payload.error,
  //   };
  case SUCCEEDED_REQUEST:
    return {
      ...state,
      isLoading: false,
      currencies: payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
