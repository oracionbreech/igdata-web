import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import File from './file';
import { getFiles } from '../services/api';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function FilesList() {
    const history = useHistory()
    const classes = useStyles();
    const [files, setfiles] = useState([])
    useEffect(() => {
        const pathname = history.location.pathname
        const userId = pathname.slice(10, 2000);
        async function loadFiles() {
            const data = await getFiles(userId);

            if (data.status === 200) {
                const { uploads } = data.data;
                setfiles(uploads)
            }
        }
        loadFiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderEmptiness = () => (<h1>There is nothing here</h1>)

    const renderFileList = () => <List className={classes.root}>
        {files && files.map((file, key) => <File {...file}{...key} />)}
    </List>

    return (
        <>
            {files.length > 0 ? renderFileList() : renderEmptiness()}
        </>
    );
}
