import { LOGIN } from "../action-types/auth";

const initialState = {
    email: '',
    password: '',
}

export default function auth(state = initialState, {type, auth}) {
    switch (type) {
        case LOGIN:
          return {
              ...state,
            auth,
          };
        default:
          return state;
      }
}