////////////////////////////////////
////// URLS
////////////////////////////////////

export const uploadUrl = `${process.env.REACT_APP_EMAIL_SERVICE_BASEURL}api/uploadToIpfs`;
export const shareBaseUrl = `${process.env.REACT_APP_EMAIL_SERVICE_BASEURL}api/share/send-invite-email`;
export const acceptBaseUrl = `${process.env.REACT_APP_EMAIL_SERVICE_BASEURL}api/add-invited-member`;
export const createUserUrl = `${process.env.REACT_APP_EMAIL_SERVICE_BASEURL}api/user/create`;
export const followBaseUrl = `${process.env.REACT_APP_EMAIL_SERVICE_BASEURL}api/follow`;
export const unfollowBaseUrl = `${process.env.REACT_APP_EMAIL_SERVICE_BASEURL}api/unfollow`;

export const joinCollectionUrl = (address, threadId, threadName) => `${process.env.REACT_APP_BRADBVRY_URL}/app/accept-invite/${address}/${threadId}/${threadName}`
export const getSpecificItemsUrl = (address, threadName, itemId) => `${process.env.REACT_APP_EMAIL_SERVICE_BASEURL}api/collections/${address}/${threadName}/${itemId}`;
export const getCollectionItemsUrl = (address, threadName) => `${process.env.REACT_APP_EMAIL_SERVICE_BASEURL}api/collections/${address}/${threadName}`;
export const getUserPubliData = (address) => `${process.env.REACT_APP_EMAIL_SERVICE_BASEURL}api/collections/${address}`;


export const ZoraSubGraph =  "https://api.thegraph.com/subgraphs/name/ourzora/zora-v1"

////////////////////////////////////
////// THREAD OBJECT
////////////////////////////////////

export const joinMessage = {
    congigObj: '',
    threadInfo: '',
    signature: ''
}

export const pendingObject = {
    _id: '', 
    threadId: '', 
    threadName: '', 
    owner: ''
}

export const followerObject = {
    _id: '',
    address: '',
    identity: '',
    did: '',
}

export const entriesObject = {
    _id: '', 
    name: '',                           // Entry name
    description: '',                    // Entry description
    threadId: '',                       // // The thread's ID string the entry belongs to.
    type: 'file',                       // Entry type file/post
    entry: '',                          // Actual entry
    other: '',                          // Other info
    timestamp: 0,                       // Entry creation date
    contentURI: '',                     // Url 
    metadataURI: '',                    // TBD
    createdBy: ''                       // Ethereum Address
}

export const configObject = {
    _id: '', 
    threadId: '',                        // The thread's ID string.                                   
    name: '',                            // Collection Name 
    description: '',                     // Collection Description
    type: '',                            // Collection type: [open || members-only || private]
    tokenAddress: '',                    // Token address if any
    symmetricKey: '',                    // Symetric AES key if any
    subscriptionType : '',               // [stake || free || invite-only || montly]
    timestamp: 0,                        // Creation day timestamp
    options: '',                         // Any additional info.
    version: 1,                          // Collection version, to track updates!  
    owner: {                             // Owner data.
        did: '',
        identity: '',
        ethAddress: '',
    }, 
    keyOwners: [
        {
            memberId: '',
            memberAddress: '',
            memberPubkey: '',
            collectionKey: '',
            acknowledged: false
        }
    ]
}

////////////////////////////////////
////// SIZES & DEVICES 
////////////////////////////////////

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '570px',
    tablet: '768px',
    laptop: '1024px',
    laptopL: '1440px',
    desktop: '2560px'
}
  
export const device = {
    mobileS: `(max-width: ${size.mobileS})`,
    mobileM: `(max-width: ${size.mobileM})`,
    mobileL: `(max-width: ${size.mobileL})`,
    tablet: `(max-width: ${size.tablet})`,
    laptop: `(max-width: ${size.laptop})`,
    laptopL: `(max-width: ${size.laptopL})`,
    desktop: `(max-width: ${size.desktop})`,
    desktopL: `(max-width: ${size.desktop})`
};

////////////////////////////////////
////// LOREM IPSUM & OTHER TEXTS
////////////////////////////////////

export const LoremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut velit metus, interdum quis risus id, varius lacinia neque. Suspendisse eget luctus lectus. Phasellus nulla neque, dignissim semper nisi id, interdum porta lorem. Donec in justo tellus. Curabitur placerat mi neque, sed luctus lectus interdum sodales. Cras vel viverra ante. Mauris ac condimentum dui, et venenatis quam. Integer pellentesque convallis placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a elit aliquam, vulputate leo quis, sodales massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras pharetra mollis consequat. Vivamus rutrum libero non imperdiet consectetur. Integer auctor metus at libero fringilla"
export const firstDefaultEntry = {"blocks":[{"key":"d0pp5","text":"Welcome to Bradbvry!","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3j6jp","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4jfjl","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2ofh7","text":"We're happy to have you here. Bradbvry is where you create, store and share, the things that really matter to you, with its own, built-in text-editor. Everything here is encrypted with your Ethereum private keys and stored in IPFS, meaning that only you can control who can access your information.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":83,"style":"ITALIC"},{"offset":30,"length":83,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"boivj","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"kisq","text":"Bradbvury is also a place to hide away from today's extreme overexposure and exhibitionism. This is strcitly between you, your content and whomever you choose to share it with. This is a place for individual freedom, and digitial intimacy.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c9plv","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8v1md","text":"This is, obviously, the editor, try playing around with it after you have read this. Everytime you click on the round \"back\" button you can see on the top left here, the document will be automatically saved in it's corresponding collection. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":85,"style":"BOLD"},{"offset":0,"length":85,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}

////////////////////////////////////
////// DUMMY 3BOX PROFILE
////////////////////////////////////

export const dummyProfile = {
    emoji: "🍿", 
    description: "Create your own public profile. It will make it easier for other people to find you.", 
    name: "Edit Profile", 
    image: [{contentUrl: {"/": "QmQgQUbBeMTnH1j3QWwNw9LkXjpWDJrjyGYfZpnPp8x5Lu"}}], 
    proof_did: "eyJ0eXAiOiJKV1QiLCJhbGciOiJFUzI1NksifQ.eyJpYXQiOjE…Xl8dHl4713uzITuUyy7kExvN767upGmo3RLiaRXxR48-m1v1A"
}

