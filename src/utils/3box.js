// THEADS: TEMPORARY

import { threadObj } from "../constants";
import {images} from '../constants'

const actions = {

    createConfidentialThread: async (space, account, name, type) => {
        let thread = await space.createConfidentialThread(name, {
            firstModerator: account,
            members: type === 'private' || type === 'members' ? true : false
        })

        await space.subscribeThread(thread.address)
        return thread;
    },

    createPublicThread: async (space, account, name) => {
        const thread = await space.joinThread(name, {
            firstModerator: account,
            members: true
        });

        await space.subscribeThread(thread.address)
        return thread;
    },

    // This will be removed
    getFirstPrivateThreadObject: () => {
        let pirvateThreadObject = Object.assign({}, threadObj)
        pirvateThreadObject.name = 'random-notes';
        pirvateThreadObject.image = images[0]
        pirvateThreadObject.type = 'private';
        pirvateThreadObject.description = 'This is a private and personal collection for you to keep loose ideas, notes, or pictures'
    
        return pirvateThreadObject;
    },

    getSecondPrivateThreadObject: () => {
        let pirvateThreadObject = Object.assign({}, threadObj)
        pirvateThreadObject.name = 'diary-entries';
        pirvateThreadObject.image = images[1]
        pirvateThreadObject.type = 'private';
        pirvateThreadObject.description = 'This is a place to keep a personal diary, fill it with pictures, text, and a little bit of love'
    
        return pirvateThreadObject;
    
    },

    getThirdPrivateThreadObject: () => {
        let pirvateThreadObject = Object.assign({}, threadObj)
        pirvateThreadObject.name = 'photo-collection';
        pirvateThreadObject.image = images[2]
        pirvateThreadObject.type = 'private';
        pirvateThreadObject.description = 'A collection for the kind of pictures you would like to keep forever'
    
        return pirvateThreadObject;
    
    },
    
    getGlobalThreadObject: () => {
        let globalThreadObject = Object.assign({}, threadObj)
        globalThreadObject.name = 'bradbvry-global-thread';
        globalThreadObject.image = images[3]
        globalThreadObject.type = 'public'
        globalThreadObject.description = 'This is a global directory of public spaces.'
    
        return globalThreadObject;
    }
}

export let ThreeBox = actions;