import React from 'react'
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
            content={menu.description}
            link={`/menus/${menu.id}`} 
        />
    )

    return <Cards>{content}</Cards>
}

export default MenuList
