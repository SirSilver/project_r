import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import useAuth from './useAuth'

const ProtectedRoute = ({ component, ...rest }) => {
    const { isAuth, isAuthenticating } = useAuth()

    if (isAuthenticating) return 'Authenticating...'

    if (!isAuth) return <Redirect to='/login' />

    return <Route component={component} {...rest} />
}

export default ProtectedRoute
