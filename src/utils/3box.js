// THEADS: TEMPORARY

import { threadObj } from "../constants";

/**
async function getThreads(space) {
    const thread = await space.joinThread("bradbvry--global--thread", {
        firstModerator: '0xCc74308838BbAcEEC226611A0C2b3fD5f4a7D8a2',
        members: false
    });

    const subspace = {
        name: "Awesome Space",
        url: "<https://exampleapp.com>",
        appImage: "<https://example-image.png>",
        description: "An example subspace.",
        account: "0x2f4ce4f714c68a3fc871d1f543ffc24b9b3c2386",
        options: JSON.stringify({here: "and there"})
        //the account of the users who submitted
    }

    await thread.post(subspace);

    const posts = await thread.getPosts()
    console.log('Thread: ', thread)
    console.log('Posts: ', posts)
};


const thread = await space.joinThread("bradbvry--global--thread", {
    firstModerator: globalThreadModeratorAddress,
    members: false
});

const posts = await Box.getThread('bradbvry--main', "bradbvry--def--private--thread", accounts[0], true)

const privThread = await space.createConfidentialThread("bradbvry--def--private--thread", {
    firstModerator: globalThreadModeratorAddress,
    members: false
});

 */




const actions = {

    createConfidentialThread: async (space, account, name, type) => {
        let thread = await space.createConfidentialThread(name, {
            firstModerator: account,
            members: type === 'private' || type === 'members' ? true : false
        })

        await space.subscribeThread(thread.address)

        return thread;
    },

    getPrivateThreadObject: () => {
        let pirvateThreadObject = Object.assign({}, threadObj)
        pirvateThreadObject.name = 'private-thread';
        pirvateThreadObject.image = null
        pirvateThreadObject.type = 'private';
        pirvateThreadObject.description = 'This is a personal space, for you to store your memories, and unleash your creativity'
    
        return pirvateThreadObject;
    
    },
    
    getGlobalThreadObject: () => {
        let globalThreadObject = Object.assign({}, threadObj)
        globalThreadObject.name = 'bradbvry-global-thread';
        globalThreadObject.image = null
        globalThreadObject.type = 'public'
        globalThreadObject.description = 'This is a global directory of public spaces.'
    
        return globalThreadObject;
    }
}

export let ThreeBox = actions;