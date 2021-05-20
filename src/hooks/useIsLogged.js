import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserIsLogged_Action } from '../actions';
import { entriesObject } from '../constants';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const useIsLogged = (user) => {

    const dispatch = useDispatch()
    const [isLogged, setIsLogged] = useState(null);
    const [isOwner, setIsOwner] = useState(null)

    useEffect(() => {
        async function checkUserIsLogged() {
            let checkLog = await magic.user.isLoggedIn();
            try {let data = await magic.user.getMetadata()}
            catch (e) {console.log('User not logged in.')}
            dispatch(setUserIsLogged_Action(checkLog))
            setIsLogged(checkLog)

            if (checkLog) {
                let data = await magic.user.getMetadata()
                setIsOwner(data.publicAddress === user)
            }
        }
        checkUserIsLogged()
    }, [isLogged, isOwner]);

    return [isLogged, isOwner];
}

