import '../App.css';
import React from 'react';

/**
 * 3Box social profile card.
 * @param {name}
 * @param {image}
 * @param {description}
 */


const ProfileCard = props => {

    let imageIPFSaddress = "https://ipfs.io/ipfs/" 
    + props.profile.image[0].contentUrl["/"]

    return (
        <div className="profile-card">
            <div id="profile-image-container">
                <img id="profile-image" src={imageIPFSaddress} alt=""/>
            </div>
        </div>
    );
}

export default ProfileCard;
