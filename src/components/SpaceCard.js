import React  from 'react';
import styled from 'styled-components';
import {View, Title, Text} from './common';

/**
 * 
 * @param {onPress} props: function to execute;
 * @param {image} props: image to display;
 * @param {name} props: space's name;
 * @param {description} props: space's description;
 */


export const SpaceCard = props => {
    let {thread} = props
    let image = thread.config.image
    let spacename = thread.config.name.replace(/-/g, ' ')
    let description = thread.config.description.slice(0, 96)

    return (
        <SpaceCardContainer onClick={props.onPress}>
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
    display: flex;
    flex-direction: column;
	border-radius: 10px;
	
	background: black;
	position: relative;
	align-items: flex-end;
    transition: 0.4s ease-out;
    opacity: 0.8;
    box-shadow: 0px 7px 10px rgba(black, 0.5);

    &:hover{
        box-shadow: 0 0 10px rgba(0,0,0,0.2); 
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