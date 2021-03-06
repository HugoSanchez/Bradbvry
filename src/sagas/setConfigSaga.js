import {SET_INITIAL_CONFIG} from '../actions/types';
import {take, put} from 'redux-saga/effects';
import {Textile, Eth} from '../utils';
import { PrivateKey, PublicKey } from "@textile/hub"
import randomBytes from 'randombytes';

import {
    Client, 
    Users
} from '@textile/hub';

import {
    handleTheads_Action,
    setInitialUserData_Action,
    setUserMailbox_Action,
} from '../actions';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);


function* handleMailboxSetUp(identity) {
    // Set up user mailbox.
    let hubKey          = process.env.REACT_APP_TEXTILE_HUB_KEY
    let mailboxClient   = yield Users.withKeyInfo({key: hubKey})
    let mailToken       = yield mailboxClient.getToken(identity)
    let mailboxID       = yield mailboxClient.setupMailbox()
    let inbox           = yield mailboxClient.listInboxMessages()
    let sentBox         = yield mailboxClient.listSentboxMessages() 
    mailboxClient.watchInbox(mailboxID, (event) => {console.log('OP: ', event)})

    // let message = 'This is a new message to you u u'
    // yield Textile.sendMessage(mailboxClient, message, identity, identity.public)
    yield Textile.decodeMessages(identity, inbox)
    yield Textile.decodeMessages(identity, sentBox)

    yield put(setUserMailbox_Action({mailboxClient, inbox, sentBox}))
}


function* handleConfig(action) {

    // Get user address and email from magic.
    let data = yield magic.user.getMetadata()
    let email = data.email
    let address = data.publicAddress
    let provider = magic.rpcProvider

    // Get user public profile and signer.
    // Get user identity (textile), instantiate client, 
    let identity        = yield Textile.getIdentity(magic)
    /**
    let publicKey = PublicKey.fromString(identity.public.toString())
    let enc = new TextEncoder()
    let mes = yield publicKey.encrypt(enc.encode('hellooooo'))
    let res = yield identity.decrypt(mes)
    */

    let hubKey          = process.env.REACT_APP_TEXTILE_HUB_KEY
    let client          = yield Client.withKeyInfo({key: hubKey})
    let userToken       = yield client.getToken(identity) 
    let identityString  = identity.public.toString()

    // Dispatch initial user data to reducer
    yield put(setInitialUserData_Action({
        email,
        address, 
        client,
        identity,
        provider,
        identityString
    }))

    yield put(handleTheads_Action(client, identity, action))

    if (action.callback !== undefined) {
        yield action.callback() }
}

export default function * watchInitialConfig() {
    while(true) {
        let action = yield take(SET_INITIAL_CONFIG)
        yield handleConfig(action)    
    }
}


