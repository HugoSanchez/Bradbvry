import { PrivateKey, ThreadID } from '@textile/hub';
import { utils, BigNumber } from 'ethers';
import { Eth } from './Ethers';
import {parseCollectionName} from './utils';

import {
    entriesObject, 
    configObject,
    pendingObject, 
} from '../constants';


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

    createMasterThreadDB: async (client, masterThreadName) => {
        // Instantiate new threadDB with name.
        let threadID = await client.newDB(undefined, masterThreadName)
        // Instantate and create the config and entries collections in DB.
        await client.newCollectionFromObject(threadID, pendingObject, {name: 'pending-to-join'})
        await client.newCollectionFromObject(threadID, configObject, {name: 'collections-list'})
        // Return threadID
        return threadID
    },

    createNewThreadDB: async (client, config) => {
        // Parse config and entries objects (DB collection schemas)
        let newDate = Date.now()
        config.timestamp = newDate
        config.name = parseCollectionName(config.name)

        // Copy schemas.
        let collectionConfig = Object.assign(configObject, config)
        let entriesSchema = Object.assign({}, entriesObject)

        // Instantiate new threadDB with name.
        let threadID = await client.newDB(undefined, collectionConfig.name)

        // Instantate and create the config and entries collections in DB.
        await client.newCollectionFromObject(threadID, configObject, {name: 'config'})
        await client.newCollectionFromObject(threadID, entriesSchema, {name: 'entries'})

        // Store the config object in the config db collection
        let storedConfigObj = await client.create(threadID, 'config', [collectionConfig])

        // return threadID object
        return threadID
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
    ' the private key to access and control your account.'
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

export let Textile = actions

