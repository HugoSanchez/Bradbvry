import React  from 'react';
import {UserCard} from '../UserCard';
import {Text} from '../../common';

import {
    Image,
    ColTitle,
    PublicCard,
    ImageBox,
    DescriptionBox,
    UserBox,
    CardTitleBox,
    CardDetailsBox,
} from './styles';

/**
 * @param {onPress} props: function to execute;
 * @param {image} props: image to display;
 * @param {name} props: space's name;
 * @param {description} props: space's description;
 */


export const GalleryCard = props => {
    let {collection} = props
    let image = collection.message.content.image
    let name = collection.message.content.name.replace(/-/g, ' ')
    let description = collection.message.content.description

    return (
        <PublicCard>

            <ImageBox>
                <Image src={image}/>
            </ImageBox>

            <CardTitleBox>
                <ColTitle>{name}</ColTitle>
            </CardTitleBox>

            <CardDetailsBox>
                <DescriptionBox>
                    <Text>{description}</Text>
                </DescriptionBox>
                <UserBox>
                    <UserCard 
                        user={collection.author}
                        placeholderColor={'rgba(235, 235, 235, 0.4)'}
                    />
                </UserBox>
            </CardDetailsBox>
        </PublicCard>
    );
}

