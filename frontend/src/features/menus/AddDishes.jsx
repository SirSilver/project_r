import React, { useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { useMutation, useQuery, useQueryCache } from 'react-query'
import { makeStyles } from '@material-ui/core/styles'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Cards from '../../components/Cards'
import API from '../../services/api'

const useStyles = makeStyles(theme => ({
    saveButton: {
        marginBottom: theme.spacing(2)
    }
}))

const AddDishes = () => {
    const queryCache = useQueryCache()
    const { id } = useParams()
    const [addList, setAddList] = useState([])
    const [addDishes] = useMutation(API.menus.addDishes)
    const history = useHistory()
    const classes = useStyles()

    const { data: menu, isLoading: menuIsLoading } = useQuery(['menu', id], API.menus.get, {
        initialData: () => queryCache.getQueryData(['menu', id])
    })
    const { data: dishesToAdd, isLoading: dishesToAddIsLoading, isSuccess } = useQuery(['dishesToAdd', id], API.menus.getDishesToAdd, {
        initialData: () => queryCache.getQueryData('dishes')?.includes(dish => !dish.menus.includes(menu.data.url)),
        enabled: menu
    })

    const handleAddClick = id => {
        setAddList([...addList, id])
    }
    const handleRemoveClick = id => {
        setAddList(addList.filter(dishId => dishId !== id))
    }
    const handleSaveClick = async () => {
        await addDishes({ id, dishList: addList })
        history.push('.')
    }

    const addButton = dishId => (
        <Button color='primary' variant='contained' onClick={() => handleAddClick(dishId)}>Add</Button>
    )
    const removeButton = dishId => (
        <Button color='secondary' variant='contained' onClick={() => handleRemoveClick(dishId)}>Remove</Button>
    )
    const saveButton = (
            <Button color='primary' variant='contained' onClick={handleSaveClick}>Save</Button>
    )
    const cancelButton = <Button variant='contained'>Cancel</Button>


    if (menuIsLoading || dishesToAddIsLoading)
        return 'Loading...'

    if (!dishesToAdd.length && isSuccess)
        return <Typography align='center' variant='h4'>No dishes to add</Typography>

    return (
        <>
            <Box align='center' className={classes.saveButton}>
                {saveButton}{cancelButton}
            </Box>
            <Cards items={dishesToAdd} type='dishes' />
        </>
    )
}

export default AddDishes
