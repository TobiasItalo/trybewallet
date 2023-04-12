import { SAVE_LOGIN } from '../../types/userType';

const INITIAL_STATE = {
  email: '',
};

const userReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;
  switch (type) {
  case SAVE_LOGIN:
    return {
      ...state,
      email: payload.email,
    };
  default:
    return state;
  }
};

export default userReducer;
