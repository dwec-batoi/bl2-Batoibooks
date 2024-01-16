<script>
import AppMenu from './components/AppMenu.vue'
import AppMessages from './components/AppMessages.vue'
import { useStore } from './stores/index.js';
import { mapActions } from 'pinia';

export default {
  components: {
    AppMenu,
    AppMessages,
},
mounted() {
  this.loadModules()
  this.loadCart()
},
methods: {
  ...mapActions(useStore, ['loadModules', 'loadCart']),

}
}
</script>

<template>
  <header>
    <a href="http://www.cipfpbatoi.es" target="_blank">
      <img src="/logoBatoi.png" class="logo" alt="CIP FP Batoi" />
    </a>
    <h1>BatoiBooks</h1>
  </header>
  <div>
    <app-menu></app-menu>
    <app-messages></app-messages>
    <RouterView />
  </div>

  <footer>Juan Segura - DWEC</footer>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
