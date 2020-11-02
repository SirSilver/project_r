import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import DetailCard from './DetailCard'
import IngredientsCard from './IngredientsCard'
import DishPlaceholder from '../static/dish_placeholder.jpg'

const useStyles = makeStyles({
        detailCard: {
        maxHeight: 249.85,
        display: 'flex',
        flexDirection: 'column'
    },
})

const Details = ({ image, title, body, ingredients, ...rest }) => {
    const classes = useStyles()

    return (
        <Grid container spacing={6} {...rest}>
            <Grid item xs={12} md={8}>
                <DetailCard 
                    image={image || DishPlaceholder}
                    title={title}
                    body={body}
                    className={classes.detailCard}
                />
            </Grid>
            <Grid item xs={12} md={4}>
                <IngredientsCard ingredients={ingredients} className={classes.detailCard} />
            </Grid>
        </Grid>
    )
}

export default Details
