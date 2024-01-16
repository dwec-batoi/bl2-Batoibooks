import { defineStore } from 'pinia'
import ModulesRepository from '../repositories/modules.repository'

export const useStore = defineStore('store', {
  state() {
    return {
      messages: [],
      modules: [],
      cart: []
    }
  },
  getters: {
    getModuleByCode: (state) => (code) => state.modules.find((item) => item.code === code) || {},
    isBookInCart: (state) => (bookId) => state.cart.some((item) => item.id === bookId)
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
    async loadModules() {
      const repository = new ModulesRepository()
      try {
        this.modules = await repository.getAllModules()
      } catch (error) {
        this.setMessageAction(error.message)
      }
    },
    addBookToCart(book) {
      this.cart.push(book)
      localStorage.cart = JSON.stringify(this.cart)
    },
    removeBookFromCart(index) {
      this.cart.splice(index, 1)
      localStorage.cart = JSON.stringify(this.cart)
    },
    removeAllBooksFromCart() {
      this.cart = []
      localStorage.removeItem('cart')
    },
    loadCart() {
      if (localStorage.cart) {
        this.cart = JSON.parse(localStorage.cart)
      }
    },
  }
})
