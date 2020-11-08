import { Button, Container, Grid, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { loginAuditor } from '../services/api';
import { useDispatch } from 'react-redux';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar/Snackbar';
import { authenticate } from '../actions/auth.actions';
import { useHistory } from "react-router-dom"

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}


export default function Login() {
    const history = useHistory()
    const dispatch = useDispatch();
    const [loginForm, setloginForm]: any = useState();
    const [snackbarOpenError, setsnackbarOpenError] = useState(false)
    const onFormFieldChange = async (e: any) => {
        setloginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const login = async () => {
        try {
            const auditor = await loginAuditor(loginForm);
            if (auditor.status === 200) {
                const { email, password } = auditor.data;
                dispatch(authenticate({ email, password }))
                history.push('/users')
            } else {
                setsnackbarOpenError(true)
            }
        } catch (error) {
            setsnackbarOpenError(true)
        }
    }


    const handleSnackBarCloseError = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setsnackbarOpenError(false);
    };


    const renderSnackBar = () => (<Snackbar open={snackbarOpenError} autoHideDuration={10000} onClose={handleSnackBarCloseError}>
        <Alert onClose={handleSnackBarCloseError} severity="error">
            Error Logging In
        </Alert>
    </Snackbar>)


    return (
        <div>
            <Container maxWidth="sm">
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <TextField label="Email" type="email" onChange={onFormFieldChange} name="email" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Password" type="password" onChange={onFormFieldChange} name="password" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained" onClick={() => login()}>Login</Button>
                    </Grid>
                </Grid>
            </Container>
            {renderSnackBar()}
        </div>
    )
}
