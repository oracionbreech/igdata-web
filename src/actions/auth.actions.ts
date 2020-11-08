import { LOGIN } from "../action-types/auth"

export const authenticate = (auth: any) => ({
    type: LOGIN,
    auth: auth
})