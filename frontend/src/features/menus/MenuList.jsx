import React from 'react'
import useMenus from './useMenus'
import Cards from '../../components/Cards'

const MenuList = () => {
    const { data: menus, isLoading } = useMenus()

    if (isLoading) return 'Loading...'

    return <Cards items={menus} type='menus' />
}

export default MenuList
