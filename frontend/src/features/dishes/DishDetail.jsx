import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Paper from '@material-ui/core/Paper'
import Typography from '@material-ui/core/Typography'
import Image from 'material-ui-image'
import useDish from './useDish'
import Card from '../../components/Card'
import Cards from '../../components/Cards'
import CenterButton from '../../components/CenterButton'
import DishPlaceholder from '../../static/dish_placeholder.jpg'

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
        <Grid item component={Typography}>{ingredient.name} - {ingredient.quantity}</Grid>
    ))
    const menuCards = menus.map(menu =>
        <Card key={menu.id} title={menu.name} description={menu.description} link={`/menus/${menu.id}`} />
    )

    return (
        <Grid container direction='column' spacing={2}>
            <Grid item>
                <CenterButton variant='outlined' component={Link} to={`/dishes/${id}/edit`}>Edit</CenterButton>
            </Grid>
            <Grid container item spacing={2} component={Paper}>
                <Grid item xs={12} lg={6}>
                    <Image aspectRatio={16/9} src={dish.image} />
                </Grid>
                <Grid container item direction='column' justify='space-between' lg={6} spacing={1}>
                    <Grid item component={Typography} variant='h4'>{dish.name}</Grid>
                    <Grid item component={Typography}>{dish.description}</Grid>
                </Grid>
                <Grid container item spacing={1}>{ingredientList}</Grid>
            </Grid>
            <Grid item>
                <Typography align='center' variant='h5'>
                    Recipe
                </Typography>
                <Typography>
                    {dish.recipe}
                </Typography>
            </Grid>
            <Typography align='center' variant='h5'>
                Dish in menus
            </Typography>
            <Cards>
                {menuCards}
            </Cards>
        </Grid>
    )
}

export default DishDetail
