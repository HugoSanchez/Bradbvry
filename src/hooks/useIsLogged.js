import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserIsLogged_Action } from '../actions';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const useIsLogged = () => {

    const dispatch = useDispatch()
    const [isLogged, setIsLogged] = useState(null);

    useEffect(() => {
        async function checkUserIsLogged() {
            let checkLog = await magic.user.isLoggedIn();
            dispatch(setUserIsLogged_Action(checkLog))
            setIsLogged(checkLog)
        }
        checkUserIsLogged()
    }, []);

    return isLogged;
}

