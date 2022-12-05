import React, { memo, useEffect, useState } from 'react'
import { tokenState, userState } from '../store/atom'
import { useRecoilValue, useRecoilState } from 'recoil'
import { getPurchasesInfo, getUserInfo, Purchase } from '../api'
import { Button, Card, Descriptions } from 'antd'

const oauthUrl =
  'https://itch.io/user/oauth?client_id=cdc8ea1c81cbc40d3bde07b162047093&scope=profile%3Ame&response_type=token&redirect_uri=http%3A%2F%2F127.0.0.1%3A5173%2Fauth'

// const GAME_ID = '1821866'
const GAME_ID = '1821952'

const Home: React.FC = () => {
  const token = useRecoilValue(tokenState)
  const [user, setUser] = useRecoilState(userState)
  const [purchasesInfo, setPurchasesInfo] = useState<Purchase | null>(null)
  useEffect(() => {
    if (token) {
      getUserInfo(token)
        .then((resUser) => {
          setUser(resUser)
        })
        .catch((error) => {
          console.error(error)
          window.location.href = oauthUrl
        })
    } else {
      window.location.href = oauthUrl
    }
  }, [setUser, token])

  const getPomodoro = () => {
    if (user) {
      getPurchasesInfo(GAME_ID, user.id).then((data) => {
        console.log(data)
        if (data.id) {
          setPurchasesInfo(data)
        }
      })
    }
  }

  return (
    <div className="container mx-auto p-2">
      <Card>
        {user && (
          <Descriptions title="用户信息">
            <Descriptions.Item label="id">{user.id}</Descriptions.Item>
            <Descriptions.Item label="username">
              {user.username}
            </Descriptions.Item>
          </Descriptions>
        )}
      </Card>
      <Card
        title="购买信息"
        extra={<Button onClick={getPomodoro}>是否购买pomodoro</Button>}
      >
        {purchasesInfo ? <h3>已经购买</h3> : <h3>未购买</h3>}
      </Card>
    </div>
  )
}

export default memo(Home)
