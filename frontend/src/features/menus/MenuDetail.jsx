import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMenu from './useMenu'
import Cards from '../../components/Cards'
import CenterButton from '../../components/CenterButton'
import Details from '../../components/Details'

const useStyles = makeStyles(({ spacing }) => ({
    details: {
        marginBottom: spacing(2)
    }
}))

const MenuDetail = () => {
    const { id } = useParams()
    const classes = useStyles()
    const { data: menu, dishes, ingredients, isLoading } = useMenu(id)

    if (isLoading) return 'Loading...'

    return (
        <>
            <CenterButton variant='outlined' component={Link} to={`/menus/${id}/edit`}>Edit</CenterButton>
            <Details
                image={menu.image}
                title={menu.name}
                body={menu.description}
                ingredients={ingredients}
                className={classes.details}
            />
            <Typography align='center' variant='h5'>Dishes in the menu</Typography>
            <Cards items={dishes} />
        </>
    )
}

export default MenuDetail
