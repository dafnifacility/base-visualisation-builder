<template>
  <div class="overlay">
    <loading v-if="loading" />
  </div>
</template>

<script>
import loading from './Loading'
export default {
  name: 'Overlay',
  components: {
    loading,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
