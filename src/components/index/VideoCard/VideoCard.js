import React, {useState}  from 'react';
import {IconContext} from 'react-icons';

import {
    RiDeleteBinLine,
} from 'react-icons/ri';

import {
    Video,
    DeleteBox,
    CardBody,
    CardContainer,
} from './styles';

import {
    useDispatch
} from 'react-redux';

import {
    handleDeleteItem_Action
} from '../../../actions';




export const VideoCard = props => {

    let {
        title,
        description
    } = props.entry;

    let content = props.entry.contentURI

    const dispatch = useDispatch()
    // Instantiate state
    const [isActive, setActive] = useState(false); 
    // Create setter function
    const handleMouseOver = () => {setActive(!isActive)}

    let months =    ['JAN', 'FEB', 'MAR', 
                     'APR', 'MAY', 'JUN', 
                     'JUL', 'AUG', 'SEP', 
                     'OCT', 'NOV', 'DEC']
    
    let timestamp       = props.entry.timestamp              
    let date            = new window.Date(timestamp * 1000)
    let day             = date.getDay()
    let month           = months[date.getMonth()]
    let year            = date.getFullYear()


    const deleteImage = async (e) => {
        e.stopPropagation();
        dispatch(handleDeleteItem_Action(props.entry))
    }

    return (
        <CardContainer 
            onMouseEnter={() => handleMouseOver()}
            onMouseLeave={() => handleMouseOver()}>
                

            <CardBody>
                    <Video 
                        controls="controls" 
                        src={content}>
                        <source src={content}/>
                    </Video>
            </CardBody>

            {
                isActive ? 
                <DeleteBox 
                    isActive={isActive}
                    onClick={deleteImage}>

                        <IconContext.Provider 
                            value={{
                                size: '18px', 
                                color: null
                                }
                            }>
                            <RiDeleteBinLine /> 
                        </IconContext.Provider> 
                    
                </DeleteBox>
                :
                null
            }

        </CardContainer>
    );
}

