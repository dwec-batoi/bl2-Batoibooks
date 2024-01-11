<template>
  <div>
    <div
      class="error alert alert-danger alert-dismissible"
      role="alert"
      v-for="(message, index) in messages"
      :key="index"
    >
      {{ message }}
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="alert"
        aria-label="Close"
        @click="remove(index)"
      >
        x
      </button>
    </div>
  </div>
</template>

<script>
import { useStore } from '../stores/index.js';
import { mapState, mapActions } from 'pinia';

export default {
  computed: {
    ...mapState(useStore, {
      messages: 'messages',
    })
  },
  methods: {
    ...mapActions(useStore, ['clearMessageAction']),
    remove(index) {
      this.clearMessageAction(index)
    }
  }
}
</script>

<style scoped>
.error {
  background-color: lightcoral;
}
.info {
  background-color: lightgreen;
}
</style>
