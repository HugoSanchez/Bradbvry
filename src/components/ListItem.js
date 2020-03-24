import '../App.css';
import React, {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {IconContext} from 'react-icons';
import {RiDeleteBin6Line} from 'react-icons/ri';

import {
    View,
    Card
} from './common';

import {LoremIpsum} from '../constants';
import {deleteEntry_Action} from '../actions';

/**
 * ---- Props ----
 * @param {day}: day from timestamp - string.
 * @param {month}: month from timestamp - string. 
 * @param {title}: item title if any.
 * @param {body}: item's first block of text. 
 */

const ListItem = props => {

    // Instantiate state
    const [isActive, setActive] = useState(false); 
    // Create setter function
    const handleMouseOver = () => {
        setActive(!isActive)
    }

    // Get space from global redux store.
    // Instantiate dispatch function.
    const space = useSelector(state => state.user.data.space);
    const dispatch = useDispatch()

    // Deconstruct item from props.
    // Create array of months.
    const item = props.item
    const months = ['JAN', 'FEB', 'MAR', 
                    'APR', 'MAY', 'JUN', 
                    'JUL', 'AUG', 'SEP', 
                    'OCT', 'NOV', 'DEC']

    // Parse the item key (which is a timestamp from the day it was created),
    // to get the day and month to display.
    let timestamp = item.content.timestamp
    let date      = new Date(parseInt(timestamp))
    let day       = date.getDate()
    let month     = months[date.getMonth()]

    // Get the title and parse the body to display.
    // Find first block that is unstyled and not empty.
    let title = item.content.blocks[0].text || "Unkown Title";
    let body = item.content.blocks.find(block => block.type === 'unstyled' && block.text.length > 1) 
    let bodyToDisplay = body ? body.text : LoremIpsum;

    // Function that deletes a given element from their space.
    // Dispatches action to delete item from global store.
    const deleteEntry = async (e) => {
        e.preventDefault();
        await space.private.remove(timestamp)
        dispatch(deleteEntry_Action(item))
    }

    // Return card-item HTML. Slice title and body so that
    // it never surpases the card's height and width limits.
    return (

        <Link 
            to={{
                pathname: '/editor', 
                item: item, 
                timestamp: timestamp}} 
            style={{
                textDecoration: 'none', 
                justifyItems: 'center'}}>

            <Card
                onMouseEnter={() => handleMouseOver()}
                onMouseLeave={() => handleMouseOver()}>

                <DateBox>
                    <p className="item-card-day">{day}</p>
                    <p className="item-card-month-and-year">{month}</p>
                </DateBox>

                <div className="item-card-content-box">
                        <div className="item-card-title-box">
                            <h1 className="item-card-title">{title.slice(0, 45)}</h1>
                            {
                                isActive ?
                                <div className="item-card-delete-box" onClick={(e) => deleteEntry(e) }>
                                    <IconContext.Provider value={{size: 22, color: 'gray'}}>
                                        <RiDeleteBin6Line /> 
                                    </IconContext.Provider> 
                                </div>
                                :
                                null
                            }
                        </div>
                        <div className="item-card-body-box">
                            <p className="item-card-body">{bodyToDisplay.slice(0, 250)}...</p>
                        </div>                    
                </div>
            </Card>
        </Link>
    );
}

const DateBox = styled(View)`
    padding-top: 2vh;
    border-radius: 10px;
    background-color: #FAFAFA;
`;

export {ListItem};
