import React, {useEffect, useState} from 'react';
import {useSelector}  from "react-redux";
import {Mixpanel} from '../utils';
import {Header} from '../components/common/Header';
import EditProfile from '3box-profile-edit-react';
import {WaveLoading} from 'react-loadingg';
import {primaryGray55} from '../constants/colors';
import {LoadingCard} from '../components';
import Box from '3box';

import '../App.css';

const Settings = props => {

    let [box, setBox] = useState(null)
    let [space, setSpace] = useState(null)

    // Get user data from redux state.
    let provider = useSelector(state => state.user.provider)
    let address = useSelector(state => state.user.address)
    let threadsArray = useSelector(state => state.threads.threadsArray)

    useEffect(() => {
        if (threadsArray.length > 1 && !space) {
            setBoxAndSpace()
        }
    })

    const setBoxAndSpace = async () => {
        console.log('called!!')
        let box = await Box.openBox(address, provider, {})
        let space = await box.openSpace('bradbvry-main')
        setBox(box)
        setSpace(space)
    }

    // Track event in Mixpanel.
    Mixpanel.track('SETTINGS');

    console.log('rendering')
    
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
