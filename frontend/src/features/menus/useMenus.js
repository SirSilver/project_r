import { useQuery } from 'react-query'
import API from '../../services/api'

const useMenus = () => {
    const menus = useQuery('menus', API.menus.get)

    return menus
}

export default useMenus
