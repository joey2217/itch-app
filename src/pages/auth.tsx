import React, { memo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Auth: React.FC = () => {
  const navigate = useNavigate()

  useEffect(() => {
    var queryString = window.location.hash.slice(1)
    var params = new URLSearchParams(queryString)
    var accessToken = params.get('access_token')
    if (accessToken) {
      localStorage.setItem('token', accessToken)
      navigate('/', { replace: true })
    }
    // you can also get the state param if you're using it:
    // var state = params.get("state");
  }, [])
  
  return <h2>Loading</h2>
}

export default memo(Auth)
