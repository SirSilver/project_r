import { useQuery, useQueryCache } from 'react-query'
import API from '../../services/api'

const useDish = id => {
    const queryCache = useQueryCache()
    const dish = useQuery(['dish', id], API.dishes.get, {
        initialData: () => queryCache.getQueryData('dishes')?.find(dish => dish.id === Number(id))
    })
    const ingredients = useQuery(['ingredients', id], API.dishes.getIngredients)
    const menus = useQuery(['dishMenus', id], API.dishes.getMenus, {
        initialData: () => queryCache.getQueryData('menus')?.filter(menu => menu.dishes.includes(dish.data.url))
    })

    return {
        ...dish, 
        ingredients: ingredients.data, 
        menus: menus.data,
        isLoading: dish.isLoading || ingredients.isLoading || menus.isLoading
    }
}

export default useDish
