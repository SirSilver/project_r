import { useQuery, useQueryCache } from 'react-query'
import API from '../../services/api'

const useDish = id => {
    const queryCache = useQueryCache()
    const dish = useQuery(['dish', id], API.dishes.get, {
        initialData: () => {
            return queryCache.getQueryData('dishes')?.find(dish => dish.id === Number(id))
        }
    })
    const ingredients = useQuery(['ingredients', id], API.dishes.getIngredients, {
        initialData: () => {
            return queryCache.getQueryData(['ingredients', id])
        }
    })
    const menus = useQuery(['dishMenus', id], API.dishes.getMenus, {
        initialData: () => {
            return queryCache.getQueryData(['dishMenus', id])
        }
    })

    return {
        ...dish, 
        ingredients: ingredients.data, 
        menus: menus.data,
        isLoading: dish.isLoading || ingredients.isLoading || menus.isLoading
    }
}

export default useDish
