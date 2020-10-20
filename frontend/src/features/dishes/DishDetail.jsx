import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import useDish from './useDish'
import Card from '../../components/Card'
import Cards from '../../components/Cards'
import CenterButton from '../../components/CenterButton'

const useStyles = makeStyles(theme => ({
    description: {
        marginBottom: theme.spacing(4)
    }
}))

const DishDetail = () => {
    const { id } = useParams()
    const classes = useStyles()
    const { data: dish, ingredients, menus, isLoading } = useDish(id)

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
            <CenterButton variant='outlined' component={Link} to={`/dishes/${id}/edit`}>Edit</CenterButton>
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
