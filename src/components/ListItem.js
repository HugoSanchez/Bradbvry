import React, {useState} from 'react';
import styled from 'styled-components';
import {Link} from 'react-router-dom';
import {deleteEntry_Action, setActiveItem_Action} from '../actions';

import {
    useSelector, 
    useDispatch
} from "react-redux";

import {
    DeleteBin,
    Title,
    Text,
    View,
    Card,
    Row
} from './common';

import {
    LoremIpsum,
    device
} from '../constants';


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
    let timestamp = item.message.timestamp
    let date      = new Date(parseInt(timestamp))
    let day       = date.getDate()
    let month     = months[date.getMonth()]

    // Get the title and parse the body to display.
    // Find first block that is unstyled and not empty.
    let title = item.message.blocks[0].text.slice(0, 45) || "Unkown Title";
    let body = item.message.blocks.find(block => block.type === 'unstyled' && block.text.length > 1) 
    let maxSlice = window.innerWidth < 400 ? 160 : 250;
    let bodyToDisplay = body ? body.text.slice(0, maxSlice) : LoremIpsum;

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
                justifyItems: 'center'}}
        >

            <Card
                onMouseEnter={() => {
                    handleMouseOver()}}
                onMouseLeave={() => {
                    handleMouseOver()}}
                onClick={() => {
                    dispatch(setActiveItem_Action(item))}}
            >

                <DateBox>
                    <DayText>{day}</DayText>
                    <MonthText>{month}</MonthText>
                </DateBox>

                <ContentBox>
                    <TitleBox>
                        <Title>
                            {title}
                        </Title>
                        <DeleteBin 
                            isActive={isActive}
                            onClick={(e) => deleteEntry(e)}
                        />
                    </TitleBox>
                    <View>
                        <Text>
                            {bodyToDisplay}...
                        </Text>
                    </View>                    
                </ContentBox>

            </Card>
        </Link>
    );
}

const DateBox = styled(View)`
    padding-top: 2vh;
    border-radius: 10px;
    background-color: #FAFAFA;
`;

const ContentBox = styled(View)`
    flex: 3;
    padding: 2%;
    overflow: hidden;

    @media ${device.mobileL} {
        padding-bottom: 30%;
    }
`;

const TitleBox = styled(Row)`
    padding-left: 2%;
    justify-content: space-between;

    @media ${device.mobileL} {
        font-size: 2vh;
    }
`;

const DayText = styled.p`
    font-family: 'Montserrat';
    font-weight: 600;
    font-size: 12vh;
    margin-top: 15%;
    vertical-align: middle;
    color: rgba(130, 130, 130, 0.529);
    
    @media ${device.mobileL} {
        font-size: 8vh;
    }
`;

const MonthText = styled.p`
    font-family: 'Montserrat';
    font-style: italic;
    font-weight: 300;
    font-size: 2.5vh;
    color: rgb(130, 130, 130);å
`;

export {ListItem};
