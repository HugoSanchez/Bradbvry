import { useEffect } from 'react';
import { Mixpanel } from '../utils';

export const useMixpanel = (eventName) => {

    useEffect(() => {
        console.log('here')
        Mixpanel.track(eventName)
    }, []);

}