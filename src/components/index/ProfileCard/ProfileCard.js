import React from 'react';
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

    let profile = props.profile
    if (Object.keys(profile).length < 2) {profile = dummyProfile}
    
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
                        false ?
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
