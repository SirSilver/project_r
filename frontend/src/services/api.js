import axios from 'axios'

export const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFTOKEN',
    withCredentials: true
})

const dishes = {
    create: async dishData => {
        const { data } = await API.post('/dishes/', dishData)
        return data
    },
    delete: async id => {
        const { data } = await API.delete(`/dishes/${id}/`)
        return data
    },
    get: async (_, id = '') => {
        const { data } = await API.get(`/dishes/${id}`)
        return data
    },
    getIngredients: async (_, id) => {
        const { data } = await API.get(`/dishes/${id}/ingredients`)
        return data
    },
    getMenus: async (_, id) => {
        const { data } = await API.get(`/dishes/${id}/menus`)
        return data
    },
    setImage: async ({ id, image }) => {
        const { data } = await API.post(`/dishes/${id}/set_image/`, image)
        return data
    },
    update: async dishData => {
        const { data } = await API.patch(`/dishes/${dishData.id}/`, dishData)
        return data
    }
}

const menus = {
    addDishes: async ({ id, dishList }) => {
        const { data } = await API.post(`/menus/${id}/add_dish/`, dishList)
        return data
    },
    create: async menuData => {
        const { data } = await API.post('/menus/', menuData)
        return data
    },
    delete: async id => {
        const { data } = await API.delete(`/menus/${id}/`)
        return data
    },
    get: async (_, id = '') => {
        const { data } = await API.get(`/menus/${id}`)
        return data
    },
    getDishes: async (_, id) => {
        const { data } = await API.get(`/menus/${id}/dishes`)
        return data
    },
    getDishesToAdd: async (_, id) => {
        const { data } = await API.get(`/menus/${id}/add_dish`)
        console.log(data)
        return data
    },
    getIngredients: async (_, id) => {
        const { data } = await API.get(`/menus/${id}/ingredients`)
        return data
    },
}

const ingredients = {
    create: async ingredientData => {
        const { data } = await API.post('/ingredients/', ingredientData)
        return data
    },
    delete: async id => {
        const { data } = await API.delete(`/ingredients/${id}/`)
        return data
    },
    update: async ingredientData => {
        const { data } = await API.patch(`/ingredients/${ingredientData.id}/`, ingredientData)
        return data
    }
}

const auth = {
    user: async () => {
        const { data } = await API.get('/auth/user/')
        return data
    },
    login: async credentials => {
        const { data } = await API.post('/auth/login/', credentials)
        return data
    },
    logout: async () => {
        const response = await API.post('/auth/logout/')
        return response
    },
    register: async userData => {
        const { data } = await API.post('/auth/registration/', userData)
        return data
    },
}

export default {
    auth,
    dishes,
    menus,
    ingredients,
}
