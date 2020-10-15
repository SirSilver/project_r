import axios from 'axios'

const AUTH = axios.create({
    baseURL: process.env.REACT_APP_API_URL
})

export default {
    login: credentials => AUTH.post('/auth/login', credentials),
}
