import { Button } from '@material-ui/core'
import React, { useState } from 'react'
import axios from 'axios'

export default function Upload() {
    const [selectedFile, setselectedFile] = useState();
    const [name, setname] = useState('')
    function onFileChange(event: any) {
        console.log(event.target.files[0]);
        setselectedFile(event.target.files[0])
        setname(event.target.files[0].name)
        const filePayload = new FormData();
        filePayload.append('file', event.target.files[0])
        filePayload.append('commentor', 'Sheril')
        axios.post("http://localhost:5000/upload-file", filePayload, {
        }).then((res) => {
            console.log(res);
        })
    }

    return (
        <div>
            <input
                style={{ display: 'none' }}
                id="raised-button-file"
                type="file"
                onChange={onFileChange}
            />
            <label htmlFor="raised-button-file">
                <Button component="span">
                    Upload
                </Button>
            </label>
            {selectedFile && <h1>{name}</h1>}
        </div>
    )
}
