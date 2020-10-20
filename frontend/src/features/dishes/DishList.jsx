import React from 'react'
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
            created_at={dish.created_at}
            content={dish.description}
            link={`/dishes/${dish.id}`} 
        />
    )

    return <Cards>{content}</Cards>
}

export default DishList
