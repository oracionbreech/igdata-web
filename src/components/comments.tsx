import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Comment from './comment';
import { getComments } from '../services/api';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function FolderList() {
    const classes = useStyles();
    const [comments, setcomments] = useState([{
        user: '',
        commentFindings: []
    }])
    useEffect(() => {

        async function loadComments() {
            const data = await getComments()

            if (data.status === 200) {
                setcomments(data.data)
            }
        }
        loadComments();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    return (
        <List className={classes.root}>
            {comments && comments.map(comment => <Comment user={comment.user} commentFindings={comment.commentFindings} key={comment.user} />)}
        </List>
    );
}
