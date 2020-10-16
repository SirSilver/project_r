import React from 'react'
import { useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import useDish from './useDish'
import Card from '../../components/Card'
import Cards from '../../components/Cards'

const useStyles = makeStyles(theme => ({
    description: {
        marginBottom: theme.spacing(4)
    }
}))

const DishDetail = () => {
    const { id } = useParams()
    const { data: dish, ingredients, menus, isLoading } = useDish(id)
    const classes = useStyles()

    if (isLoading) return 'Loading...'

    const ingredientList = ingredients.map(ingredient => (
        <Grid item key={ingredient.id}>
            <Typography>{ingredient.name} - {ingredient.quantity}</Typography>
        </Grid>
    ))
    const menuCards = menus.map(menu =>
        <Card key={menu.id} title={menu.name} description={menu.description} link={`/menus/${menu.id}`} />
    )

    return (
        <>
            <Typography align='center' variant='h4'>{dish.name}</Typography>
            <Typography className={classes.description}>
                {dish.description}
            </Typography>
            <Typography align='center' variant='h5'>
                Recipe
            </Typography>
            <Typography>
                {dish.recipe}
            </Typography>
            {ingredientList}
            <Typography align='center' variant='h5'>
                Dish in menus
            </Typography>
            <Cards>
                {menuCards}
            </Cards>
        </>
    )
}

export default DishDetail
