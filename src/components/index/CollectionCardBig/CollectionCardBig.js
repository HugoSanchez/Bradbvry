import React  from 'react';

import {ProfileRow} from '../ProfileRow';

import {
    CollectionCardContainer,
    CollectionTitle,
    Description,
    TextBox
} from './styles';



/**
 * @param {onPress} props: function to execute;
 * @param {image} props: image to display;
 * @param {name} props: space's name;
 * @param {description} props: space's description;
 */


export const CollectionCardBig = props => {

    // If user is not logged, or not owner, external == false.
    // The thread object is different based in this condition.
    let external = props.isLogged && props.isOwner

    let {thread} = props
    let image = thread.image
    let spacename = thread.name.replace(/-/g, ' ')
    let description = thread.description.slice(0, 96)

    return (
        <CollectionCardContainer>
            <TextBox>
                <CollectionTitle color={"white"}>{spacename}</CollectionTitle>
                <Description color={"white"}>{description}</Description>
            </TextBox>

            <ProfileRow member={props.member}/>
        </CollectionCardContainer>
    );
}

