import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const useIsOwner = (userAddress) => {
    
    const [isOwner, setIsOwner] = useState(null);
    const address = useSelector(state => state.user.address)

    useEffect(() => {
        async function checkUserisOwner() {
            console.log('add: ', address)
            console.log('user: ', userAddress)
            setIsOwner(address === userAddress)
        }
        checkUserisOwner()
    }, [address, userAddress]);

    return isOwner;
}