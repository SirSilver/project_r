import React from 'react'
import useDishes from './useDishes'
import Cards from '../../components/Cards'

const DishList = () => {
    const { data: dishes, isLoading } = useDishes()

    if (isLoading) return 'Loading...'

    return <Cards items={dishes} type='dishes' />
}

export default DishList
