import axios from 'axios'

/* eslint-disable */
export let visualisationApiUrl = "https://fwd.secure.dafni.rl.ac.uk/nivs"
export let nidApiUrl = "https://fwd.secure.dafni.rl.ac.uk/nid/nid"
export let nivsMinioUrl = "https://fwd.secure.dafni.rl.ac.uk/nivsstore"
export let nidMinioUrl = "https://fwd.secure.dafni.rl.ac.uk/nidminio"
export let environment = process.env.NODE_ENV
export let instanceID = process.env.INSTANCE_ID

const appMode = process.env.NODE_ENV

function useDefaults() {
  instanceID = '798c22e4-f74f-420c-bf25-39f2be32a9ac'
}

if (appMode !== 'production') {
  useDefaults()
  environment = "dev"
}

async function backends() {
  try {
    const response = await axios.get('./backends/backends.json')
    environment = response.data.node_env
    instanceID = response.data.instanceID
  } catch (error) {
    console.error(`Error while loading settings from server: ${error}`)
    useDefaults()
  }
}

export let backendsPromise = backends()
