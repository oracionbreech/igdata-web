const initialState = []

export default function commentReducer(state = initialState, {type, comment}) {
    switch (type) {
        case "ADD_COMMENT":
          return {
              ...state,
            comment,
          };
        default:
          return state;
      }
}