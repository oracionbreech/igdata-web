import {combineReducers } from 'redux'
import comments from './comments.reducer'
import users from './user.reducer'
import auth from './auth.reducer'
export default  combineReducers({
    auth,
    comments,
    users
})