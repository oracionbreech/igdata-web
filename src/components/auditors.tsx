import { Button, Container, Grid, TextField } from '@material-ui/core'
import React from 'react'

export default function Auditor() {
    return (
        <div>

            <Container maxWidth="sm">
                <Grid container spacing={3}>
                    <Grid item xs={12} >
                        <TextField label="Email" type="email" />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField label="Password" />
                    </Grid>
                    <Grid item xs={12}>
                        <Button color="primary" variant="contained">Login</Button>
                    </Grid>
                </Grid>
            </Container>
        </div>
    )
}
