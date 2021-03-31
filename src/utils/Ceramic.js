import Ceramic from '@ceramicnetwork/http-client'

export async function createCeramic() {
  return new Ceramic('https://ceramic-clay.3boxlabs.com')
  // window.ceramic = ceramic
  // return Promise.resolve(ceramic)
}
