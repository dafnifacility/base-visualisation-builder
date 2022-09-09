import { getInstance, getUrlsForDatasets } from '~/api/dafni'

export const state = () => ({
  instanceRetrievalError: null,
  datasetUrlsRetrievalError: null,
  datasetIds: null,
  datasetUrls: null,
})

export const mutations = {
  setDatasetIds(state, di) {
    state.datasetIds = di
  },
  setDatasetUrls(state, dur) {
    state.datasetUrls = dur
  },
  setInstanceError(state, err) {
    state.instanceRetrievalError = err
  },
  setDatasetUrlsError(state, err) {
    state.datasetUrlsRetrievalError = err
  },
}

export const actions = {
  async getDatasetIds({ commit }) {
    try {
      const response = await getInstance()
      const assets = response.data.visualisation_assets
      const ids = assets.map(a => a.asset_id)
      commit('setDatasetIds', ids)
    } catch (e) {
      console.error(e)
      commit('setInstanceError', `Error getting Instance data from NIVS. ${e}`)
    }
  },
  async getDatasetUrls({ state, commit }) {
    try {
      const response = await getUrlsForDatasets(state.datasetIds)
      commit('setDatasetUrls', response.data)
    } catch (e) {
      console.error(e)
      commit(
        'setDatasetUrlsError',
        `Error getting datasets from database. ${e}`
      )
    }
  },
  async getDatasets({ dispatch }) {
    await dispatch('getDatasetIds')
    await dispatch('getDatasetUrls')
  },
}
