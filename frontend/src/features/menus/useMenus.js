import { useQuery } from 'react-query'
import API from '../../services/api'

const useMenus = () => {
    return useQuery('menus', API.menus.get)
}

export default useMenus
