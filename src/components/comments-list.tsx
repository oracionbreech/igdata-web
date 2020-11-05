import React, { useState, useEffect } from 'react';
import { getComments } from '../services/api';
import { useHistory } from 'react-router-dom';
import _ from 'lodash'
import moment from 'moment'
import { Accordion, AccordionDetails, AccordionSummary, Collapse, Grid, ListItemIcon, Typography, } from '@material-ui/core';
import { DoubleArrow, ExpandLess, ExpandMore, ExpandMoreOutlined } from '@material-ui/icons';
import { DateRangePicker } from "materialui-daterange-picker";

import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ImageIcon from '@material-ui/icons/Image';
import WorkIcon from '@material-ui/icons/Work';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            width: '90vw'
        },
        nested: {
            paddingLeft: theme.spacing(4),
        }
    }),
);

export default function FilesList() {
    const history = useHistory()
    const [files, setfiles] = useState([])
    const [commentsCount, setcommentsCount] = useState(0);
    const [open, setOpen] = React.useState(true);
    const [dateRange, setDateRange]: any = React.useState();
    const [duplicates, setduplicates]: Array<any> = useState([])
    const [duplicatesOpen, setduplicatesOpen] = useState(false)
    useEffect(() => {

        const pathname = history.location.pathname
        const userId = pathname.slice(7, 2000);

        async function loadFiles() {
            const data = await getComments(userId);

            if (data.status === 200) {

                const { comments } = data.data;

                const mutatedComments = comments.map((mutatedComment: any) => ({
                    ...mutatedComment,
                    date: moment(mutatedComment.date).format('MMMM DD YYYY')
                }))

                const grouped =
                    _.chain(mutatedComments)
                        // Group the elements of Array based on `color` property
                        .groupBy("date")
                        // `key` is group's name (color), `value` is the array of objects
                        .map((value, key) => {
                            return {
                                date: key, comments: value
                            }
                        })
                        .value()

                const sortedByDate = grouped.sort((a, b) => moment(a.date).diff(b.date))

                if (_.isEmpty(dateRange)) {
                    setfiles(sortedByDate)
                    const count = sortedByDate.reduce((acc, item) => {
                        return acc += item.comments.length
                    }, 0)

                    const extractComments = sortedByDate.map(({ comments }) => {
                        return comments;
                    })

                    const sortedByInstagram = _.chain([].concat.apply([], extractComments)).groupBy('instagram').map((values, key) => ({ key, count: values.length })).value()

                    const h = sortedByInstagram.filter((e) => e.count > 1)

                    const sortedByCount = _.chain(h).groupBy('count').map((values, key) =>
                        ({ key, values })
                    ).value()
                    setduplicates(sortedByCount)
                    setcommentsCount(count)
                } else {
                    const sortedByDateRange = sortedByDate.filter(sorted => {
                        return moment(sorted.date).isBetween(moment(dateRange.startDate), moment(dateRange.endDate))
                    })
                    setfiles(sortedByDateRange)
                    const count = sortedByDateRange.reduce((acc, item) => {
                        return acc += item.comments.length
                    }, 0)

                    const extractComments = sortedByDateRange.map(({ comments }) => {
                        return comments;
                    })

                    const sortedByInstagram = _.chain([].concat.apply([], extractComments)).groupBy('instagram').map((values, key) => ({ key, count: values.length })).value()

                    const h = sortedByInstagram.filter((e) => e.count > 1)

                    const sortedByCount = _.chain(h).groupBy('count').map((values, key) =>
                        ({ key, values })
                    ).value()
                    setduplicates(sortedByCount)
                    setcommentsCount(count)
                }
            }
        }
        loadFiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dateRange])

    const renderEmptiness = () => (<h1>There is nothing here</h1>)

    const renderCommentsInsideAccordion = (comments: Array<any>) => {

        return comments.map(comment => <ListItem><ListItemText>{comment.comment} - {comment.instagram}</ListItemText></ListItem>)
    }

    const renderAccordion = ({ date, comments }) => (<Accordion TransitionProps={{ unmountOnExit: true }} style={{ width: '30vw' }}>
        <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
        >
            <h3>{date}</h3>
        </AccordionSummary>
        <AccordionDetails>
            <List>
                {renderCommentsInsideAccordion(comments)}
            </List>

        </AccordionDetails>
    </Accordion>)

    const toggle = () => setOpen(true);

    const classes = useStyles();

    const handleDuplicatesOpen = () => setduplicatesOpen(!duplicatesOpen);

    const reports = () => {

        const duplicatesCount = duplicates.reduce((acc, item) => {
            return acc += item.values.length;
        }, 0)

        const duplicatesCountSpread = duplicates.reduce((acc, item) => {
            return acc += (item.values.length * item.key);
        }, 0)

        const totalValid = (commentsCount - duplicatesCountSpread) + duplicatesCount;




        return <List>
            <Typography>Reports for Selected Period</Typography>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <ImageIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={commentsCount} secondary='Total Comments in this Period' />
            </ListItem>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <WorkIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={duplicatesCount} secondary="Number of Duplicates If Merged" />
            </ListItem>
            <ListItem button onClick={handleDuplicatesOpen}>
                <ListItemText primary="Breakdown" />
                {duplicatesOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={duplicatesOpen} timeout="auto" unmountOnExit>
                <List>
                    {duplicates && duplicates.map((duplicate: any) => (<ListItem className={classes.nested}>
                        <ListItemIcon>
                            <DoubleArrow />
                        </ListItemIcon>
                        <ListItemText primary={`${duplicate.key}'s`} secondary={duplicate.values.length} style={{ textAlign: 'center' }} />
                    </ListItem>))}
                </List>
            </Collapse>
            <ListItem>
                <ListItemAvatar>
                    <Avatar>
                        <BeachAccessIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary={totalValid} secondary="Valid Comments" />
            </ListItem>
        </List>
    }

    return (
        <div className={classes.root}>
            <Grid container spacing={3}>
                <Grid item xs>
                    <DateRangePicker
                        open={open}
                        toggle={toggle}
                        onChange={(range) => setDateRange(range)}
                    />
                </Grid>
                <Grid item xs>
                    {reports()}
                    {files.length < 1 && renderEmptiness()}
                    {files && files.map(file => (renderAccordion(file)))}
                </Grid>
            </Grid>

        </div>
    );
}
