import { ADD_USERS } from "../action-types/user";

const initialState = [] as any;

export default function users(state = initialState, { type, users }: any) {
  switch (type) {
    case ADD_USERS:
      return {
        ...state,
        users,
      };
    default:
      return state;
  }
}
