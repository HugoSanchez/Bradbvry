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
    mobileS: `(min-width: ${size.mobileS})`,
    mobileM: `(min-width: ${size.mobileM})`,
    mobileL: `(min-width: ${size.mobileL})`,
    tablet: `(min-width: ${size.tablet})`,
    laptop: `(min-width: ${size.laptop})`,
    laptopL: `(min-width: ${size.laptopL})`,
    desktop: `(min-width: ${size.desktop})`,
    desktopL: `(min-width: ${size.desktop})`
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