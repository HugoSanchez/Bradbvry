import React, {useState}  from 'react';

import {
    Date,
    Image,
    TextBox,
    DeleteBox,
    ImageTitle,
    Description,
    ImageCardContainer,
} from './styles';

import {
    useDispatch
} from 'react-redux';

import {
    DeleteBin
} from '../../common';

import {
    handleDeleteItem_Action
} from '../../../actions';



export const ImageCard = props => {

    let {
        title,
        description
    } = props.entry;

    let base64Image = props.entry.entry

    // Instantiate state
    const [isActive, setActive] = useState(false); 
    const [border, setBorder] = useState(false)
    // Create setter function
    const handleMouseOver = () => {
        setActive(!isActive)
    }
    const handleOnClick = (e) => {
        e.stopPropagation()
        if (props.isSelectable) {setBorder(!border)}
        if (props.onClick) {props.onClick()}
    }


    let months =    ['JAN', 'FEB', 'MAR', 
                    'APR', 'MAY', 'JUN', 
                    'JUL', 'AUG', 'SEP', 
                    'OCT', 'NOV', 'DEC']
    
    let timestamp       = props.entry.timestamp              
    let date            = new window.Date(timestamp * 1000)
    let day             = date.getDay()
    let month           = months[date.getMonth()]
    let year            = date.getFullYear()

    let dispatch        = useDispatch()

    const deleteImage = async (e) => {
        e.stopPropagation();
        dispatch(handleDeleteItem_Action(props.entry))
    }

    return (
        <ImageCardContainer 
            border={border}
            shadow={props.shadow}
            onClick={handleOnClick}
            onMouseEnter={() => handleMouseOver()}
            onMouseLeave={() => handleMouseOver()}>
                <DeleteBox>
                    {
                        props.isNFT ?
                        null
                        :
                        <DeleteBin 
                        isActive={isActive}
                        zIndex={isActive ? '4' : '2'}
                        onClick={(e) => deleteImage(e)}/>
                    }
                    
                </DeleteBox>
                <TextBox>
                    <ImageTitle>{title}</ImageTitle>
                    {
                        window.innerWidth < 500 ?
                        null
                        :
                        <Description>{description}</Description>
                    }
                </TextBox>
                <Date>{day + ' ' + month + ' ' + year}</Date>
            <Image 
                src={base64Image}
                onError={props.onError}/>
        </ImageCardContainer>
    );
}

