import { SAVE_LOGIN } from '../../types/userType';

export const saveLogin = (payload) => ({
  type: SAVE_LOGIN,
  payload,
});
