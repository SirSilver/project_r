import { useQuery, useQueryCache } from 'react-query'
import API from '../../services/api'

const useMenu = id => {
    const queryCache = useQueryCache()

    const menu = useQuery(['menu', id], API.menus.get, {
        initialData: () => queryCache.getQueryData('menus')?.find(menu => menu.id === Number(id))
    })
    const dishes = useQuery(['menuDishes', id], API.menus.getDishes, {
        initialData: () => queryCache.getQueryData('dishes')?.filter(dish => dish.menus.includes(menu.data.url))
    })
    const ingredients = useQuery(['menuIngredients', id], API.menus.getIngredients)

    return {
        ...menu,
        dishes: dishes.data,
        ingredients: ingredients.data,
        isLoading: menu.isLoading || dishes.isLoading || ingredients.isLoading
    }
}

export default useMenu
