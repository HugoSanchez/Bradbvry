import React  from 'react';

import {ProfileRow} from '../ProfileRow';

import {
    CollectionCardContainer,
    CollectionTitle,
    Description,
    ProfilePic,
    ProfileCard,
    TextBox
} from './styles';



/**
 * @param {onPress} props: function to execute;
 * @param {image} props: image to display;
 * @param {name} props: space's name;
 * @param {description} props: space's description;
 */


export const CollectionCardBig = props => {
    let {thread} = props
    let image = thread.config.image
    let spacename = thread.config.name.replace(/-/g, ' ')
    let description = thread.config.description.slice(0, 96)

    return (
        <CollectionCardContainer>
            <TextBox>
                <CollectionTitle color={"white"}>{spacename}</CollectionTitle>
                <Description color={"white"}>{description}</Description>
            </TextBox>

            <ProfileRow member={{}}/>
        </CollectionCardContainer>
    );
}

