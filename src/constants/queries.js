export const theGraphQuery = (address) => `
    {
        tokens(
            where: {
                owner: 
                "0x651350a0ddab993dd69eb18fe63914a90bdca006",
            }) {
        id
        contract {
            id
            name
            supportsEIP721Metadata
        }
        mintTime
        tokenID
        tokenURI
        owner {
            id
            }
        }
    }  
`