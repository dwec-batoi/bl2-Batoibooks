<template>
  <h2>Libros en el carrito</h2>
  <p v-if="!cart.length">No hay libros en el carrito</p>
  <div v-else>
    <book-item v-for="(book, index) in cart" :key="book.id" :book="book">
      <div>
        <button class="cart" title="Eliminar del carrito" @click="handleDelete(book, index)">
          <cart-off></cart-off>
        </button>
      </div>
    </book-item>
    <div>
      <p>Total de libros en el carrito: {{ cart.length }}</p>
      <p>Importe total: {{ totalImport }} €</p>
    </div>
    <button @click="buyCart()">Realizar la compra</button>
    <button @click="emptyCart()">Vaciar el carrito</button>
  </div>
</template>

<script>
import BookItem from '../components/BookItem.vue'
import { useStore } from '../stores/index.js';
import { mapState, mapActions } from 'pinia';
import CartOff from 'vue-material-design-icons/CartOff.vue'

export default {
  components: {
    CartOff,
    BookItem,
  },
  computed: {
    ...mapState(useStore, ['cart']),
    totalImport() {
      return this.cart.reduce((total, item) => total + item.price, 0).toFixed(2)
    }
  },
  methods: {
    ...mapActions(useStore, ['removeBookFromCart', 'removeAllBooksFromCart']),
    handleDelete(book, index) {
      if (
        confirm(
          'Vas a borrar el libro con id ' +
            book.id +
            ' del módulo "' +
            book.idModule +
            '"'
        )
      ) {
      this.removeBookFromCart(index)
      }
    },
  emptyCart() {
    if (
        confirm('Vas a eliminar todos los libros del carrito')
      ) {
      this.removeAllBooksFromCart()
      }
    },
    buyCart() {
      if (
        confirm('Vas a comprar todos los libros del carrito')
      ) {
        alert('Has hecho la compra')
      this.removeAllBooksFromCart()
      }

    }
  }
}
</script>
