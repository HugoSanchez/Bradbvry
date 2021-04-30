import React, {Fragment, useEffect, useState}  from 'react';
import NFTLogo from '../../../resources/NFTLogo.png'

import {
    Date,
    Image,
    TextBox,
    TextEntry,
    DeleteBox,
    ImageTitle,
    Description,
    ImageCardContainer,
} from './styles';

import {
    useDispatch
} from 'react-redux';

import {
    Text,
    DeleteBin
} from '../../common';

import {
    handleDeleteItem_Action
} from '../../../actions';



export const ImageCard = props => {

    let {
        name,
        width,
        height,
        description,
        contentURI,
    } = props.entry;


    const [isActive, setActive] = useState(false); 
    const [border, setBorder] = useState(false);
    const [loaded, setLoaded] = useState(true);
    const [renderText, setRenderText] = useState(true);

    useEffect(() => {
        if (loaded) {setRenderText(true)}
    },[loaded])

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
    let date            = new window.Date(timestamp)
    let day             = date.getDay()
    let month           = months[date.getMonth()]
    let year            = date.getFullYear()

    let dispatch        = useDispatch()

    const deleteImage = async (e) => {
        e.stopPropagation();
        dispatch(handleDeleteItem_Action(props.entry))
    }

    if (!loaded) return null;
    
    return (

        <ImageCardContainer
            width={width}
            height={height} 
            border={border}
            visible={renderText}
            shadow={props.shadow}
            onClick={handleOnClick}
            onMouseEnter={() => handleMouseOver()}
            onMouseLeave={() => handleMouseOver()}>

                {
                    renderText ? 
                        <Fragment>
                            <DeleteBox>
                                {
                                    props.isModerator ?
                                    <DeleteBin 
                                        isActive={isActive}
                                        zIndex={isActive ? '4' : '2'}
                                        onClick={(e) => deleteImage(e)}/>
                                    :
                                    null
                                }
                                
                            </DeleteBox>

                    
                        
                            <TextBox>
                            <ImageTitle>{name}</ImageTitle>
                                {
                                    window.innerWidth < 500 ?
                                    null
                                    :
                                    <Description>{description}</Description>
                                }
                            </TextBox>
                        
                        </Fragment>
                    :
                    null
                } 

                <Image 
                    visible={loaded}
                    src={contentURI}
                    onLoad={() => setLoaded(true)}
                    onError={props.onError}/>
                    
        </ImageCardContainer>
    );

}

