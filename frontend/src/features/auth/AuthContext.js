import React, { createContext, useEffect, useState } from 'react'
import API from '../../services/api'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuth, setIsAuth] = useState(false)
    const [isAuthenticating, setIsAuthenticating] = useState(true)

    const authenticate = async () => {
        try {
            setUser(await API.auth.user())
            setIsAuth(true)
        } catch {}
        setIsAuthenticating(false)
    }

    useEffect(() => {
        authenticate()
    }, [])

    const login = async credentials => {
        try {
            await API.auth.login(credentials)
            authenticate()
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const logout = async () => {
        try {
            await API.auth.logout()
            setIsAuth(false)
            setUser(null)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const register = async userData => {
        try {
            const data = await API.auth.register(userData)
            console.log(data)
        } catch (error) {
            return Promise.reject(error)
        }
    }

    return (
        <AuthContext.Provider value={{ isAuth, isAuthenticating, login, logout, register, user }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext
