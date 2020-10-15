import React from 'react'
import useAuth from './useAuth'

const Profile = () => {
    const { user } = useAuth()

    return <>{user.email}</>
}

export default Profile
