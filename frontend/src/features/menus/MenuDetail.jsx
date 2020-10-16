import React from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import useMenu from './useMenu'
import Card from '../../components/Card'
import Cards from '../../components/Cards'

const useStyles = makeStyles(theme => ({
    description: {
        marginBottom: theme.spacing(4)
    },
    ingredients: {
        marginBottom: theme.spacing(4)
    }
}))

const MenuDetail = () => {
    const { id } = useParams()
    const classes = useStyles()
    const { data: menu, dishes, ingredients, isLoading } = useMenu(id)

    if (isLoading) return 'Loading...'

    const ingredientList = ingredients.map(ingredient => 
        <Grid item key={ingredient.name} xs={4}>
            {ingredient.name} - {ingredient.quantity}
        </Grid>
    )

    const dishCards = dishes.map(dish => (
        <Card key={dish.id} title={dish.name} content={dish.description} link={`/dishes/${dish.id}`}/>
    ))

    return (
        <>
            <Typography align='center' variant='h4'>{menu.name}</Typography>
            <Typography className={classes.description}>{menu.description}</Typography>
            <Grid container className={classes.ingredients} spacing={2}>
                {ingredientList}
            </Grid>
            <Typography align='center' variant='h5'>Dishes in menu</Typography>
            <Cards>{dishCards}</Cards>
        </>
    )
}

export default MenuDetail
