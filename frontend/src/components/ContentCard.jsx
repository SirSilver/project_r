import React from 'react'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const ContentCard = ({ title, body, ...rest }) => {
    return (
        <Card {...rest}>
            <CardContent>
                <Typography variant='h5'>{title}</Typography>
                <Typography>{body}</Typography>
            </CardContent>
        </Card>
    )
}

export default ContentCard
