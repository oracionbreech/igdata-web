import React, { } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FileCopy from '@material-ui/icons/FileCopy';
import { Button } from '@material-ui/core';
import { useHistory } from 'react-router-dom'

export default function File({ filename, _id }: any) {
    const history = useHistory();

    const handleClick = () => {

        history.push(`/filescomments/${_id}`)
    }

    return (
        <div>
            <Button variant='outlined' size='medium' style={{ width: '60vw' }} onClick={() => handleClick()}>
                <ListItem key={_id}>
                    <ListItemAvatar>
                        <Avatar>
                            <FileCopy />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={filename} />
                </ListItem>
            </Button>
        </div>
    )
}
