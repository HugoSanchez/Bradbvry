import { PrivateKey } from '@textile/hub';
import { utils, BigNumber } from 'ethers';
import { Eth } from './Ethers';

import {
    entriesObject, 
    configObject, 
    images
} from '../constants';


let actions = {
    getIdentity: async (magic) => {
        let identityString = localStorage.getItem('textile-identity')
        console.log(identityString)
        if (!identityString) {return generateIdentity(magic)}
        else {return PrivateKey.fromString(identityString)}
    },

    createNewThreadDB: async (client, config) => {
        // Parse config and entries objects (DB collection schemas)
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

    getFirstPublicThreadObject: () => {
        let pirvateThreadObject = {}
        pirvateThreadObject.name = 'random-notes';
        pirvateThreadObject.image = images[0]
        pirvateThreadObject.type = 'public';
        pirvateThreadObject.description = 'This is a Public and personal collection for you to keep loose ideas, notes, or pictures'
    
        return pirvateThreadObject;
    },

    getSecondPublicThreadObject: () => {
        let pirvateThreadObject = {}
        pirvateThreadObject.name = 'diary-entries';
        pirvateThreadObject.image = images[1]
        pirvateThreadObject.type = 'public';
        pirvateThreadObject.description = 'This is a place to keep a personal diary, fill it with pictures, text, and a little bit of love'
    
        return pirvateThreadObject;
    
    },

    getThirdPublicThreadObject: () => {
        let pirvateThreadObject = {}
        pirvateThreadObject.name = 'photo-collection';
        pirvateThreadObject.image = images[2]
        pirvateThreadObject.type = 'public';
        pirvateThreadObject.description = 'A collection for the kind of pictures you would like to keep forever'
    
        return pirvateThreadObject;
    
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

