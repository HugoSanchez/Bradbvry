export const globalThreadModeratorAddress = "0xCc74308838BbAcEEC226611A0C2b3fD5f4a7D8a2";

////////////////////////////////////
////// THREAD OBJECT
////////////////////////////////////

export const threadObj =  {
    owner                 : null,       // Owner's did
    image                 : null,       // Image to display
    type                  : null,       // [open || paid || members only || private]
    threadId              : null,       // Thead's name,
    title                 : null,       // Title to display,
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
////// LOREM IPSUM
////////////////////////////////////

export const LoremIpsum = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut velit metus, interdum quis risus id, varius lacinia neque. Suspendisse eget luctus lectus. Phasellus nulla neque, dignissim semper nisi id, interdum porta lorem. Donec in justo tellus. Curabitur placerat mi neque, sed luctus lectus interdum sodales. Cras vel viverra ante. Mauris ac condimentum dui, et venenatis quam. Integer pellentesque convallis placerat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a elit aliquam, vulputate leo quis, sodales massa. Interdum et malesuada fames ac ante ipsum primis in faucibus. Cras pharetra mollis consequat. Vivamus rutrum libero non imperdiet consectetur. Integer auctor metus at libero fringilla"

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