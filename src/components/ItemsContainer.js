import React from 'react';
import ListItem from './ListItem';
import '../App.css';

/**
 * @param {day}: day from timestamp - string.
 * @param {month}: month from timestamp - string. 
 * @param {title}: item title if any.
 * @param {body}: item's first block of text. 
 */


const ItemsContainer = props => {

    // let timestamp = Object.keys(props.item)
    // const date = new Date(timestamp)

    return (
        <div className="item-container"> 
            <p className="list-title">Latest stories</p>
            <p className="list-title-underscore"></p>

            {
                props.items.map(item => {
                    return (
                        <ListItem 
                            day={'13'}
                            month="MAR"
                            title="Magnificent Storm"
                            body="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut verat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a elit aliquam, In a elit aliquam, In a elit aliquam, vulputate leo quis, sodales massa. Interdum et malesuada fames ac ante ipsum primis in faucibus."
                        />
                    )
                })
            }

        </div>
    );
}

export default ItemsContainer;
