<template>
  <div>
    <form novalidate
      @submit.prevent="handleSubmit" 
      @reset.prevent="handleReset">
      <legend>{{  formTitle }}</legend>
      <div>
        <label>Id:</label>
        <input type="text" v-model="book.id" disabled /><br />
        <span class="error"></span>
      </div>
      <div>
        <label>Módulo:</label>
        <select v-model="book.idModule" required>
          <option value="">- Selecciona un módulo -</option>
          <option v-for="module in modules" :key="module.code" :value="module.code">
            {{ module.cliteral }}
          </option>
        </select><br />
        <span class="error"></span>
      </div>

      <div>
        <label>Editorial:</label>
        <input type="text" v-model="book.publisher" required /><br />
        <span class="error"></span>
      </div>

      <div>
        <label>Precio:</label>
        <input type="number" v-model="book.price" required min="0" step="0.01" /><br />
        <span class="error"></span>
      </div>

      <div>
        <label>Páginas:</label>
        <input type="number" v-model="book.pages" required min="0" /><br />
        <span class="error"></span>
      </div>

      <div>
        <label>Estado:</label>
        <!-- Aquí poned un radiobutton para cada estado -->
        <input type="radio" name="status" v-model="book.status" value="new" required />Nuevo<br />
        <input type="radio" name="status" v-model="book.status" value="good" />Bueno<br />
        <input type="radio" name="status" v-model="book.status" value="used" />Usado<br />
        <input type="radio" name="status" v-model="book.status" value="bad" />Malo<br />
        <span class="error"></span>
      </div>

      <div>
        <label>Comentarios:</label>
        <textarea v-model="book.comments" ></textarea>
        <span class="error"></span>
      </div>

      <button type="submit">{{ formButtonTitle }}</button>
      <button type="reset">Reset</button>
    </form>
  </div>
</template>

<script>
import BooksRepository from '../repositories/books.repository'
import { useStore } from '../stores/index.js';
import { mapState, mapActions } from 'pinia';

export default {
  props: ['id'],
  computed: {
    ...mapState(useStore, ['modules']),
    editing() {
      return !!this.id
    },
    formTitle() {
      return this.editing
        ? 'Editar libro'
        : 'Añadir libro'
    },
    formButtonTitle() {
      return this.editing
        ? 'Editar'
        : 'Añadir'
    },
  },
  data() {
    return {
      book: { idModule: '' },
      repository: new BooksRepository()
    }
  },
  mounted() {
    if (this.editing) {
      this.loadBook()
    } else {
      this.book = { idModule: '' }
    }
  },
  methods: {
    ...mapActions(useStore, ['setMessageAction']),
    async loadBook() {
      try {
        const response = await this.repository.getBookById(this.id)
        this.book = response
      } catch (error) {
        store.setMessageAction(error.message)
      }

    },
    async handleSubmit() {
      try {
        if (this.editing) {
          await this.repository.changeBook(this.book)
        } else {
          await this.repository.addBook(this.book)
        }
        this.book = {}
        this.$router.push('/')
      } catch (error) {
        store.setMessageAction(error.message)
      }

    },
    handleReset() {
      if (this.editing) {
      this.loadBook()
    } else {
      this.book = { idModule: '' }
    }
    }

  }
}
</script>

<style scoped>
span.error {
  color: red;
}
</style>
