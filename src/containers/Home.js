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
    LoadingCard,
    FlexContainer,
    LeftContainer,
    RightContainer
} from '../components';

import ItemsAndSpaces from '../components/ItemsAndSpaces';
import {ProfileCard} from '../components';
import {Mixpanel} from '../utils';
import {setInitialConfiguration_Action} from '../actions';

const crypto = require('crypto')
const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const Home = (props) => {

    const dispatch = useDispatch()
    const history = useHistory()
    const [loading, setLoading] = useState(true)
    const client = useSelector(state => state.user.client)
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
                    <FlexContainer>

                        <LeftContainer>
                            <ProfileCard />
                        </LeftContainer>

                        <RightContainer overflow={"true"}>
                            <ItemsAndSpaces items={items} />
                        </RightContainer>
                        
                    </FlexContainer>
                }
            </Fragment>
    );
}



