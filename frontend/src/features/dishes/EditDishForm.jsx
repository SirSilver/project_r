import React from 'react'
import { useMutation } from 'react-query'
import { Link, useHistory, useParams } from 'react-router-dom'
import useDish from './useDish'
import DishForm from './DishForm'
import CenterButton from '../../components/CenterButton'
import DeleteButton from '../../components/DeleteButton'
import API from '../../services/api'

const EditDishForm = () => {
    const history = useHistory()
    const [deleteDish] = useMutation(API.dishes.delete)
    const { id } = useParams()
    const { data: dish, ingredients, isLoading } = useDish(id)

    const handleDelete = async () => {
        await deleteDish(id)
        history.push('..')
    }

    if (isLoading) return 'Loading...'

    return (
        <>
            <CenterButton variant='outlined' component={Link} to='.'>Cancel</CenterButton>
            <DishForm dish={dish} ingredients={ingredients} />
            <DeleteButton
                title={`Deleting "${dish.name}" dish`}
                content='Are you sure you want to delete this dish?'
                handleDelete={handleDelete}
            />
        </>
    )
}

export default EditDishForm
