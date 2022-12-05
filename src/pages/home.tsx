import React, { memo, useEffect, useState } from 'react'
import axios from 'axios'

const TOKEN = 'token'
const oauthUrl =
  'https://itch.io/user/oauth?client_id=cdc8ea1c81cbc40d3bde07b162047093&scope=profile%3Ame&response_type=token&redirect_uri=http%3A%2F%2F127.0.0.1%3A5173%2Fauth'

// const KEY = 'cDYi9sVtFMXTzE9tGNX8QDgrJlXR9tYeCKXLNJrO'
// const API_KEY = 'Bearer ' + KEY
const HEADER_KEY = 'Authorization'

const request = axios.create({
  baseURL: '/api',
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    const token = localStorage.getItem(TOKEN)
    if (token && config.headers) {
      const headerKey = `Bearer ${token}`
      config.headers[HEADER_KEY] = headerKey
    }
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)

let KEY = 'zXFVZQjI1XcJrZQ8S2SzUviL5NQUrBqg03z7ICjA'
const GAME_ID = '1821866'

const Home: React.FC = () => {
  const [userInfo, setUserInfo] = useState<any | null>(null)
  useEffect(() => {
    // const token = localStorage.getItem(TOKEN)
    // if (!token) {
    //   window.location.href = oauthUrl
    // } else {
    //   KEY = token
    // }
  }, [])

  const getUserInfo = () => {
    request({
      url: `/1/${KEY}/me`,
      method: 'GET',
    }).then((res) => {
      console.log(res)
      setUserInfo(res.data.user)
    })
  }

  const getPurchasesInfo = () => {
    request({
      url: `/1/${KEY}/my-games`,
      method: 'GET',
    }).then((res) => {
      console.log(res)
    })
  }

  return (
    <div>
      <div>
        <button onClick={getUserInfo}>获取信息</button>
        {userInfo && (
          <div>
            <div>username:{userInfo.username}</div>
            <div>url:{userInfo.url}</div>
            <div>press_user:{userInfo.press_user}</div>
            <div>id:{userInfo.id}</div>
            <div>gamer:{userInfo.gamer}</div>
            <div>developer:{userInfo.developer}</div>
          </div>
        )}
      </div>
      <div>
        <button onClick={getPurchasesInfo}>是否购买pomodoro</button>
      </div>
    </div>
  )
}

export default memo(Home)
