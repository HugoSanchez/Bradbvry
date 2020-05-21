import React from 'react';
import styled from 'styled-components';
import {device} from '../constants';
import {useSelector} from "react-redux";

import {
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

    return (
        <Container key={items.length}> 
            <SpacesCarousel /> 
            <ItemsList entries={entries}/>
            <CircularButton 
                onClick={() => console.log('wea')}
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

export default ItemsAndSpaces;
