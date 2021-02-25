import { useEffect } from 'react';
import { Mixpanel } from '../utils';

export const useMixpanel = (eventName) => {

    useEffect(() => {
        Mixpanel.track(eventName)
    }, []);

}