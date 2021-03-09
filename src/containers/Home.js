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
    useIsLogged,
    useMixpanel,
} from '../hooks'

import {
    ProfileCard, 
    ItemsAndSpaces
} from '../components';

import {
    setInitialConfiguration_Action, 
    setThreadArray_Action, 
    setUserItems_Action
} from '../actions';

import {getUserPubliData} from '../constants';
import axios from 'axios';
import Box from '3box';


export const Home = (props) => {
    
    useMixpanel('HOME')
    
    const {user} = props.match.params

	const dispatch = useDispatch()
	const [isLogged, isOwner] = useIsLogged(user)
    const loggedAndOwner = isLogged && isOwner

    const [profile, setProfile] = useState({})
    const [loading, setLoading] = useState(true)
    const [collections, setCollections] = useState([])

    const client = useSelector(state => state.user.client)
    const items = useSelector(state => state.threads.itemsArray)
    const threads = useSelector(state => state.threads.threadsArray)


    useEffect(() => {
		if (loggedAndOwner) {handleConfig()}
		else if (loggedAndOwner === false) {
            fetchUserPublicData()}
    }, [loggedAndOwner])


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
        let items = parsePreviews(data.collections)
        dispatch(setThreadArray_Action(data.collections))
        dispatch(setUserItems_Action(items))
        setCollections(data.collections)
        setLoading(false)
    }

    const parsePreviews = (collections) => {
        let prev = []
        collections.forEach(col => {
            prev = prev.concat(col.previewEntries)
        })

        return prev
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



