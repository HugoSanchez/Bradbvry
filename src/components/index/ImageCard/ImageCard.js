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
    useSelector, 
    useDispatch
} from 'react-redux';

import {
    DeleteBin
} from '../../common';

import {
    deleteEntry_Action
} from '../../../actions';

import {ThreadID} from '@textile/hub';




export const ImageCard = props => {

    let {
        title,
        description
    } = props.entry;

    let base64Image = props.entry.entry

    // Instantiate state
    const [isActive, setActive] = useState(false); 
    // Create setter function
    const handleMouseOver = () => {
        setActive(!isActive)
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
    let client          = useSelector(state => state.user.client);
    let activeThread    = useSelector(state => state.threads.activeThread);

    const deleteImage = async (e) => {
        e.stopPropagation();
        let threadID = ThreadID.fromString(activeThread.id)
        await client.delete(threadID, 'entries', [props.entry._id])
        dispatch(deleteEntry_Action(props.entry))
    }

    return (
        <ImageCardContainer 
            shadow={props.shadow}
            onClick={e => e.stopPropagation()}
            onMouseEnter={() => handleMouseOver()}
            onMouseLeave={() => handleMouseOver()}>
                <DeleteBox>
                    <DeleteBin 
                        isActive={isActive}
                        zIndex={isActive ? '4' : '2'}
                        onClick={(e) => deleteImage(e)}/>
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
            <Image src={base64Image}/>
        </ImageCardContainer>
    );
}

