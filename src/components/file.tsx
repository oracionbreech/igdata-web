import React, { } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FileCopy from '@material-ui/icons/FileCopy';


export default function File({ filename, _id }: any) {
    return (
        <div>
            <ListItem key={_id}>
                <ListItemAvatar>
                    <Avatar>
                        <FileCopy />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={filename} />
            </ListItem>
        </div>
    )
}
