import { List, ListItem, ListItemText } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { getFileComments } from '../services/api';

export default function FileComments() {
    const history = useHistory();

    const [comments, setcomments] = useState([])
    useEffect(() => {
        const pathname = history.location.pathname;
        const fileId = pathname.slice(10, 2000)
        async function loadFileComments() {
            const data = await getFileComments(fileId);

            if (data.status === 200) {
                const { media_comments } = data.data;
                setcomments(media_comments)
            }
        }
        loadFileComments();
    }, [history.location.pathname])

    const renderComment = () => (<ListItem>
        <ListItemText>

        </ListItemText>
    </ListItem>)

    return (
        <div>
            <List>

            </List>
        </div>
    )
}
