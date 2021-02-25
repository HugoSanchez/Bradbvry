import React, {useState, Fragment}  from 'react';
import NFTLogo from '../../../resources/NFTLogo.png';
import {IconContext} from 'react-icons';

import {
    RiAddLine,
    RiUserSmileLine,
} from 'react-icons/ri';

import {
    Date,
    Image,
    NFTBox,
    DateBox,
    TextCont,
    NftTitle,
    Creator,
    CardBody,
    OwnerBox,
    EmptyBox,
    EntryImage,
    Description,
    CardFooter,
    DetailsBox,
    CardHeader,
    CreatorBox,
    NFTLogoImage,
    CreatorTag,
    Placeholder,
    CardSubFooter,
    CardContainer,
    CreatorPlaceholder,
    CreatorAndOwnerBox,
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



export const ImageCard2 = props => {

    let {
        title,
        description
    } = props.entry;

    let content = props.entry.entry

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
        <CardContainer 
            border={border}
            shadow={props.shadow}
            onClick={handleOnClick}
            onMouseEnter={() => handleMouseOver()}
            onMouseLeave={() => handleMouseOver()}>

                <Image 
                    src={content}
                    onError={props.onError}/>
                

                <NFTLogoImage src={NFTLogo}/>

                <CreatorBox>
                    <CreatorTag>Created by</CreatorTag>
                    <Placeholder>
                        <CreatorPlaceholder>
                            <IconContext.Provider value={{size: '25px', color: 'gray'}}>
                                <RiUserSmileLine /> 
                            </IconContext.Provider> 
                        </CreatorPlaceholder>

                        <Creator>{props.entry.token.creator.id.slice(0, 7)}</Creator>
                    </Placeholder>
                </CreatorBox>

                <CardBody>
                    <TextCont>
                        <NftTitle>{props.entry.title}</NftTitle>
                        <Description>{props.entry.description}</Description>
                    </TextCont>
                </CardBody>
                
                <DateBox>
                    <Date>{day + ' ' + month + ' ' + year}</Date>
                </DateBox>
                    
        </CardContainer>
    );
}

