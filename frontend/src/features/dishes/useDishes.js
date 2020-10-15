import { useQuery } from 'react-query'
import API from '../../services/api'

const useDishes = () => {
    return useQuery('dishes', API.dishes.get)
}

export default useDishes
