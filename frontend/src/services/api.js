import axios from 'axios'

export const API = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    xsrfCookieName: 'csrftoken',
    xsrfHeaderName: 'X-CSRFTOKEN',
    withCredentials: true
})

const dishes = {
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
    create: async dishData => {
        const { data } = await API.post('/dishes/', dishData)
        return data
    },
    update: async (id, dishData) => {
        const { data } = await API.patch(`/dishes/${id}/`, dishData)
        return data
    }
}

const menus = {
    get: async (_, id = '') => {
        const { data } = await API.get(`/menus/${id}`)
        return data
    },
    getDishes: async (_, id) => {
        const { data } = await API.get(`/menus/${id}/dishes`)
        return data
    },
    getIngredients: async (_, id) => {
        const { data } = await API.get(`/menus/${id}/ingredients`)
        return data
    },
    create: async menuData => {
        const { data } = await API.post('/menus/', menuData)
        return data
    }
}

const ingredients = {
    create: async ingredientData => {
        const { data } = await API.post('/ingredients/', ingredientData)
        return data
    },
    update: async (id, ingredientData) => {
        const { data } = await API.patch(`/ingredients/${id}/`, ingredientData)
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
