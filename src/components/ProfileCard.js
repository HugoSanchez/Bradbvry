import React from 'react';
import {useSelector} from "react-redux";
import {dummyProfile} from '../constants';
import Button from './common/Button';
import '../App.css';

/**
 * 3Box social profile card.
 * @param {name}
 * @param {image}
 * @param {description}
 */

const ProfileCard = props => {

    // Get profile from Redux and check if it's complete,
    // If not, use dummy profile.
    let profile = useSelector(state => state.user.profile);
    let plength = Object.keys(profile).length < 2
    if (plength) {profile = dummyProfile}
    
    // Get profile pic from IPFS.
    // IPFS is awesome.
    let imageIPFSaddress 
    if (props.profile.image) {
        imageIPFSaddress  = "https://ipfs.io/ipfs/" 
        + props.profile.image[0].contentUrl["/"]
    }

    return (
        <div className="profile-card-container">
            <div className="profile-card">
                <div id="profile-cover-photo-container">
                </div>
                <div id="profile-image-container">
                    <img id="profile-image" src={imageIPFSaddress} alt=""/>
                </div>
                <div>
                    <h1 className="title" id="profile-name">{profile.name}</h1>
                </div>
                <div>
                    <p id="profile-description">{profile.description}</p>
                </div>
                {
                    plength ?
                    <div>
                        <Button 
                            id="profile-button"
                            textId="profile-button-text"
                            text="Edit Profile"/>
                    </div>
                    :
                    null
                }
            </div>
        </div>
    );
}

export default ProfileCard;
