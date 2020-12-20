import React, {
    Fragment, 
    useEffect, 
    useState
} from 'react';

import {
    useDispatch, 
    useSelector
}  from 'react-redux';

import { 
    useHistory 
} from 'react-router-dom';

import {
    Header, 
    LoadingCard
} from '../components';

import ItemsAndSpaces from '../components/ItemsAndSpaces';
import ProfileCard from '../components/ProfileCard';
import {Mixpanel} from '../utils';
import {setInitialConfiguration_Action} from '../actions';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const Home = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const client = useSelector(state => state.user.client)
    const profile = useSelector(state => state.user.profile)
    const items = useSelector(state => state.threads.itemsArray)


    useEffect(() => {
        const checkLogged = async () => {
            Mixpanel.track('HOME');
            let isLogged = await magic.user.isLoggedIn();
            if (!isLogged) { history.push(`/signin`)} 
            else {handleConfig()}
        }
        checkLogged()
    }, [])

    useEffect(() => {
        if (client && loading === true) {
            setLoading(false)
        }
    })

    const handleConfig = async () => {
        if (!client) {dispatch(setInitialConfiguration_Action())}
        else if (client) {setLoading(false)}
    }

    return (
        <Fragment>
            <Header />
                {   
                    loading 
                    ?
                    <LoadingCard />
                    :
                    <div className='container'>
                        <div className='left'>
                            <ProfileCard profile={profile} />
                        </div>
                        <div className='right'>
                            <ItemsAndSpaces items={items} />
                        </div>
                    </div>
                }
            </Fragment>
    );
}



