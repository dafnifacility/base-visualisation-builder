<template>
  <div class="overlay centered">
    <div class="loadingText">
      <h2>
        <loading :loading-class="null" />
        <span>{{ text }}</span>
      </h2>
    </div>
  </div>
</template>

<script>
/**
 * Create an overlay with DAFNI loading image and text in the centre
 */
import loading from '~/components/overlay/Loading'
export default {
  components: {
    loading,
  },
  props: {
    loading: {
      type: Boolean,
      default: false,
    },
    text: {
      type: String,
      default: 'Loading...',
    },
  },
}
</script>
