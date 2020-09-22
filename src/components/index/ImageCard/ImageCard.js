import React  from 'react';

import {
    Date,
    Image,
    ImageTitle,
    Description,
    ImageCardContainer,
} from './styles';


export const ImageCard = props => {
    
    let {
        title,
        description
    } = props.image.message.content;

    let base64Image = props.image.message.content.image.file

    const months = ['JAN', 'FEB', 'MAR', 
                    'APR', 'MAY', 'JUN', 
                    'JUL', 'AUG', 'SEP', 
                    'OCT', 'NOV', 'DEC']

    let date = new window.Date(props.image.timestamp)
    let day = date.getDay()
    let month = months[date.getMonth()]
    let year = date.getFullYear()

    console.log(new window.Date(props.image.timestamp))

    return (
        <ImageCardContainer className="test" shadow={props.shadow}>
            <Image src={base64Image}/>
            <ImageTitle>{title}</ImageTitle>
            <Description>{description}</Description>
            <Date>{day + ' ' + month + ' ' + year}</Date>
        </ImageCardContainer>
    );
}

