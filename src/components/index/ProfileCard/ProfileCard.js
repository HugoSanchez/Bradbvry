import React, {useEffect} from 'react';
import {useSelector} from "react-redux";
import {dummyProfile} from '../../../constants';
import {Button} from '../../common';

import {
    Container,
    ProfileCardDiv,
    ProfileImage,
    ImageBox,
    NameBox,
    DescriptionBox,
    NameTitle,
    Description,
    NameAndDescription
} from './styles'

/**
 * 3Box social profile card.
 * @param {name}
 * @param {image}
 * @param {description}
 */

export const ProfileCard = props => {
    // Get profile from Redux and check if it's complete,
    // If not, use dummy profile.
    let profile = useSelector(state => state.user.profile);
    let plength = Object.keys(profile).length < 2
    if (plength) {profile = dummyProfile}
    
    // Get profile pic from IPFS.
    // IPFS is awesome.
    let imageIPFSaddress 
    if (profile.image) {
        imageIPFSaddress  = "https://ipfs.io/ipfs/" 
        + profile.image[0].contentUrl["/"]
    }

    return (
        <Container>
            <ProfileCardDiv>

                <ImageBox>
                    <ProfileImage   
                        alt=""
                        src={imageIPFSaddress} 
                    />
                </ImageBox>

                <NameAndDescription>
                    <NameBox>
                        <NameTitle>
                            {
                                profile.name
                            }
                        </NameTitle>
                    </NameBox>

                    <DescriptionBox>
                        <Description>
                            {
                                profile.description
                            }
                        </Description>
                    </DescriptionBox>
                </NameAndDescription>

                    {
                        plength ?
                        <div>
                            <Button 
                                path="/settings"
                                id="profile-button"
                                textId="profile-button-text"
                                text="Edit Profile"/>
                        </div>
                        :
                        null
                    }

            </ProfileCardDiv>
        </Container>
    );
}
