import React, {useState} from 'react';
import {IconContext} from 'react-icons';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {Text} from '../../common';

import {
    handleDeleteCollection_Action
} from '../../../actions'

import {
    useDispatch
} from "react-redux";

import {
    RiMore2Line, 
    RiDeleteBin6Line, 
    RiEditLine
} from 'react-icons/ri';

import {
    ItemRow,
    TextBox
} from './styles';


export const MoreButton = props => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const dispatch = useDispatch()

    const handleClick = (event) => {
        setOpen(!open)
        setAnchorEl(event.currentTarget);
    };

    const handleDelete = () => {
        dispatch(
            handleDeleteCollection_Action(
                props.history))
    };


    const handleClose = () => {
        return null
    }

    if (!props.isOwner) {
        return null
    }

    return (

        <div onClick={handleClick}>
            <IconContext.Provider value={{size: '25px', color: 'gray'}}>
                <RiMore2Line /> 
            </IconContext.Provider> 

            <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                >

                <MenuItem onClick={() => props.renderForm()}>
                    <ItemRow>
                        <IconContext.Provider value={{size: '16px', color: 'gray'}}>
                            <RiEditLine /> 
                        </IconContext.Provider> 
                        <TextBox>
                            <Text>Update Collection</Text>
                        </TextBox>
                    </ItemRow>
                </MenuItem>   

                <MenuItem onClick={handleDelete}>
                    <ItemRow>
                        <IconContext.Provider value={{size: '16px', color: 'gray'}}>
                            <RiDeleteBin6Line /> 
                        </IconContext.Provider> 
                        <TextBox>
                            <Text>Delete Collection</Text>
                        </TextBox>
                    </ItemRow>
                </MenuItem>                
            </Menu>
        </div>
    )
}