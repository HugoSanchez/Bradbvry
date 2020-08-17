import React from 'react';
import {useSelector}  from "react-redux";
import {Mixpanel} from '../utils';
import {Header} from '../components/common/Header';
import EditProfile from '3box-profile-edit-react';
import {PointSpreadLoading}     from 'react-loadingg';



import '../App.css';

const Settings = props => {

    // Get user data from redux state.
    const data = useSelector(state => state.user.data);
    // Track event in Mixpanel.
    Mixpanel.track('Settings visit');
    
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
                <PointSpreadLoading color={"rgb(190, 235, 194)"}/>
            </div>
        </div>
    )
}

export default Settings;
