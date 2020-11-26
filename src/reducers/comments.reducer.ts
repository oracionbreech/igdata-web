const initialState = [] as any;

export default function comments(state = initialState, { type, comment }: any) {
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
