import React from 'react'
import { useMutation } from 'react-query'
import { useHistory, useParams } from 'react-router-dom'
import useMenu from './useMenu'
import MenuForm from './MenuForm'
import CenterButton from '../../components/CenterButton'
import DeleteButton from '../../components/DeleteButton'
import API from '../../services/api'

const EditMenuForm = () => {
    const history = useHistory()
    const [deleteMenu] = useMutation(API.menus.delete)
    const { id } = useParams()
    const { data: menu, isLoading } = useMenu(id)

    const handleDelete = async () => {
        await deleteMenu(id)
        history.push('/menus')
    }

    if (isLoading) return 'Loading...'

    return (
        <>
            <CenterButton variant='outlined' onClick={() => history.push('.')}>Cancel</CenterButton>
            <MenuForm name={menu.name} description={menu.description} />
            <DeleteButton
                title={`Deleting "${menu.name}" menu`}
                content='Are you sure you want to delete this menu?'
                handleDelete={handleDelete}
            />
        </>
    )
}

export default EditMenuForm
