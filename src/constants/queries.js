export const zoraSubGraphByAddress = (address) => `
{
    user(id: "0x78e4b692027be7ba027147d7eaa700e920a0b01f"){
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