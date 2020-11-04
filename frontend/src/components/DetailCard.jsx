import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles({
    media: {
        height: 0,
        paddingTop: '56.25%',
    }
})

const DetailCard = ({ image, title, body, created_at, created_by, ...rest }) => {
    const classes = useStyles()

    return (
        <Card {...rest}>
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <CardMedia image={image} className={classes.media}/>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant='h5'>{title}</Typography>
                        <Typography>{body}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default DetailCard
