import {providers} from 'ethers'

const  actions = {
    getSigner: async (magic) => {
        const provider = new providers.Web3Provider(magic.rpcProvider)
        const signer = provider.getSigner()
        return signer;
    }
}

export let Eth = actions;