// import { SAVE_LOGIN } from '../../types/userType';

import {
  DELETE_EXPENSE,
  SAVE_EXPENSE,
  SAVE_UPDATED_EXPENSE,
  // FAILED_REQUEST,
  // IS_LOADING,
  SUCCEEDED_REQUEST,
  UPDATE_EXPENSE } from '../../types/walletTypes';

const INITIAL_STATE = {
  currencies: [], // array de string
  expenses: [], // array de objetos, com cada objeto tendo as chaves id, value, currency, method, tag, description e exchangeRates
  editor: false, // valor booleano que indica de uma despesa está sendo editada
  idToEdit: 0, // valor numérico que armazena o id da despesa que esta sendo editada
  // isLoading: false,
  // error: '',
};

const INITIAL_CONT = -1;
let id = INITIAL_CONT;

const walletReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case SUCCEEDED_REQUEST:
    return {
      ...state,
      currencies: payload,
    };
  case SAVE_EXPENSE:
    id += 1;
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id,
          ...payload,
        },
      ],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: state.expenses.filter((expense) => (expense.id) !== payload),
    };
  case UPDATE_EXPENSE:
    return {
      ...state,
      editor: true,
      idToEdit: payload,
    };
  case SAVE_UPDATED_EXPENSE:
    return {
      ...state,
      editor: false,
      expenses: state.expenses.map((expense) => (
        payload.idToEdit === expense.id ? { ...expense, ...payload.expense } : expense)),
      idToEdit: 0,
    };
  default:
    return state;
  }
};

export default walletReducer;
