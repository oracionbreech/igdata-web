import { ADD_USERS } from "../action-types/user";

const initialState = []

export default function users(state = initialState, {type, users}) {
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