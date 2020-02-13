import '../App.css';
import React from 'react';

/**
 * 3Box social profile card.
 * @param {name}
 * @param {image}
 * @param {description}
 */


const ProfileCard = props => {

    return (
        <div className="profile-card">
            <h3>{props.name }</h3>
            <h5>{props.description}</h5>
            <img src={props.image} id="" alt=''/>
        </div>
    );
}

export default ProfileCard;
