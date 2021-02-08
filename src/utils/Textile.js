import { PrivateKey, ThreadID } from '@textile/hub';
import { utils, BigNumber } from 'ethers';
import { Eth } from './Ethers';
import {parseCollectionName} from './utils';
import {getFunctionBody} from '@textile/threads-client';

import {
    entriesObject, 
    configObject,
    pendingObject, 
} from '../constants';
import { id } from 'ethers/lib/utils';
import { ADD_ITEM_TO_THREAD_ITEMS } from '../actions/types';


let actions = {
    getIdentity: async (magic) => {
        let identityString = localStorage.getItem('textile-identity')
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

    getWriteValidator: (identityString) => {
        // Return the write validator function that makes it such
        // that only the owner can read or right into a collection.
        let validatorsArray = JSON.stringify([identityString])
        let writeValidatorString = getFunctionBody(
            replaceThisValidator
        ).replace('replaceThis', validatorsArray)
        // Little hack to make it work.
        return new Function(writeValidatorString)
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
            return readFilter
        }
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

    createNewThreadDB: async (client, config, identityString) => {
        // Parse config and entries objects (DB collection schemas)
        let newDate = Date.now()
        config.timestamp = newDate
        config.name = parseCollectionName(config.name)

        // Copy schemas.
        let collectionConfig = Object.assign(configObject, config)
        let entriesSchema = Object.assign({}, entriesObject)

        // Instantiate new threadDB with name.
        let threadID = await client.newDB(undefined, collectionConfig.name)
        let writeValidator = actions.getWriteValidator(identityString)
        let readFilter = actions.getReadFilter(identityString, config.type)

        // Instantate and create the config and entries collections in DB.
        await client.newCollectionFromObject(threadID, configObject, {name: 'config', writeValidator, readFilter})
        await client.newCollectionFromObject(threadID, entriesSchema, {name: 'entries',  writeValidator, readFilter})

        // Store the config object in the config db collection
        let storedConfigObj = await client.create(threadID, 'config', [collectionConfig])

        let collectionObject = {}
        collectionObject.id = threadID.toString()
        collectionObject.name = config.name
        collectionObject.config = collectionConfig

        // return threadID object
        return {threadID, collectionObject}
    },

    createNewEntry: async (client, threadID, entry) => {
        // Parse entry object to match schema
        let newEntry = Object.assign(entriesObject, entry)
        let newDate = Date.now()
        newEntry.timestamp = newDate

        // Store new entry in thread.
        console.log('1.1')
        let storedEntry = await client.create(threadID, 'entries', [newEntry])
        console.log('2.2')
        return storedEntry
    },

    getThreadID: (threadObject) => {
        // Returns the correct Thread ID class
        return ThreadID.fromString(threadObject.id)
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
    const message = 'Signing this message proves you are in possesion of' +
    ' the private key to access and control your account. Thank you for joining Bradbvry :)'
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


const replaceThisValidator = (writer) => {
    // In order to have a write permission set, 
    // we first need to create this function
    var arr = JSON.parse('replaceThis')
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === writer) return true
        else return false
    }    
}

const readFilterRaw = (reader, instance) => {
    if (reader === 'replaceThis') {
        return instance
    } 
    return false
}

export let Textile = actions

