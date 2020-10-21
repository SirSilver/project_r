import React from 'react'
import { useMutation } from 'react-query'
import { Link, useHistory, useParams } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import PhotoCamera from '@material-ui/icons/PhotoCamera'
import useDish from './useDish'
import DishForm from './DishForm'
import CenterButton from '../../components/CenterButton'
import DeleteButton from '../../components/DeleteButton'
import API from '../../services/api'

const useStyles = makeStyles({
    input: {
        display: 'none'
    }
})

const EditDishForm = () => {
    const history = useHistory()
    const [deleteDish] = useMutation(API.dishes.delete)
    const { id } = useParams()
    const classes = useStyles()
    const { data: dish, ingredients, isLoading } = useDish(id)

    const handleDelete = async () => {
        await deleteDish(id)
        history.push('..')
    }
    const handleSubmit = async event => {
        console.log(event.target.files[0])
        const data = new FormData()
        data.append('image', event.target.files[0])
        await API.dishes.setImage({id: id, image: data})
    }

    if (isLoading) return 'Loading...'

    return (
        <>
            <CenterButton variant='outlined' component={Link} to='.'>Cancel</CenterButton>
            <input accept='image/*' className={classes.input} id='upload-image' type='file' onChange={handleSubmit} />
            <label htmlFor='upload-image'>
                <IconButton color='primary' component='span'>
                    <PhotoCamera />
                </IconButton>
            </label>
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
