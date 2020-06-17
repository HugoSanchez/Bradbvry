import React, {useState} from 'react';
import styled from 'styled-components';
import {device} from '../constants';
import {useSelector} from "react-redux";
import Drawer from '@material-ui/core/Drawer';
/// import SlidingPane from "react-sliding-pane";
import '../App.css'

import {
    CreateNewSpace,
    SpacesCarousel,
    ItemsList
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

const ItemsAndSpaces = React.memo((props) => {

    let items = useSelector(state => state.threads.itemsArray);
    let entries = items.filter(item => item.message.type === 'entry')

    let [renderForm, setRenderForm] = useState(false);

   
    return (
        <div className="itemsAndSpaces" key={items.length}> 
            <SpacesCarousel /> 
            <ItemsList entries={entries}/>
            <Drawer anchor={'right'} open={renderForm} onClose={() => setRenderForm(false)} >
                <CreateNewSpace/>
            </Drawer>
            <CircularButton 
                onClick={() => setRenderForm(true)}
                plus={true} 
            />
        </div>
    );
});


const Container = styled(View)`
    flex: 6;
    overflow: hidden;
    padding-left: 7px;
    padding-right: 7px;
    border-width: 2px;
    border-style: solid;
    border-color: red;
    @media ${device.mobileL} {
        padding-top: 30px;
    }
`;

export default ItemsAndSpaces;
