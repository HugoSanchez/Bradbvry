import {providers} from 'ethers'

import WalletConnectProvider from '@walletconnect/web3-provider'
import { ThreeIdConnect, EthereumAuthProvider } from '3id-connect'
import Web3Modal from 'web3modal'


export const threeID = new ThreeIdConnect()

export const web3Modal = new Web3Modal({
  network: 'mainnet',
  cacheProvider: true,
  providerOptions: {
    walletconnect: {
      package: WalletConnectProvider,
      options: {
        infuraId: 'e87f83fb85bf4aa09bdf6605ebe144b7',
      },
    },
  },
})


const  actions = {
    getSigner: async (provider) => {
        const providerInstance = new providers.Web3Provider(provider)
        const signer = providerInstance.getSigner()
        return signer;
    },

    getProvider: async () => {
        const ethProvider = await web3Modal.connect()
        const addresses = await ethProvider.enable()
        // return new EthereumAuthProvider(ethProvider, addresses[0])
        return ethProvider
    }
}

export let Eth = actions;