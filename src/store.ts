import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'dark',
    fiat: 'USD',
  },

  mutations: {
    SET_THEME (state, newTheme) {
      state.theme = newTheme
    },

    SET_FIAT (state, type) {
      state.fiat = type
    },
  },

  getters: {
    theme: state => state.theme,

    fiatType (state) {
      const text = state.fiat
      const type = (text == 'USD') ? 0 : 1
      return { text: text, value: type}
    }
  }
})
