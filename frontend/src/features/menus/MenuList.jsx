import React from 'react'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import useMenus from './useMenus'
import Card from '../../components/Card'
import Cards from '../../components/Cards'

const MenuList = () => {
    const { data: menus, isLoading } = useMenus()

    if (isLoading) return 'Loading...'

    const content = menus.map(menu => 
        <Card
            key={menu.id}
            title={menu.name}
            created_at={menu.created_at}
            dialogContent={<Typography>menu.description</Typography>}
            dialogActions={<Button color='primary' component={Link} to={`/menus/${menu.id}`}>Details</Button>}
        />
    )

    return <Cards>{content}</Cards>
}

export default MenuList
