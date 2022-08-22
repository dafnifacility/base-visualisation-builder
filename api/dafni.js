import {
  instanceID,
  nidApiUrl,
  nidMinioUrl,
  visualisationApiUrl,
} from '~/api/backends/'
import axios from 'axios'

export function replaceMinioUrl(presignedUrl, replacementUrl) {
  if (!replacementUrl) return presignedUrl

  const dafniUrl = 'dafni.rl.ac.uk'
  const dafniIndex = presignedUrl.indexOf(dafniUrl)
  const indexToSlice = dafniIndex + dafniUrl.length
  const presignedUrlMinusHost = presignedUrl.slice(indexToSlice)
  return replacementUrl.concat(presignedUrlMinusHost)
}

export async function downloadFileFromMinio(presignedUrl) {
  const response = await axios.get(replaceMinioUrl(presignedUrl, nidMinioUrl))
  return response.data
}

export async function getInstance() {
  return await axios.get(`${visualisationApiUrl}/instances/${instanceID}`)
}

export async function getUrlsForDatasets(ids) {
  return await axios.post(`${nidApiUrl}/version/batch/`, {
    version_uuids: ids,
  })
}

export default {
  getInstance,
  getUrlsForDatasets,
  downloadFileFromMinio,
}
