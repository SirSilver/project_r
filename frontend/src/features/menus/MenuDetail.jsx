import React from 'react'
import { useParams } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import useMenu from './useMenu'

const MenuDetail = () => {
    const { id } = useParams()
    const { data: menu, isLoading } = useMenu(id)

    if (isLoading) return 'Loading...'

    return (
        <Typography>{menu.name}</Typography>
    )
}

export default MenuDetail
