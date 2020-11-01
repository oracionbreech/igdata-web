
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { AddComment } from '../actions/comments.actions'
import { getUsers } from '../services/api'

export default function Users() {
    const dispatch = useDispatch()
    const state = useSelector(state => state)
    useEffect(() => {
        async function loadUsers() {
            const { data } = await getUsers();
            dispatch(AddComment(data))
        }
        loadUsers()
    }, [dispatch])

    console.log(state);


    return (
        <div>

        </div>
    )
}
