<template>
  <div class="card">
    <img :src="'/img/' + book.photo" :alt="'Libro: ' + book.id" />
    <div>
      <h2>{{ getModuleByCode(book.idModule).cliteral + ' (' + book.id + ')' }}</h2>
      <h3>{{ book.publisher }}</h3>
      <p>Precio: {{ book.price.toFixed(2) }} €</p>
      <p>Páginas: {{ book.pages }}</p>
      <p>Estado: {{ book.status }}</p>
      <p>{{ book.soldDate ? 'Vendido el ' + book.soldDate : 'En venta' }}</p>
      <p>Comentarios: {{ book.comments || '' }}</p>
    </div>
    <slot><div></div></slot>
  </div>
</template>

<script>
import { useStore } from '../stores/index.js';
import { mapState } from 'pinia';

export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapState(useStore, ['getModuleByCode']),
  }
}
</script>

<style scoped>
.card {
  margin: 1em;
  background-color: beige;
}

.card img {
  height: 150px;
  margin:auto;
        display:block;
}
</style>
