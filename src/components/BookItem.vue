<template>
  <div class="card">
    <img :src="book.photo" :alt="'Libro: ' + book.id" />
    <div>
      <h5>{{ book.idModule + ' (' + book.id + ')' }}</h5>
      <h6>{{ book.publisher }}</h6>
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
export default {
  props: {
    book: {
      type: Object,
      required: true
    }
  },
}
</script>

<style scoped>
.card {
  margin: 1em;
  background-color: beige;
}
</style>
