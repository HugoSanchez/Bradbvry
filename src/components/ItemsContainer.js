import React from 'react';
import styled from 'styled-components';
import {device} from '../constants';

import {
    useSelector
} from "react-redux";

import {
    SpaceCard,
    ListItem
} from './index';

import {
    Underline,
    Carousel,
    Text,
    View,
} from './common';

/**
 * This component is just a container containing an iterator.
 * @param {item}: the item to pass on from parent to ListItem
 * @param {index}: item index. 
 */

const ItemsContainer = React.memo((props) => {

    let items = useSelector(state => state.threads.itemsArray);
    let threads = useSelector(state => state.threads.threadsArray);
    let entries = items.filter(item => item.message.type === 'entry')
    let spaces = [1, 2, 3, 4, 5]

    return (
        <Container key={items.length}> 
            <Text>Your spaces</Text>
            <Underline />
            <Carousel>
                {
                    threads.map((thread, index) => {
                        return <SpaceCard key={index} thread={thread} />
                    })
                }
            </Carousel>    

            <Text>Latest entries</Text>
            <Underline />
            {
                entries.map((entry, index) => {
                    return  <ListItem key={index} item={entry} />
                })
            }
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

export default ItemsContainer;
