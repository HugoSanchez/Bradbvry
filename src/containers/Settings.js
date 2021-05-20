import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch}  from "react-redux";
import {Header} from '../components/common/Header';
import EditProfile from '3box-profile-edit-react';
import {setInitialConfiguration_Action} from '../actions';
import {LoadingCard} from '../components';
import {useMixpanel} from '../hooks';
import Box from '3box';

import '../App.css';

const Settings = props => {

    useMixpanel('PROFILE')
    let dispatch = useDispatch()
    let [box, setBox] = useState(null)
    let [space, setSpace] = useState(null)

    // Get user data from redux state.
    let provider = useSelector(state => state.user.provider)
    let address = useSelector(state => state.user.address)
    let client = useSelector(state => state.user.client)

    useEffect(() => {
        if (!client) {dispatch(setInitialConfiguration_Action())}
        else if (client && !space) {setBoxAndSpace()}
    }, [client])

    const setBoxAndSpace = async () => {
        let box = await Box.openBox(address, provider, {})
        let space = await box.openSpace('bradbvry-main')
        setBox(box)
        setSpace(space)
    }
    
    if (space) {
        return (
            <div>
                <Header />
                <div className="Main">
                    <EditProfile
                        // required
                        box={box}
                        space={space}
                        currentUserAddr={address}
                    />
                </div>
            </div>
        );
    }

    else return (
        <div>
            <Header />
            <div className="Main">
                <LoadingCard />
            </div>
        </div>
    )
}

export default Settings;
