import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useDish from './useDish'
import Card from '../../components/Card'
import Cards from '../../components/Cards'
import CenterButton from '../../components/CenterButton'
import ContentCard from '../../components/ContentCard'
import Details from '../../components/Details'

const useStyles = makeStyles(({ spacing }) => ({
    details: {
        marginBottom: spacing(2)
    },
    content: {
        marginBottom: spacing(2)
    }
}))

const DishDetail = () => {
    const classes = useStyles()
    const { id } = useParams()
    const { data: dish, ingredients, menus, isLoading } = useDish(id)

    if (isLoading) return 'Loading...'

    return (
        <>
            <CenterButton variant='outlined' component={Link} to={`/dishes/${id}/edit`}>Edit</CenterButton>
            <Details
                image={dish.image}
                title={dish.name}
                body={dish.description}
                ingredients={ingredients}
                className={classes.details}
            />
            <ContentCard title='Recipe' body={dish.recipe} className={classes.content} />
            <Typography align='center' variant='h5'>
                Dish in menus
            </Typography>
            <Cards items={menus} type='menus' />
        </>
    )
}

export default DishDetail
