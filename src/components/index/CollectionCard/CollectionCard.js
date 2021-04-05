import React  from 'react';
import { Text } from '../../common';
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { setActiveThread_Action } from '../../../actions';

import {
    SpaceCardContainer,
    SpaceImage,
    TextBox, 
    SpaceTitle,
} from './styles';

/**
 * @param {onPress} props: function to execute;
 * @param {image} props: image to display;
 * @param {name} props: space's name;
 * @param {description} props: space's description;
 */


export const CollectionCard = props => {

    const history = useHistory();
    const dispatch = useDispatch()

    let {thread} = props
    let image = thread.image
    let spacename = thread.name.replace(/-/g, ' ') 
    let description = thread.description.slice(0, 96) 

    const handleOnClick = () => {
        dispatch(setActiveThread_Action(thread))
        history.push(`/app/${thread.owner.ethAddress + '/' + thread.id}`)
    }

    return (
        <SpaceCardContainer onClick={handleOnClick}>
            <SpaceImage src={image}/>
            <TextBox>
                <SpaceTitle color={"black"}>{spacename}</SpaceTitle>
                <Text color={"black"}>{description}</Text>
            </TextBox>
        </SpaceCardContainer>
    );
}

