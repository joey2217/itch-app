import { atom } from 'recoil'
import { User } from '../api'
import { TOKEN_KEY } from '../utils/auth'
import { simpleLocalStorageEffect } from './helper'

export const tokenState = atom({
  key: 'tokenState',
  default: '',
  effects: [simpleLocalStorageEffect<string>(TOKEN_KEY)],
})

export const userState = atom<User | undefined>({
  key: 'userState',
  default: undefined,
})
