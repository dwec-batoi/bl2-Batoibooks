import { createRouter, createWebHistory } from 'vue-router'
import BooksList from '../views/BooksList.vue'
import AddBook from '../views/AddBook.vue'
import AppCart from '../views/AppCart.vue'
import AppAbout from '../views/AppAbout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: BooksList
    },
    {
      path: '/add-book',
      name: 'formAdd',
      component: AddBook
    },
    {
      path: '/edit-book/:id',
      name: 'formEdit',
      component: AddBook,
      props: true
    },
    {
      path: '/cart',
      name: 'cart',
      component: AppCart
    },
    {
      path: '/about',
      name: 'about',
      component: AppAbout
    },
  ]
})

export default router
