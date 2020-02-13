import React from 'react';
import '../App.css';

/**
 * @param {day}: day from timestamp - string.
 * @param {month}: month from timestamp - string. 
 * @param {title}: item title if any.
 * @param {body}: item's first block of text. 
 */


const ListItem = props => {

    // Deconstruct item from props.
    // Create array of months.
    const item = props.item
    const months = ['JAN', 'FEB', 'MAR', 
                    'APR', 'MAY', 'JUN', 
                    'JUL', 'AUG', 'SEP', 
                    'OCT', 'NOV', 'DEC']

    // Parse the item key (which is a timestamp from the day it was created),
    // to get the day and month to display.
    let timestamp = Object.keys(item)
    let date      = new Date(parseInt(timestamp[0]))
    let day       = date.getDay()
    let month     = months[date.getMonth()]

    // Get the title and parse the body to display.
    // Find first block that is unstyled and not empty.
    let title = item[timestamp].blocks[0].text;
    let body = item[timestamp].blocks.find(block => {
        if (block.type === 'unstyled' && block.text.length > 1) {
            return block
        }
    })

    // Return card-item HTML. Slice title and body so that
    // it never surpases the card's height and width limits.
    return (
        <div className="item-card">
            <div className="item-card-date-box">
                <p className="item-card-day">{day}</p>
                <p className="item-card-month-and-year">{month}</p>
            </div>
            <h1 className="item-card-title">{title.slice(0, 45)}</h1>
            <p className="item-card-body">{body.text.slice(0, 308)}...</p>
        </div>
    );
}

export default ListItem;
