////////////////////////////////////
////// URLS
////////////////////////////////////

export const shareBaseUrl = 'http://localhost:1000/api/share/send-invite-email'
export const acceptBaseUrl = 'http://localhost:1000/api/share/add-invited-member';
export const joinCollectionUrl = (address, threadAddress) => 'http://localhost:3000/app/accept-invite/' + address + '/' + threadAddress
export const addMemberUrl = (data, thread, threadName) => `http://localhost:3000/app/add-member/${data.publicAddress}/${thread}/${threadName}/${data.email}`

////////////////////////////////////
////// THREAD OBJECT
////////////////////////////////////

export const globalThreadModeratorAddress = "0xCc74308838BbAcEEC226611A0C2b3fD5f4a7D8a2";


export const threadObj =  {
    owner                 : null,       // Owner's did
    image                 : null,       // Image to display
    type                  : null,       // [open || members only || private]
    name                  : null,       // Title to display,
    description           : null,       // Description to display.
    isOwner               : null,       // Bool, whether or not user owns it or is just a read-member.
    subscriptionList      : null,       // Subscription thread DID.
    subscriptionType      : null,       // [stake || free || invite-only || montly]
    options               : null,       // Any additional info.
}

////////////////////////////////////
////// SIZES & DEVICES 
////////////////////////////////////

const size = {
    mobileS: '320px',
    mobileM: '375px',
    mobileL: '425px',
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
export const firstDefaultEntry = {"blocks":[{"key":"d0pp5","text":"Welcome to Bradbvry!","type":"header-one","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"3j6jp","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"4jfjl","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"2ofh7","text":"We're happy to have you here. Bradbvry is where you create, store and share, the things that really matter to you, with its own, built-in text-editor. Everything here is encrypted with your Ethereum private keys and stored in IPFS, meaning, that only you can control who can access your information.","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":30,"length":83,"style":"ITALIC"},{"offset":30,"length":83,"style":"BOLD"}],"entityRanges":[],"data":{}},{"key":"boivj","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"kisq","text":"Bradbvury is also a place to hide away from today's extreme overexposure and exhibitionism. Here, you won't find likes, views, coments or audiences. This is strcitly between you, your content and whomever you choose to share it with. This is a place for individual freedom, and digitial intimacy.","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"c9plv","text":"","type":"unstyled","depth":0,"inlineStyleRanges":[],"entityRanges":[],"data":{}},{"key":"8v1md","text":"This is, obviously, the editor, try playing around with it after you have read this. Everytime you click on the round \"back\" button you can see on the top left here, the document will be automatically saved in it's corresponding space. ","type":"unstyled","depth":0,"inlineStyleRanges":[{"offset":0,"length":85,"style":"BOLD"},{"offset":0,"length":85,"style":"ITALIC"}],"entityRanges":[],"data":{}}],"entityMap":{}}

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


////////////////////////////////////
////// SPACE IMAGES
////////////////////////////////////


export const images = [
    "https://images.unsplash.com/photo-1512168203104-3910bc2bcd54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80",
    "https://images.unsplash.com/photo-1503075131240-fe4b3a7fa473?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80",
    "https://images.unsplash.com/photo-1534778061111-b71fa828e390?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1558725177-79763c6e9014?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1559871753-75a00941f6b2?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1559248457-80403d9e3898?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1522279602607-85334538fabd?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60",
    "https://images.unsplash.com/photo-1587480346370-f9097215a7a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"
]
