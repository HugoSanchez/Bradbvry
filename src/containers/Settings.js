import React from 'react';
import {useSelector}  from "react-redux";
import {Mixpanel} from '../utils';
import Header from '../components/common/Header';
import EditProfile from '3box-profile-edit-react';
import {PointSpreadLoading}     from 'react-loadingg';



import '../App.css';

const Settings = props => {

    const data = useSelector(state => state.user.data);
    console.log('Data: ', data.data)
    console.log('box: ', data.box)
    console.log('space: ', data.space)
    console.log('accounts[0]: ', data.accounts[0])


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
                        currentUserAddr={data.accounts[0]}
    
                        
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
