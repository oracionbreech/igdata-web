import React, { } from 'react'
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import { IComment } from '../interfaces/IComment';


export default function Comment({ user, commentFindings }: IComment) {
    return (
        <div>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={user} />
                {commentFindings.map((cF: any) => (<span>{cF.comment}</span>))}
            </ListItem>
        </div>
    )
}
