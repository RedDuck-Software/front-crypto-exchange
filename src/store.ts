import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'dark',
    fiat: 'USD',
    activeTab: 'transfer',
    typingActive: '',
  },

  mutations: {
    SET_THEME (state, newTheme) {
      state.theme = newTheme
    },

    SET_FIAT (state, type) {
      state.fiat = type
    },

    SET_ACTIVE_TAB (state, type) {
      state.activeTab = type    // transfer or donate
    },

    SET_INPUT_ACTIVE (state, type) {
      state.typingActive = type  // coin or fiat
    },
  },

  getters: {
    theme: state => state.theme,

    fiatType (state) {
      const text = state.fiat
      const type = (text == 'USD') ? 0 : 1
      return { text: text, value: type}
    },

    activeTab: state => state.activeTab,
    typingActive: state => state.typingActive,
  }
})
