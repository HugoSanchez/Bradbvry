import React, {useEffect, useState}  from 'react';
import {useSelector} from 'react-redux';
import {ProfileRow} from '../ProfileRow';
import { CircularProgress } from '@material-ui/core';
import {followBaseUrl, unfollowBaseUrl} from '../../../constants';
import axios from 'axios';

import {
    CollectionCardContainer,
    CollectionTitle,
    FollowContainer,
    FollowButton,
    Description,
    ButtonText,
    TextBox
} from './styles';

/**
 * @param {onPress} props: function to execute;
 * @param {image} props: image to display;
 * @param {name} props: space's name;
 * @param {description} props: space's description;
 */


export const CollectionCardBig = props => {

    let [isActive, setIsActive] = useState(false)
    let [isLoading, setIsLoading] = useState(false)
    let [following, setfollowing] = useState(false)
    let external = props.isLogged && props.isOwner

    let {thread} = props
    let image = thread.image
    let spacename = thread.name.replace(/-/g, ' ')
    let description = thread.description.slice(0, 96)

    let address = useSelector(state => state.user.address)
    let identity = useSelector(state => state.user.identityString)

    let reqObject = {
        threadID: props.thread.id,
            follower: {
                address: address, 
                identity: identity
        }
    }

    useEffect(() => {
        if (props.isLogged) {
            let follows = props.followers.find(
                followers => followers.address === address)
            setfollowing(follows)
        }
    }, [])

    const handleFollowUnfollow = async () => {
        setIsLoading(true)
        await handleRequest()
        setfollowing(!following)
        setIsLoading(false)
    }

    const handleRequest = async () => {
        if (!following) { await axios.post(followBaseUrl, reqObject)}      
        else {
            let data = {threadID: props.thread.id, followID: following._id}
            await axios.post(unfollowBaseUrl, data)
        }
    }

    const handleRedirect = async () => {
        props.history.push('/signin', {redirect: props.match.url})
    }

    return (
        <CollectionCardContainer>
            <TextBox>
                <CollectionTitle color={"white"}>{spacename}</CollectionTitle>
                <Description color={"white"}>{description}</Description>
            </TextBox>

            <ProfileRow member={props.member}/>

            <FollowContainer>
                {
                    !props.isOwner ? 
                    <FollowButton
                        isLogged={props.isLogged} 
                        isFollower={!!following}
                        onClick={() => props.isLogged ? handleFollowUnfollow() : handleRedirect()}
                        onMouseEnter={() => setIsActive(true)}
                        onMouseLeave={() => setIsActive(false)}>

                            {
                                isLoading && <CircularProgress 
                                    size={15} 
                                    color={'inherit'}/>

                            }

                            {
                                !isLoading && props.isLogged && <ButtonText 
                                    isFollower={!!following}
                                    isActive={isActive}> 
                                        {
                                            !!following ?
                                            'following':
                                            'Follow'
                                        }
                                </ButtonText>
                            }

                            {
                                !isLoading && !props.isLogged && <ButtonText 
                                    isFollower={!!following}
                                    isActive={isActive}> 
                                        Signup to follow
                                </ButtonText>
                            }
                        
                    </FollowButton>

                    :

                    <FollowButton
                        isLogged={props.isLogged} 
                        isFollower={true}>
                           <ButtonText 
                                isFollower={true}
                                isActive={false}> 
                                    Owner
                            </ButtonText>
                            
                        
                    </FollowButton>
                }
                
            </FollowContainer>
        </CollectionCardContainer>
    );
}

