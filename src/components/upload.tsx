import { Button, Container, TextField } from '@material-ui/core'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import axios from 'axios'
import { useHistory } from 'react-router-dom'


export default function Upload() {
    const dispatch = useDispatch()
    const history = useHistory()

    const [user, setuser] = useState('');

    const [selectedFile, setselectedFile] = useState();
    const [name, setname] = useState('')
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

    const handleChange = (commentor: any) => setuser(commentor.target.value)

    const renderUserTextField = () => (
        <Container>
            <TextField id='standard-basic' label="Enter Commentors Name" onChange={handleChange} />
        </Container>

    )

    return (
        <div>
            {user.length > 0 && renderUploadButton()}
            {renderUserTextField()}
            {selectedFile && <h1>{name}</h1>}
        </div>
    )
}
