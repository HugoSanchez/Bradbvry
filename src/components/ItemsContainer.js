import '../App.css';
import React from 'react';
import styled from 'styled-components';
import {useSelector} from "react-redux";
import ListItem from './ListItem';
import EmptyHome from './EmptyHome';

import {View} from './proto';

/**
 * This component is just a container containing an iterator.
 * @param {item}: the item to pass on from parent to ListItem
 * @param {index}: to shut up warning. 
 */

const ItemsContainer = props => {

    let items = useSelector(state => state.user.data.parseditems);

    if (items.length < 1) {
        return <EmptyHome />
    }

    else {
        return (
            <View flex={6} key={items.length}> 
                <p className="list-title">Latest stories</p>
                <p className="list-title-underscore"></p>
                {
                    items.map((item, index) => {
                        return  <ListItem key={index} item={item} />
                    })
                }
            </View>
        );
    }
}

const Container = styled.div`

`;

export default ItemsContainer;
