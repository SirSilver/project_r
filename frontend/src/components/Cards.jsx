import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Card from './Card'
import DishPlaceholder from '../static/dish_placeholder.jpg'

const Cards = ({ items, type }) => {
    const cards = items.map(item => 
        <Grid item xs={12} sm={6} md={4}>
            <Card
                image={item.image || DishPlaceholder}
                title={item.name}
                dialogContent={item.description} 
                dialogActions={<Button color='primary' component={Link} to={`/${type}/${item.id}`}>Details</Button>}
            />
        </Grid>
    )
    return (
        <Grid container spacing={2} alignContent='stretch'>
            {cards}
        </Grid>
    )
}

export default Cards
