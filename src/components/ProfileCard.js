import '../App.css';
import React, {useState} from 'react';
import Button from './common/Button'

/**
 * 3Box social profile card.
 * @param {name}
 * @param {image}
 * @param {description}
 */


const ProfileCard = props => {

    let imageIPFSaddress 
    if (props.profile.image) {
        imageIPFSaddress  = "https://ipfs.io/ipfs/" 
        + props.profile.image[0].contentUrl["/"]
    }

    let [renderButton]= useState(false) //Setter method missing

    return (
        <div className="profile-card-container">
            <div className="profile-card">
                <div id="profile-cover-photo-container">
                </div>
                <div id="profile-image-container">
                    <img id="profile-image" src={imageIPFSaddress} alt=""/>
                </div>
                <div>
                    <h1 className="title" id="profile-name">
                        {props.profile.name}
                    </h1>
                </div>
                <div>
                    <p id="profile-description">
                        {props.profile.description}
                    </p>
                </div>
                {
                    renderButton ?
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
