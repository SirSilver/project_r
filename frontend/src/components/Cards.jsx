import React from 'react'
import Grid from '@material-ui/core/Grid'

const Cards = ({ children }) => {
    const cards = React.Children.map(children, child => 
        <Grid item xs={12} sm={6} md={4}>
            {child}
        </Grid>
    )
    return (
        <Grid container spacing={2}>
            {cards}
        </Grid>
    )
}

export default Cards
