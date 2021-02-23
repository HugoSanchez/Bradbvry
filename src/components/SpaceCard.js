import React  from 'react';
import styled from 'styled-components';
import { useHistory } from "react-router-dom";
import { useDispatch } from 'react-redux';
import {View, Title, Text} from './common';
import {setActiveThread_Action} from '../actions';

/**
 * @param {onPress} props: function to execute;
 * @param {image} props: image to display;
 * @param {name} props: space's name;
 * @param {description} props: space's description;
 */


export const SpaceCard = props => {

    const history = useHistory();
    const dispatch = useDispatch()

    let {thread} = props
    let image = thread.image
    let spacename = thread.name.replace(/-/g, ' ') 
    let description = thread.description.slice(0, 96) 

    const handleOnClick = () => {
        dispatch(setActiveThread_Action(thread))
        history.push(`/app/${thread.owner.ethAddress + '/' + thread.name}`)
    }

    return (
        <SpaceCardContainer onClick={handleOnClick}>
            <SpaceImage src={image}/>
            <TextBox>
                <SpaceTitle color={"white"}>{spacename}</SpaceTitle>
                <Text color={"white"}>{description}</Text>
            </TextBox>
        </SpaceCardContainer>
    );
}

const SpaceCardContainer = styled.div`
    width: 200px;
    height: 260px;
    margin-top: 0px;
    margin-right: 60px;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
	border-radius: 10px;
	
	background: white;
	position: relative;
	align-items: flex-end;
    transition: 0.6s ease-out;
    opacity: 0.8;
    box-shadow: 0px 7px 10px rgba(0,0,0,0.1);

    &:hover{
        box-shadow: 0px 0px 5px rgba(0,0,0,0.2); 
        transform: translateY(5px);
    }
`;

const SpaceTitle = styled(Title)`
    text-transform: capitalize; 
`

const TextBox = styled(View)`
    width: 200px;
    padding: 1.5rem;
`;

const SpaceImage = styled.img`

    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px;
    
    &:hover{
        opacity: 0.2; 
		transition: 0.7s;
    }
`;