import axios from 'axios'
import { ref, unref } from 'vue'
import { defineStore } from 'pinia'

export const useAccountStore = defineStore('account', () => {
  const account = ref()

  const getUserInfo = async () => {
    if (unref(account)) {
      return unref(account)
    }

    const data = await new Promise((resolve) => {
      resolve({})
    })
    account.value = data
    return unref(account)
  }

  const login = async (username: string, password: string) => {
    // 登录
    return axios.post('user/v1/account/login', { username, password }).then((res) => {
      return res
    })
  }

  const logout = async () => {
    // 退出登录
    // console.log('退出登录')
    return axios.post('user/v1/account/logout')
  }

  return {
    account,
    getUserInfo,
    login,
    logout,
  }
})
