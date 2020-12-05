import Vue from 'vue'
import Vuex from 'vuex'
import Entity from "@/interfaces/Entity";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    theme: 'dark',
    fiat: {id:0, name:'USD'},
    coin: {},
    activeTab: 'transfer',
    typingActive: '',
    fiatList: [],
    payment: {},
    desEmail: '',
  },

  mutations: {
    SET_THEME (state, newTheme) {
      state.theme = newTheme
    },

    setFiat (state, type) {
      state.fiat = type
    },

    setCoin (state, num) {
      state.coin = num
    },

    setActiveTab (state, type) {
      state.activeTab = type    // transfer or donate
    },

    setInputActive (state, type) {
      state.typingActive = type  // coin or fiat
    },

    setFiatList (state, payload) {
      state.fiatList = payload
    },

    setPayment (state, payload) {
      state.payment = payload
    },

    setDesEmail(state, payload) {
      state.desEmail = payload
    }
  },

  getters: {
    theme: state => state.theme,
    fiat: state => state.fiat,
    coin: state => state.coin,
    activeTab: state => state.activeTab,
    typingActive: state => state.typingActive,
    fiatList: state => state.fiatList,
    payment: state => state.payment,
    desEmail: state => state.desEmail
  }
})
