import { defineService } from '@/utils/define'

export const useAccountService = defineService({
  getUserInfo() {
    return Promise.resolve({ username: 'admin' })
  },
  async login(username: string, password: string) {
    return { username, password }
  },
  async logout() {
    return {}
  },
})
