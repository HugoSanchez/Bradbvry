import React, {useState} from 'react';
import styled from 'styled-components';
import {device} from '../constants';
import {useSelector} from "react-redux";
import Drawer from '@material-ui/core/Drawer';

import {
    NewCollectionForm,
    SpacesCarousel,
    ItemsList,
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

    const handleDrawerClose = () => {
        setRenderForm(false)
    }

       
    return (
        <Container> 
            <SpacesCarousel 
                isOwner={props.isOwner}
                collections={props.collections}/> 
            <ItemsList items={items}/>
            <Drawer 
                anchor={'right'} 
                open={renderForm} 
                onClose={() => setRenderForm(false)} >
                <NewCollectionForm 
                    onClose={() => handleDrawerClose()}
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