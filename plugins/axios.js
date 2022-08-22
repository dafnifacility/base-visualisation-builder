import axios from 'axios'

/**
 * Add a configuration to all axios requests
 * @param configure A function to call before the request
 * @param error A function error handler for this configuration
 */
export function setRequestInterceptor(configure, error = null) {
  if (!error) {
    error = error => {
      return Promise.reject(error)
    }
  }
  axios.interceptors.request.use(configure, error)
}
