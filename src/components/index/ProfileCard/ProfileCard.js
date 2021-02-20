import React, {useState, useEffect} from 'react';
import {dummyProfile} from '../../../constants';
import {Button} from '../../common';
import Box from '3box';

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
    
    const [loading, setLoading] = useState(true)
    const [profile, setProfile] = useState({})

    useEffect(() => {
        console.log(props.user)
        const fetchAndSetProfile = async () => {
            let profileRes = await Box.getProfile(props.user)
            if (Object.keys(profileRes).length < 2) {setProfile(dummyProfile)}
            else {setProfile(profileRes)}
            setLoading(false)
        }
        fetchAndSetProfile()
    }, [])
    
    // Get profile pic from IPFS.
    // IPFS is awesome.
    let imageIPFSaddress 
    if (profile.image) {
        imageIPFSaddress  = "https://ipfs.io/ipfs/" 
        + profile.image[0].contentUrl["/"]
    }

    if (loading) {
        return null
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
