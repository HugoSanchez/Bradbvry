export const zoraSubGraphByAddress = (address) => `
{
    user(id: "0xeee5eb24e7a0ea53b75a1b9ad72e7d20562f4283"){
        collection {
            id
            metadataURI
            contentURI
            contentHash
            metadataHash
            owner {
                id
            }
            ownerBidShare
            creator {
                id
            }
            creatorBidShare
            prevOwner {
                id
            }
            prevOwnerBidShare
            approved {
                id
            }
            currentBids {
                id
            }
            currentAsk {
                id
            }
            createdAtTimestamp
            createdAtBlockNumber
        }
        
        creations {
            id
            metadataURI
            contentURI
            contentHash
            metadataHash
            owner {
                id
            }
            ownerBidShare
            creator {
                id
            }
            creatorBidShare
            prevOwner {
                id
            }
            prevOwnerBidShare
            approved {
                id
            }
            currentBids {
                id
            }
            currentAsk {
                id
            }
            createdAtTimestamp
            createdAtBlockNumber
        }
    }
}
`