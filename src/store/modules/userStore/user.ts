
import { defineStore } from 'pinia';
import { login } from '@/api/user'
import { setToken } from '@/utils/auth'

export const useAuthStore = defineStore({
  id: 'auth', // 唯一的 store 标识符

  state: () => ({
    isAuthenticated: false, // 登录状态
    user: null as null | string, // 用户信息，可以是用户名或用户对象
  }),

  getters: {
    // 添加 getters，用于获取状态
    isLoggedIn: (state) => state.isAuthenticated,
    currentUser: (state) => state.user,
  },

  actions: {
    // 添加 actions，用于修改状态
    loginUser(userInfo: object) {
        const { username, password } = userInfo
        return new Promise((resolve, reject) => {
            login({ username: username.trim(), password: password }).then(response => {
                setToken(response.data.JsessionId)
                this.user = response.data.items[0]
                resolve()
            }).catch(error => {    
                reject(error)
            })
        })
    },

    logout() {
      this.isAuthenticated = false;
      this.user = null;
    },
  },
});
