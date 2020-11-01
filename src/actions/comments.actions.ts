import { ADD_COMMENT } from "../action-types/comments.action.types";

export const AddComment = (comments: any) => ({
    type: ADD_COMMENT,
    comment: comments
})