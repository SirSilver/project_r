import { useQuery } from 'react-query'
import API from '../../services/api'

const useMenu = id => {
    const menu = useQuery(['menu', id], API.menus.get)

    return menu
}

export default useMenu
