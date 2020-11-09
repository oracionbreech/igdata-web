import { Button, FormControl, InputLabel, MenuItem, Select, Snackbar, } from '@material-ui/core'
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { apiUri } from '../constants';
import { getUsers } from '../services/api';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Upload() {
    const history = useHistory()
    const [user, setuser] = useState('');
    const [users, setusers] = useState([])
    const [selectedFile, setselectedFile] = useState();
    const [name, setname] = useState('')
    const [snackbarOpenError, setsnackbarOpenError] = useState(false)
    const [snackbarOpenSuccess, setsnackbarOpenSuccess] = useState(false)
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
        axios.post(`${apiUri}/upload-file`, filePayload, {
        }).then((res) => {
            setsnackbarOpenSuccess(true)
            if (res.status === 200) {
                history.push('/users')
            }
        }).catch(err => {
            setsnackbarOpenError(true)
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

    const renderMenuItems = ({ _id, name }) => (
        <MenuItem value={_id} key={_id}>
            {name}
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

    const handleSnackBarCloseError = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setsnackbarOpenError(false);
    };


    const handleSnackBarCloseSuccess = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setsnackbarOpenSuccess(false);
    };


    const renderSnackBar = () => (<Snackbar open={snackbarOpenError} autoHideDuration={10000} onClose={handleSnackBarCloseError}>
        <Alert onClose={handleSnackBarCloseError} severity="error">
            Error Uploading Might be and invalid file or the comments in file are already stored in the db
        </Alert>
    </Snackbar>)


    const renderSnackBarSuccess = () => (<Snackbar open={snackbarOpenError} autoHideDuration={10000} onClose={handleSnackBarCloseSuccess}>
        <Alert onClose={handleSnackBarCloseSuccess} severity="success">
            File Uploaded See User Tab
    </Alert>
    </Snackbar>)


    return (
        <div>
            {renderSnackBarSuccess()}
            {renderSnackBar()}
            {user.length > 0 && renderUploadButton()}
            {renderUserSelect()}
            {selectedFile && <h1>{name}</h1>}
        </div>
    )
}
