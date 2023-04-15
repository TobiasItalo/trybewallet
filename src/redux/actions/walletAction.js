import { toast } from 'react-toastify';
import {
  SAVE_EXPENSE,
  // FAILED_REQUEST,
  // IS_LOADING,
  SUCCEEDED_REQUEST,
  DELETE_EXPENSE,
  UPDATE_EXPENSE,
  SAVE_UPDATED_EXPENSE,
} from '../../types/walletTypes';
import fetchCurrencies from '../../services/fetchCurrencies';

// export const isLoading = () => ({
//   type: IS_LOADING,
// });

// export const failedRequest = (payload) => ({
//   type: FAILED_REQUEST,
//   payload,
// });

// export const actionFetchCurrencies = () => async (dispatch) => {
//   try {
//     dispatch(isLoading());
//     const currencies = await fetchCurrencies();
//     dispatch(succeededRequest(Object.keys(currencies)));
//   } catch (error) {
//     dispatch(failedRequest({ error: error.message }));
//   }
// };

export const succeededRequest = (payload) => ({
  type: SUCCEEDED_REQUEST,
  payload,
});

export const actionFetchCurrencies = () => async (dispatch) => {
  const currencies = await fetchCurrencies();
  delete currencies.USDT;
  dispatch(succeededRequest(Object.keys(currencies)));
};

export const saveExpense = (expense, data) => ({
  type: SAVE_EXPENSE,
  payload: {
    ...expense,
    exchangeRates: data,
  },
});

export const addExpense = (expense) => async (dispatch) => {
  try {
    const data = await fetchCurrencies();
    dispatch(saveExpense(expense, data));
    toast.success('Despesa adicionada com sucesso!');
  } catch (error) {
    toast.error(error.message);
  }
};

export const deleteExpense = (payload) => ({
  type: DELETE_EXPENSE,
  payload,
});

export const updateExpense = (payload) => ({
  type: UPDATE_EXPENSE,
  payload,
});

export const saveUpdatedExpense = (payload) => ({
  type: SAVE_UPDATED_EXPENSE,
  payload,
});
