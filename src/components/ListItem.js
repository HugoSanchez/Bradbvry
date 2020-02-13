import React from 'react';
import '../App.css';

/**
 * @param {day}: day from timestamp - string.
 * @param {month}: month from timestamp - string. 
 * @param {title}: item title if any.
 * @param {body}: item's first block of text. 
 */


const ListItem = props => {

    const item = props.item
    const months = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

    let timestamp = Object.keys(item)
    let date      = new Date(timestamp)
    let day       = date.getDay()
    let month     = months[date.getMonth()]

    console.log(item)

    return (
        <div className="item-card">
            <div className="item-card-date-box">
                <p className="item-card-day">{day}</p>
                <p className="item-card-month-and-year">{month}</p>
            </div>
            <h1 className="item-card-title">{props.title}</h1>
            <p className="item-card-body">{props.body}</p>
        </div>
    );
}

export default ListItem;
