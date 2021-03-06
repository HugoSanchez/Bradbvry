import { PrivateKey, ThreadID } from '@textile/hub';
import { utils, BigNumber } from 'ethers';
import { Eth } from './Ethers';
import {parseCollectionName} from './utils';
import {getFunctionBody} from '@textile/threads-client';

import {
    entriesObject, 
    configObject,
    pendingObject, 
    followerObject,
} from '../constants';


let actions = {
    getIdentity: async (magic) => {
        let identityString = localStorage.getItem('textile-identity')
        console.log('iD: ', identityString)
        if (!identityString) {return generateIdentity(magic)}
        else {return PrivateKey.fromString(identityString)}
    },

    getMasterThreadString: (identity) => {
        // Hash identity.public and parse. Return result.
        let identityString = identity.public.toString()
        let identityHash = utils.keccak256(utils.toUtf8Bytes(identityString))
        let masterThreadName = 'master-' + identityHash.toString()
        return masterThreadName
    },

    getPreviewEntriesString: (masterThreadName) => {
        return 'preview-entries-' + masterThreadName;
    },

    getWriteValidator: (identityStrings) => {
        // Return the write validator function that makes it such
        // that only the owner can read or write into a collection.
        let env_check = process.env.NODE_ENV === 'production';
        let validatorsArray = JSON.stringify(identityStrings)
        let stringifiedFunc = getFunctionBody(replaceThisValidator).replace('replaceThis', validatorsArray)
        if (env_check) return stringifiedFunc
        else return new Function(stringifiedFunc)
    },

    getFollowresCollectionWriteValidator: (identityString) => {
        // Return the write validator function that makes it such
        // that only the owner can read or write into a collection.
        let env_check = process.env.NODE_ENV === 'production';
        let validatorsArray = JSON.stringify([identityString, process.env.REACT_APP_TEXTILE_BV_ID])
        let stringifiedFunc = getFunctionBody(replaceThisValidator).replace('replaceThis', validatorsArray)
        if (env_check) return stringifiedFunc
        else return new Function(stringifiedFunc)
    },

    getReadFilter: (identityString, collectionType) => {
        // Read filter has two options depending on wether or 
        // not the collection is private.
        if (collectionType === 'private') {
            let readValidatorString = getFunctionBody(
                readFilterRaw
            ).replace('replaceThis', identityString)

            return new Function(readValidatorString)
        } 
        else {
            // If collection is not private, alwais return instance 
            let readFilter = (reader, instance) => {return instance};
            return getFunctionBody(readFilter)
        }
    },

    getThreadIDFromString: (stringID) => {
        // Returns the correct Thread ID class
        return ThreadID.fromString(stringID)
    },

    getThreadID: (threadObject) => {
        // Returns the correct Thread ID class
        return ThreadID.fromString(threadObject.id)
    },

    getKeyOwner: (config, address, identityString, identity) => {
        let keyOwner = {}
        if (config.type !== 'public' || true) {
            keyOwner.memberAddress = address
            keyOwner.memberId = identityString
            keyOwner.memberPubkey = identity.public.toString()
            keyOwner.collectionKey = ''
            keyOwner.acknowledged = true
        }
        return keyOwner
    },

    getCollectionConfig: (config, address, identityString, identity) => {
        // Parse collection's owner data
        let owner = {ethAddress: address, identity: identityString, did: ''}
        let keyOwner = actions.getKeyOwner(config, address, identityString, identity)
        // Parse config and entries objects (DB collection schemas)
        let newDate = Date.now()
        config.owner = owner
        config.timestamp = newDate
        config.keyOwners = [keyOwner]
        config.name = parseCollectionName(config.name)

        // Copy schemas.
        return Object.assign(configObject, config)
    },

    createMasterThreadDB: async (client, masterThreadName) => {
        // Instantiate new threadDB with name.
        let threadID = await client.newDB(undefined, masterThreadName)
        // Instantate and create the config and entries collections in DB.
        await client.newCollectionFromObject(threadID, pendingObject, {name: 'pending-to-join'})
        await client.newCollectionFromObject(threadID, configObject, {name: 'collections-list'})
        // Return threadID
        return threadID
    },

    createMasterPreviewEntriesDB: async (client, masterThreadName) => {
        let previewEntriesThreadName =  actions.getPreviewEntriesString(masterThreadName)
        // Instantiate new threadDB with name.
        let threadID = await client.newDB(undefined, previewEntriesThreadName)
        // Instantate and entries collection in DB.
        await client.newCollectionFromObject(threadID, entriesObject, {name: 'preview-entries'})
        // Return threadID
        return threadID
    },

    createNewThreadDB: async (client, config, address, identityString, identity) => {
        // Get the config object for the collection.
        let collectionConfig = actions.getCollectionConfig(config, address, identityString, identity)
        // Instantiate new threadDB with name.
        let threadID = await client.newDB(undefined, collectionConfig.name)
        collectionConfig.threadId = threadID.toString()
        collectionConfig.previewEntries = []

        // Instantate and create the config and entries collections in DB.   
        let writeValidator = actions.getWriteValidator([identityString])
        let wirteValidatorFollowers = actions.getFollowresCollectionWriteValidator(identityString)
        let readFilter = actions.getReadFilter(identityString, config.type)
        
        // Create collections and save the config.
        await client.newCollectionFromObject(threadID, entriesObject, {name: 'entries',  writeValidator, readFilter})
        await client.newCollectionFromObject(threadID, configObject, {name: 'config', wirteValidatorFollowers, readFilter})
        await client.newCollectionFromObject(threadID, followerObject, {name: 'followers',  wirteValidatorFollowers, readFilter})
        await client.create(threadID, 'config', [collectionConfig])

        // Parse object and return.
        let collectionObject = parseCollectionObject(threadID, collectionConfig)
        return {threadID, collectionObject}
    },

    createNewEntry: async (client, threadID, entry) => {
        // Parse entry object to match schema
        let newEntry = Object.assign(entriesObject, entry)
        let newDate = Date.now()
        newEntry.timestamp = newDate
        // Store new entry in thread.
        let storedEntry = await client.create(threadID, 'entries', [newEntry])
        return storedEntry
    },

    sendMessage: async (mailClient, message, identity, recipientIdentity) => {
        let encoded = new TextEncoder().encode(message)
        return await mailClient.sendMessage(identity, recipientIdentity, encoded)
    },

    decodeMessages: async (identity, messages) => {
        for (let message of messages) {
            let bytes = await identity.decrypt(message.body)
            let decodedBody = new TextDecoder().decode(bytes)
            message.body = decodedBody
        }
    },

}


///////////////////////////////////////////////
/////// Helper Functions
///////////////////////////////////////////////

const generateIdentity = async (magic) => {
    // Generate a new Textile identity from the user's Ethereum private key
    // 1) Users signs message, 2) Message is hashed, 3) hash is turned into array
    // 4) Array is used as a seed to derive a private key (identity) from.
    let signer = await Eth.getSigner(magic)
    let seed = await generateSeedFromEthKey(signer)
    let identity = PrivateKey.fromRawEd25519Seed(Uint8Array.from(seed))
    let identityString = identity.toString()
    localStorage.setItem('textile-identity', identityString)
    return identity
}

const generateSeedFromEthKey = async (signer) => {
    // Sign and hash message using Ethereum's private key.
    // Then parse signedMessage to create seed array.
    const message = 'Welcome to Bradbvry.xyz! Signing this message proves that you are in possesion of' +
    ' the private key to access and control your account. Thank you for joining :)'
    const signed = await signer.signMessage(message)
    const hashed = await utils.keccak256(signed)
    const parsed = await parseSignedMessage(hashed)
    return parsed
}

const parseSignedMessage = async (hash) => {
    // The following line converts the hash in hex 
    // to an array of 32 integers.
    const parseHash = hash.replace('0x', '')
    const hexArray = parseHash.match(/.{2}/g)
    const numArray = hexArray.map((hexNoPrefix) => {
        return BigNumber.from('0x' + hexNoPrefix).toNumber()
    })
    return numArray
}


function replaceThisValidator(writer) {
    // In order to have a write permission set, 
    // we first need to create this function
    var arr = JSON.parse('replaceThis');
    var check = false
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === writer) check = true;
    }  
    return check
};

const parseCollectionObject = (threadID, collectionConfig) => {
    collectionConfig.id = threadID.toString()
    return collectionConfig
}

const readFilterRaw = (reader, instance) => {
    if (reader === 'replaceThis') {
        return instance
    } 
    return false
}



export let Textile = actions

