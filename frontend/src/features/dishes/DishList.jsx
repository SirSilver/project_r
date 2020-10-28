import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import useDishes from './useDishes'
import Card from '../../components/Card'
import Cards from '../../components/Cards'

const DishList = () => {
    const { data: dishes, isLoading } = useDishes()

    if (isLoading) return 'Loading...'

    const dishList = dishes.map(dish => {
        return <Card
            key={dish.id}
            title={dish.name}
            image={dish.image || undefined}
            dialogContent={<Typography>{dish.description}</Typography>}
            dialogActions={<Button color='primary' component={Link} to={`/dishes/${dish.id}`}>Details</Button>}
        />
    })

    return <Cards>{dishList}</Cards>
}

export default DishList
