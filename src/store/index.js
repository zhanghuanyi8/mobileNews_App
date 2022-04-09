import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: getItem('TOKEN_KEY1')
  },
  getters: {
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      setItem('TOKEN_KEY1', data)
    }
  },
  actions: {
  },
  modules: {
  }
})
