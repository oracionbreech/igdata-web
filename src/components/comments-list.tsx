import React, { useState, useEffect } from 'react';
import { getComments } from '../services/api';
import { useHistory } from 'react-router-dom';
import _ from 'lodash'
import moment from 'moment'
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@material-ui/core';
import { ExpandMoreOutlined } from '@material-ui/icons';


export default function FilesList() {
    const history = useHistory()
    const [files, setfiles] = useState([])
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
                        .map((value, key) => ({ date: key, comments: value }))
                        .value()

                const sortedByInstagram = grouped.map((el) => {
                    const groupedComments = _.chain(el.comments)
                        // Group the elements of Array based on `color` property
                        .groupBy("instagram")
                        // `key` is group's name (color), `value` is the array of objects
                        .map((value, key) => ({ instagram: key, comments: value }))
                        .value()
                    return groupedComments;
                })

                const c: Array<any> = [...sortedByInstagram]

                const theFiltered = c.map(element => {
                    const filterElement = element.filter((filtered: any) => filtered.comments.length > 1)
                    const theComments = filterElement.map((e: any) => e.comments)

                    const h = theComments.map((element: any) => {
                        const q = _.chain(element)
                            // Group the elements of Array based on `color` property
                            .groupBy("comment")
                            // `key` is group's name (color), `value` is the array of objects
                            .map((comments, key) => (comments))
                            .value()

                        const j = q.filter((z) => z.length > 1)
                        return j;
                    });

                    return h;
                });

                const lud = theFiltered.map((el: Array<any>) => {
                    return el.filter((u: Array<any>) => u.length > 0)
                })

                const o = [...lud.filter(element => element.length > 0)]

                const merge1 = [].concat.apply([], o);
                const merge2 = [].concat.apply([], merge1);
                const merge3 = [].concat.apply([], merge2)

                const mergedGrouped = _.chain(merge3).groupBy('date').map((mergee, key) => ({
                    date: key, comments: mergee
                })).value();
                setfiles(mergedGrouped)
            }
        }
        loadFiles();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const renderEmptiness = () => (<h1>There is nothing here</h1>)

    const renderCommentsInsideAccordion = (comments: Array<any>) => {
        return comments.map(comment => <span>{comment.comment} - {comment.instagram}</span>)
    }

    const renderAccordion = ({ date, comments }) => (<Accordion>
        <AccordionSummary
            expandIcon={<ExpandMoreOutlined />}
        >
            <h3>{date}</h3>
        </AccordionSummary>
        <AccordionDetails>
            {renderCommentsInsideAccordion(comments)}
        </AccordionDetails>
    </Accordion>)

    return (
        <>
            { files.length < 1 && renderEmptiness()}
            {files && files.map(file => (renderAccordion(file)))}
        </>
    );
}
