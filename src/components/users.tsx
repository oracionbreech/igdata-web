
import { Button, Container, List, ListItem, ListItemText } from '@material-ui/core'
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addUsers } from '../actions/user.action'
import { getUsers } from '../services/api'

export default function Users() {
    const dispatch = useDispatch()
    const history = useHistory();
    const { users }: any = useSelector(({ users }: any) => users)
    useEffect(() => {
        async function loadUsers() {
            const { data } = await getUsers();
            dispatch(addUsers(data))
        }
        loadUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    const renderUsersList = ({ user, _id }) => (<ListItem key={_id}>
        <Button variant="outlined" onClick={() => history.push('/comments/' + _id)}>
            <ListItemText>
                {user}
            </ListItemText>
        </Button>
    </ListItem>)

    return (
        <div>
            <Container>
                <List>
                    {users && users.map(renderUsersList)}
                </List>
            </Container>
        </div>
    )
}
