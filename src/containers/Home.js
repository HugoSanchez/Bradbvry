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
    Header, 
    LoadingCard,
    FlexContainer,
    LeftContainer,
    RightContainer
} from '../components';

import {
    useIsOwner,
    useIsLogged,
    useMixpanel,
} from '../hooks'

import {
    ProfileCard, 
    ItemsAndSpaces
} from '../components';

import {
    setInitialConfiguration_Action
} from '../actions';

import {getUserPubliData} from '../constants';
import axios from 'axios';
import Box from '3box';


export const Home = (props) => {
    
    useMixpanel('HOME')
    
    const {user} = props.match.params

	const dispatch = useDispatch()
	const isLogged = useIsLogged()
    const isOwner  = useIsOwner(user)
    const loggedAndOwner = isLogged && isOwner

    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [collections, setCollections] = useState([])

    const client = useSelector(state => state.user.client)
    const items = useSelector(state => state.threads.itemsArray)
    const threads = useSelector(state => state.threads.threadsArray)


    useEffect(() => {
        let url = getUserPubliData(user)
        console.log('URL: ', url)
		if (isLogged) {handleConfig()}
		else if (isLogged === false) {fetchUserPublicData()}
    }, [isLogged])


    useEffect(() => {
        if (isLogged && threads && loading) {
           setLoading(false)
        }
    }, [isLogged, threads, loading])

    useEffect(() => {
        const fetchAndSetProfile = async () => {
            let profileRes = await Box.getProfile(user)
            setProfile(profileRes)
        }
        fetchAndSetProfile()
    }, [user])


    const handleConfig = async () => {
        if (!client) {
            dispatch(
                setInitialConfiguration_Action(
                    () => setLoading(false)
                )
            )
        }
        else {setLoading(false)}
    }

    const fetchUserPublicData = async () => {
        let fetchUrl = getUserPubliData(user)
        let {data} = await axios(fetchUrl)
        setCollections(data.collections)
        setLoading(false)
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
                            <ProfileCard profile={profile}/>
                        </LeftContainer>

                        <RightContainer overflow={"true"}>
                            <ItemsAndSpaces 
                                items={items} 
                                isOwner={isOwner}
                                collections={
                                    loggedAndOwner ? 
                                    threads : 
                                    collections}/>
                        </RightContainer>
                        
                    </FlexContainer>
                }
            </Fragment>
    );
}



