import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import useDishes from './useDishes'
import Card from '../../components/Card'
import Cards from '../../components/Cards'

const DishList = () => {
    const { data: dishes, isLoading } = useDishes()

    if (isLoading) return 'Loading...'

    const content = dishes.map(dish => 
        <Card
            key={dish.id}
            title={dish.name}
            content={dish.description}
            link={`/dishes/${dish.id}`} 
        />
    )

    return <Cards>{content}</Cards>
}

export default DishList
