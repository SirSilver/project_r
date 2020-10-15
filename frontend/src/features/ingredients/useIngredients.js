import { useEffect, useState } from 'react'
import API from '../../app/api'

const useIngredients = dishId => {
    const [ingredients, setIngredients] = useState([])

    useEffect(() => {
        const fetchIngredients = async () => {
            try {
                const response = await API.dishes.getIngredients(dishId)
                setIngredients(response.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchIngredients()
    }, [dishId])

    return ingredients
}

export default useIngredients
