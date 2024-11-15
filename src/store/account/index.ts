import { ref, unref } from 'vue'
import { defineStore } from 'pinia'
import { useAccountService } from '@/service/account'

export const useAccountStore = defineStore('account', () => {
  const service = useAccountService()

  const account = ref()

  const getUserInfo = async () => {
    if (unref(account)) {
      return unref(account)
    }

    const data = await service.getUserInfo()
    account.value = data
    return unref(account)
  }

  const login = async (username: string, password: string) => {
    // 登录
    return service.login(username, password)
  }

  const logout = async () => {
    // 退出登录
    // console.log('退出登录')
    return service.logout()
  }

  return {
    account,
    getUserInfo,
    login,
    logout,
  }
})
