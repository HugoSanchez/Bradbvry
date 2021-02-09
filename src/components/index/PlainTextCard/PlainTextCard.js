import React, {useState}  from 'react';
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
    Title,
    DeleteBin
} from '../../index';

import {
    handleDeleteItem_Action
} from '../../../actions';
import { Fragment } from 'react';



export const PlainTextCard = props => {

    let {
        title,
        description
    } = props.entry;

    let content = props.entry.entry

    console.log(props.entry)
    // Instantiate state
    const [isActive, setActive] = useState(false); 
    const [border, setBorder] = useState(false)
    // Create setter function
    const handleMouseOver = () => {
        setActive(!isActive)
        console.log('Is active: ', !isActive)
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

                {
                    props.isImage ? 
                    <EntryImage src={props.entry.entry} />
                    :
                    null
                }
                
            <CardHeader>

                <CreatorBox>
                    {
                        isActive ? 
                        <Fragment>
                            <CreatorTag>Created by</CreatorTag>
                            <Placeholder>
                                <CreatorPlaceholder>
                                    <IconContext.Provider value={{size: '25px', color: 'gray'}}>
                                        <RiUserSmileLine /> 
                                    </IconContext.Provider> 
                                </CreatorPlaceholder>

                                <Creator>{props.entry.token.creator.id.slice(0, 7)}</Creator>
                            </Placeholder>
                        </Fragment>
                        :
                        null
                    }
                    
                </CreatorBox>

                <NFTBox>
                    <Image src={NFTLogo}/>
                </NFTBox>
            </CardHeader>

            <CardBody>
                {
                    isActive ?
                    <div>
                        <DetailsBox>
                            <NftTitle>{props.entry.title}</NftTitle>
                            <Description>{props.entry.description}</Description>
                        </DetailsBox>
                    </div>
                    :
                    <Text>{props.text}</Text>
                }
            </CardBody>

            <CardFooter>

                <OwnerBox>

                </OwnerBox>

                <NFTBox>
                    {
                        isActive ?
                        <div>
                            <Date>{day + ' ' + month + ' ' + year}</Date>
                        </div>
                        :
                        null
                    }
                </NFTBox>
                                    
            </CardFooter>

        </CardContainer>
    );
}

