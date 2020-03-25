import React from 'react';
import styled from 'styled-components';
import {device} from '../constants';

import {
    useSelector
} from "react-redux";

import {
    EmptyHome,
    ListItem
} from './index';

import {
    Underline,
    Text,
    View
} from './common';

/**
 * This component is just a container containing an iterator.
 * @param {item}: the item to pass on from parent to ListItem
 * @param {index}: item index. 
 */

const ItemsContainer = props => {

    let items = useSelector(state => state.user.data.parseditems);

    if (items.length < 1) {
        return <EmptyHome />
    }

    else {
        return (
            <Container key={items.length}> 
                <Text>Latest stories</Text>
                <Underline />

                {
                    items.map((item, index) => {
                        return  <ListItem key={index} item={item} />
                    })
                }
            </Container>
        );
    }
}

const Container = styled(View)`
    flex: 6;
    @media ${device.mobileL} {
        padding-top: 30px;
    }
`;

export default ItemsContainer;
