import { useGlobalContext } from '@/context/AuthContext';
import React from 'react'

const User = async () => {
    const { user } = useGlobalContext();
  return (
<span className="font-semibold">{user != [] ? user.email : ''}  </span>
  )
}

export default User