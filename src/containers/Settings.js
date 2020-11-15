import React from 'react';
import {useSelector}  from "react-redux";
import {Mixpanel} from '../utils';
import {Header} from '../components/common/Header';
import EditProfile from '3box-profile-edit-react';
import {WaveLoading} from 'react-loadingg';
import {primaryGray55} from '../constants/colors';



import '../App.css';

const Settings = props => {

    // Get user data from redux state.
    const data = useSelector(state => state.user.data);
    // Track event in Mixpanel.
    Mixpanel.track('SETTINGS');
    
    if (data.box) {
        return (
            <div>
                <Header />
                <div className="Main">
                    <EditProfile
                        // required
                        box={data.box}
                        space={data.space}
                        currentUserAddr={data.address}
                    />
                </div>
            </div>
        );
    }

    else return (
        <div>
            <Header />
            <div className="Main">
                <WaveLoading 
                    speed={2}
                    size='small' 
                    color={primaryGray55}/>
            </div>
        </div>
    )
}

export default Settings;
