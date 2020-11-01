import {combineReducers } from 'redux'
import comments from './comments.reducer'
import users from './user.reducer'
export default  combineReducers({
    comments,
    users
})