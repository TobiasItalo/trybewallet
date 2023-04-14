import {
  // FAILED_REQUEST,
  // IS_LOADING,
  SUCCEEDED_REQUEST } from '../../types/walletTypes';
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
