import React from 'react';
import ListItem from './ListItem';
import '../App.css';

/**
 * This component is just a container containing an iterator.
 * @param {item}: the item to pass on from parent to ListItem
 * @param {index}: to shut up warning. 
 */


const ItemsContainer = props => {

    return (
        <div className="item-container"> 
            <p className="list-title">Latest stories</p>
            <p className="list-title-underscore"></p>

            {
                props.items.map((item, index) => {
                    return  <ListItem key={index} item={item} />
                })
            }

        </div>
    );
}

export default ItemsContainer;
