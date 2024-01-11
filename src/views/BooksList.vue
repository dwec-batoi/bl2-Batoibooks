<template>
  <div>
    <book-item
      v-for="(book, index) in books"
      :key="book.id"
      :book="book"
      @remove="delBook(book.id, index)"
    >
      <div>
        <button class="cart add-cart" title="Añadir al carrito">
          <cart-plus></cart-plus>
        </button>
        <button class="edit" title="Editar" @click="$router.push('edit-book/' + book.id)">
          <pencil></pencil>
        </button>
        <button class="delete" title="Eliminar" @click="handleDelete(book.id, index, book.idModule)">
          <delete></delete>
        </button>
      </div>  
    </book-item>
  </div>
</template>

<script>
import Delete from 'vue-material-design-icons/Delete.vue'
import CartPlus from 'vue-material-design-icons/CartPlus.vue'
import Pencil from 'vue-material-design-icons/Pencil.vue'

import BookItem from '../components/BookItem.vue'
import BooksRepository from '../repositories/books.repository'
import { useStore } from '../stores/index.js';
import { mapActions } from 'pinia';

export default {
  components: {
    Delete,
    CartPlus,
    Pencil,
    BookItem
  },
  data() {
    return {
      books: [],
      repository: new BooksRepository()
    }
  },
  created() {
    this.getBooks()
  },
  methods: {
    ...mapActions(useStore, ['setMessageAction']),
    async getBooks() {
      try {
        const response = await this.repository.getAllBooks()
        this.books = response
      } catch (error) {
        console.error(error.message)
        this.setMessageAction(error.message)
      }
    },
    async handleDelete(id, index, idModule) {
      if (
        confirm(
          'Vas a borrar el libro con id ' +
            id +
            ' del módulo "' +
            idModule +
            '"'
        )
      ) {
      try {
        await this.repository.removeBook(id)
        this.books.splice(index, 1)
      } catch (error) {
        this.setMessageAction(error.message)
      }
    }
  }
}
}
</script>
