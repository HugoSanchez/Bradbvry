import React, {useState} from 'react';
import styled from 'styled-components';
import {device} from '../constants';
import {useSelector} from "react-redux";
import Drawer from '@material-ui/core/Drawer';

import {
    NewCollectionForm,
    SpacesCarousel,
    ItemsList,
    SnackBar,
} from './index';

import {
    CircularButton,
    View
} from './common';

/**
 * This component is just a container containing an iterator.
 * @param {item}: the item to pass on from parent to ListItem
 * @param {index}: item index. 
 */

export const ItemsAndSpaces = React.memo((props) => {

    let items = useSelector(state => state.threads.itemsArray);

    let [renderForm, setRenderForm] = useState(false);
    let [openSnack, setOpenSnack] = useState('');
    let [snackSuccess, setSnackSuccess] = useState(null)
    let [snackMessage, setSnackMessage] = useState('')

    const handleDrawerClose = () => {
        setRenderForm(false)
    }

    const handleShowSnackbar = (bool) => {
        if (!bool) {
            setSnackMessage('Oops, something went wrong.')
            setSnackSuccess(false)
            setOpenSnack('show')
            setTimeout(() => setOpenSnack(''), 4000)
        } else {
            setSnackMessage('Success!')
            setSnackSuccess(true)
            setOpenSnack('show')
            setTimeout(() => setOpenSnack(''), 4000)
        }
	}

       
    return (
        <Container> 
            <SnackBar 
                className={openSnack} 
                success={snackSuccess} 
                message={snackMessage}/>
            <SpacesCarousel 
                collections={props.collections}/> 
            <ItemsList items={items}/>
            <Drawer 
                anchor={'right'} 
                open={renderForm} 
                onClose={() => setRenderForm(false)} >
                <NewCollectionForm 
                    onClose={() => handleDrawerClose()}
                    handleSnack={(bool) => handleShowSnackbar(bool)}
                />
            </Drawer>
            <CircularButton 
                onClick={() => setRenderForm(true)}
                plus={true} 
            />
        </Container>
    );
});


const Container = styled(View)`
    flex: 6;
    overflow: hidden;
    padding-left: 7px;
    padding-right: 7px;
    @media ${device.mobileL} {
        padding-top: 30px;
    }
`;