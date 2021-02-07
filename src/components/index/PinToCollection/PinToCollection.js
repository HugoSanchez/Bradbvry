import React, {useState} from 'react';
import {IconContext} from 'react-icons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Text, Title} from '../../common';

import {
    handleDeleteCollection_Action
} from '../../../actions'

import {
    useSelector,
    useDispatch
} from "react-redux";

import {
    RiMoreLine, 
    RiDeleteBin6Line, 
    RiAddLine
} from 'react-icons/ri';

import {
    ItemRow,
    TextBox
} from './styles';


export const PinToCollection = props => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()

    const threadsArray = useSelector(state => state.threads.threadsArray)

    const handleClick = (event) => {
        setOpen(!open)
        setAnchorEl(event.currentTarget);
    };

    const handleDelete = () => {
        //setOpen(false);
        console.log('here')
        dispatch(handleDeleteCollection_Action(props.history))
    };


    const handleClose = () => {
        return null
    }

    return (

        <div onClick={handleClick}>
            <IconContext.Provider value={{size: '25px', color: 'gray'}}>
                <RiMoreLine /> 
            </IconContext.Provider> 

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                >

                    {
                        threadsArray.map(thread => {
                            return(
                                <MenuItem onClick={handleClose}>
                                    <ItemRow>
                                        <IconContext.Provider value={{size: '16px', color: 'gray'}}>
                                            <RiAddLine /> 
                                        </IconContext.Provider> 
                                        <TextBox>
                                            <Text>Add to {thread.name}</Text>
                                        </TextBox>
                                    </ItemRow>
                                </MenuItem>
                            )
                        })
                    }
                          
            </Menu>
        </div>
    )
}