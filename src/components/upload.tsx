import { Box, Button, FormControl, InputLabel, MenuItem, Select, Snackbar, Typography } from '@material-ui/core'
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useHistory } from 'react-router-dom'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import { apiUri } from '../constants';
import { getUsers } from '../services/api';
import LinearProgress from '@material-ui/core/LinearProgress/LinearProgress';

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
    const [uploadProgress, setuploadProgress] = useState(0)
    useEffect(() => {
        async function loadUsers() {
            const { data } = await getUsers();
            setusers(data);
        }
        loadUsers()
    }, [])

    function onFileChange(event: any) {

        const config = {
            onUploadProgress: function (progressEvent) {
                var percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total)
                setuploadProgress(percentCompleted);
            }
        }

        setselectedFile(event.target.files[0])
        setname(event.target.files[0].name)
        const filePayload = new FormData();
        filePayload.append('file', event.target.files[0])
        filePayload.append('commentor', user)
        axios.post(`${apiUri}/upload-file`, filePayload, config).then((res) => {
            setname('')
            if (res.status === 200) {
                history.push('/users')
            }
        }).catch(err => {
            console.log(err);
            setname('')
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

    function LinearProgressWithLabel(props) {
        return (
            <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                    <LinearProgress variant="determinate" {...props} />
                </Box>
                <Box minWidth={35}>
                    <Typography variant="body2" color="textSecondary">{props.value < 100 ? `${Math.round(
                        props.value,
                    )}%` : <CheckCircleIcon color="primary" />}</Typography>
                </Box>
                {props.value === 100 && 'Please Wait for Users Page Redirection'}
            </Box>
        );
    }

    const renderProgressCircle = () => <div>
        <LinearProgressWithLabel value={uploadProgress} />
    </div>

    return (
        <div>
            {renderSnackBarSuccess()}
            {renderSnackBar()}
            {user.length > 0 && renderUploadButton()}
            {renderUserSelect()}
            {selectedFile && <h1>{name}</h1>}
            {renderProgressCircle()}
        </div>
    )
}
