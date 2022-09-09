<template>
  <v-container fluid>
    <v-row>
      <v-col class="py-0" cols="12">
        <span> Logged in? </span>
        <span v-if="authenticated"> Yes </span>
        <span v-else> No </span>
      </v-col>
      <v-col class="py-0" cols="12">
        <div v-if="authenticated && datasetUrls">
          <span> Retrieved datasets! </span>
          <div v-for="dataset in datasetUrls" :key="dataset.version_uuid">
            <span> Dataset version: {{ dataset.version_uuid }} </span>
            <v-simple-table dense>
              <template #default>
                <thead>
                  <tr>
                    <th class="text-left">File</th>
                    <th class="text-left">Download url</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="url in dataset.files_with_urls" :key="url.file">
                    <td>
                      {{ url.file }}
                    </td>
                    <td>
                      {{ url.url }}
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </div>
        </div>
        <span v-else> Retrieving datasets... </span>
      </v-col>
    </v-row>
    <transition name="fade">
      <overlay v-if="loading" loading />
    </transition>
  </v-container>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import overlay from '~/components/overlay/Overlay'

export default {
  name: 'Homepage',
  components: {
    overlay,
  },
  computed: {
    ...mapState({
      authenticated: state => state.auth.authenticated,
      loading: state => state.loading,
      datasetUrls: state => state.dafni.datasetUrls,
    }),
  },
  mounted() {
    this.initialiseApp()
  },
  methods: {
    ...mapMutations({
      setLoading: 'setLoading',
    }),
    ...mapActions({
      getDatasets: 'dafni/getDatasets',
    }),
    async initialiseApp() {
      this.setLoading(true)
      await this.getDatasets()
      this.setLoading(false)
    },
  },
}
</script>
