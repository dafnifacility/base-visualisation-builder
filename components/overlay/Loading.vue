<template>
  <img
    :class="[loadingClass, position]"
    :src="src"
    width="48"
    height="48"
    alt=""
  />
</template>

<script>
export default {
  name: 'Loading',
  props: {
    position: {
      type: String,
      default: 'centered',
    },
    loadingClass: {
      type: String,
      default: 'loading',
    },
  },
  computed: {
    src() {
      return process.env.NODE_ENV === 'development'
        ? '/ui/loading.svg'
        : 'ui/loading.svg'
    },
  },
}
</script>
