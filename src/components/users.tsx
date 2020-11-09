
import { Button, Container, Grid, List, ListItem, ListItemText } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { addUsers } from '../actions/user.action'
import { createUser, getUsers } from '../services/api'
import Typography from '@material-ui/core/Typography/Typography'
import TextField from '@material-ui/core/TextField/TextField'

export default function Users() {
    const dispatch = useDispatch()
    const history = useHistory();
    const [name, setname] = useState('');
    const [aUser, setaUser] = useState()
    const { users }: any = useSelector(({ users }: any) => users)
    useEffect(() => {
        async function loadUsers() {
            const { data } = await getUsers();
            dispatch(addUsers(data))
        }
        loadUsers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const onNameChange = (e: any) => {
        setname(e.target.value)
    }

    const addUser = async () => {
        const user = await createUser(name);

    }

    const renderUsersList = ({ user, _id }) => (<ListItem key={_id}>
        <Button variant="outlined" onClick={() => history.push('/files/' + _id)}>
            <ListItemText>
                {user}
            </ListItemText>
        </Button>
    </ListItem>)

    return (
        <div>
            <Container>
                <Grid container>
                    <Grid item xs={6}>
                        <List>
                            {users && users.map(renderUsersList)}
                        </List>
                    </Grid>
                    <Grid item xs={6} alignItems="center">
                        <Typography>Add User</Typography>
                        <TextField label="Employee Name" type="name" onChange={onNameChange} name="name" />
                        {name.length > 0 && <Button color="secondary" variant="contained">Login</Button>}
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
