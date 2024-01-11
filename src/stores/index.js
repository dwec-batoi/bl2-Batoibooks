import { defineStore } from 'pinia'

export const useStore = defineStore('store', {
  state() {
    return {
      messages: [],
      modules: [],
      cart: [],
    }
  },
  getters: {
    getModuleByCode: (state) => (code) => state.modules.find(
      (item) => item.code === code
    )
  },
  actions: {
    setMessageAction(newValue) {
      if (this.debug) console.log('setMessageAction triggered with ', newValue)
      this.messages.push(newValue)
    },
    clearMessageAction(index) {
      if (this.debug) console.log('clearMessageAction triggered with ', index)
      this.messages.splice(index, 1)
    },
    loadModules() {

    },
  }
})
