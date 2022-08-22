<template>
  <div />
</template>
<script>
import { backendsPromise, instanceID } from '~/api/backends/'

export default {
  name: 'Instance',
  async mounted() {
    await backendsPromise
    this.$router.push(`instance/${instanceID}`)
  },
}
</script>
