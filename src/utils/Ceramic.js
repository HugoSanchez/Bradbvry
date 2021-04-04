import Ceramic from '@ceramicnetwork/http-client'

export async function createCeramic() {
  let ceramic = new Ceramic('https://ceramic-clay.3boxlabs.com')
  window.ceramic = ceramic
  return Promise.resolve(ceramic)
  // return Promise.resolve(ceramic)
}
