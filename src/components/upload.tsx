import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import { getUsers } from '../services/api';


export default function Upload() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [user, setuser] = useState('');
    const [users, setusers] = useState([])
    const [selectedFile, setselectedFile] = useState();
    const [name, setname] = useState('')

    useEffect(() => {
        async function loadUsers() {
            const { data } = await getUsers();
            setusers(data);
        }
        loadUsers()
    }, [])

    function onFileChange(event: any) {
        setselectedFile(event.target.files[0])
        setname(event.target.files[0].name)
        const filePayload = new FormData();
        filePayload.append('file', event.target.files[0])
        filePayload.append('commentor', user)
        axios.post("http://localhost:5000/upload-file", filePayload, {
        }).then((res) => {
            if (res.status === 200) {
                history.push('/comments')
            }
        })
    }

    const renderUploadButton = () => (<div>
        <input
            style={{ display: 'none' }}
            id="raised-button-file"
            type="file"
            onChange={onFileChange}
        />
        <label htmlFor="raised-button-file">
            <Button component="span" variant="outlined">
                Upload
            </Button>
        </label>
        {selectedFile && <h1>{name}</h1>}
    </div>)

    const renderMenuItems = ({ _id, user }) => (
        <MenuItem value={_id} key={_id}>
            {user}
        </MenuItem>
    )

    const renderUserSelect = () => (
        <FormControl>
            <InputLabel>
                Choose A User
            </InputLabel>
            <Select onChange={({ target }: any) => setuser(target.value)} style={{ width: '200px' }} label="Choose A User" title="Choose A User">
                {users && users.map(renderMenuItems)}
            </Select>
        </FormControl>
    )

    return (
        <div>
            {user.length > 0 && renderUploadButton()}
            {renderUserSelect()}
            {selectedFile && <h1>{name}</h1>}
        </div>
    )
}
