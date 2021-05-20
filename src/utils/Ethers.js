import {providers} from 'ethers'

const  actions = {
    getSigner: async (magic) => {
        const provider = new providers.Web3Provider(magic.rpcProvider)
        const signer = provider.getSigner()
        let add = await signer._checkProvider()
        return signer;
    }
}

export let Eth = actions;