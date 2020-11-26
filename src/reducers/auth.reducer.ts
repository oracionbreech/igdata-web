import { LOGIN } from "../action-types/auth";

const initialState = {
  email: "",
  password: "",
} as any;

export default function auth(state = initialState, { type, auth }: any) {
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
