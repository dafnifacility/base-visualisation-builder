<template>
  <v-app>
    <transition name="fade">
      <!-- Authentication check -->
      <OverlayWithText
        v-if="!authenticated && errorMessage === ''"
        :text="spinnerText"
      />
    </transition>
    <v-main v-if="authenticated">
      <nuxt />
    </v-main>
    <v-footer style="justify-content: center">
      <span style="display: flex; align-items: center">
        Powered by
        <v-img
          src="/ui/dafni-logo-grey.png"
          :contain="true"
          alt="DAFNI logo"
          width="122"
          height="30"
          class="ml-2"
        />
      </span>
    </v-footer>
  </v-app>
</template>
<script>
import { mapState } from 'vuex'
import OverlayWithText from '~/components/overlay/OverlayWithText'

export default {
  components: {
    OverlayWithText,
  },
  data: () => ({
    errorMessage: '',
  }),
  computed: {
    ...mapState({
      uuid: state => state.auth.uuid,
      authenticated: state => state.auth.authenticated,
      keycloakReady: state => state.auth.keycloakReady,
      keycloakError: state => state.auth.keycloakError,
    }),
    src() {
      return process.env.NODE_ENV === 'development'
        ? '/ui/dafni-logo-white.png'
        : 'ui/dafni-logo-white.png'
    },

    spinnerText() {
      return this.keycloakReady ? 'Contacting Auth service...' : 'Logging in...'
    },
  },
  watch: {
    keycloakError() {
      this.errorMessage = 'Sorry, unable to log in at this time...'
      console.warn(this.keycloakError)
    },
  },
}
</script>
<style lang="scss">
.v-app-bar {
  box-shadow: none !important;
  .v-btn--icon {
    color: $color-white !important;
  }
}
.v-toolbar__content,
.v-toolbar__extension {
  padding-left: 8px !important;
}
.v-application {
  background-color: #fafafa !important;
}
.logo {
  display: flex;
  align-items: center;
  margin: 0 70px 0 16px;
}
</style>
