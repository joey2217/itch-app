import request from '../utils/request'

export interface User {
  username: string
  gamer: boolean
  display_name: string
  cover_url: string
  url: string
  press_user: boolean
  developer: boolean
  id: number
}

export function getUserInfo(token: string): Promise<User> {
  return request({
    url: `/1/${token}/me`,
    method: 'GET',
  }).then((res) => {
    return res.data.user
  })
}

export interface Purchase {
  donation: boolean
  id: number
  email: string
  created_at: string
  source: string
  currency: string
  price: string
  sale_rate: number
  game_id: number
}

export function getPurchasesInfo(
  gameId: string,
  userId: number
): Promise<Purchase> {
  return request({
    url: `/1/key/game/${gameId}/purchases`,
    method: 'GET',
    params: {
      user_id: userId,
    },
  }).then((res) => {
    return res.data.purchases
  })
}
