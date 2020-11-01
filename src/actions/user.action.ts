import { ADD_USERS } from '../action-types/user'

export const addUsers = (users: Array<any>) => ({
    type: ADD_USERS,
    users,
})