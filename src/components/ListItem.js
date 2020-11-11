import React, {useState} from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

import {
    deleteEntry_Action, 
    setActiveItem_Action,
    setActiveThread_Action
} from '../actions';

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

const ListItem = React.memo((props) => {
    // Instantiate state
    const [isActive, setActive] = useState(false); 
    // Create setter function
    const handleMouseOver = () => {
        setActive(!isActive)
    }

    // Get threads from global redux store.
    // Instantiate dispatch function.
    const history = useHistory();
    const dispatch = useDispatch()
    const threads = useSelector(state => state.threads.threadsArray);
    

    // Deconstruct item from props.
    // Create array of months.
    const item = props.item
    const months = ['JAN', 'FEB', 'MAR', 
                    'APR', 'MAY', 'JUN', 
                    'JUL', 'AUG', 'SEP', 
                    'OCT', 'NOV', 'DEC']

    // Parse the item key (which is a timestamp from the day it was created),
    // to get the day and month to display.
    let timestamp = item.message.content.timestamp ? item.message.content.timestamp : item.timestamp
    let date      = new Date(parseInt(timestamp))
    let day       = date.getDate()
    let month     = months[date.getMonth()]

    // Get the title and parse the body to display.
    // Find first block that is unstyled and not empty.
    let title = item.message.content.blocks[0].text.slice(0, 45) || "Unkown Title";
    let body = item.message.content.blocks.find(block => block.type === 'unstyled' && block.text.length > 1) 
    let maxSlice = window.innerWidth < 400 ? 30 : 220;
    let bodyToDisplay = body ? body.text.slice(0, maxSlice) : LoremIpsum.slice(0, maxSlice);

    // Function that deletes a given element from their space.
    // Dispatches action to delete item from global store.
    const deleteEntry = async (e) => {
        e.stopPropagation();
        let thread = threads.find(thread => thread._name === item.threadName)
        await thread.deletePost(item.postId)
        dispatch(deleteEntry_Action(item))
    }

    // On clicking the item card, this function sets the active thread in redux state
    // as well as the active item and navigates the user to the Editor.
    const onItemClick = async () => {
       let thread = threads.find(thread => thread._name === item.threadName)
       dispatch(setActiveThread_Action(thread))
       dispatch(setActiveItem_Action(item))
       history.push('/editor', {onlyRead: !props.isModerator})
    }

    return (

            <Card 
                shadow={props.shadow}
                onClick={() => {onItemClick()}}
                onMouseOver={() => setActive(true)}
                onMouseLeave={() => {handleMouseOver()}}>

                <DateBox>
                    <DayText>{day}</DayText>
                    <MonthText>{month}</MonthText>
                </DateBox>

                <ContentBox>
                    <TitleBox>
                        <Title>{title}</Title>
                        <DeleteBin 
                            isActive={isActive}
                            onClick={(e) => deleteEntry(e)}
                            isModerator={props.isModerator}/>
                    </TitleBox>
                    <View>
                        <Text> {bodyToDisplay}...</Text>
                    </View>                    
                </ContentBox>

            </Card>
    );
});

const DateBox = styled(View)`
    padding-top: 2vh;
    border-radius: 10px;
    background-color: #FAFAFA;
    @media ${device.mobileL} {
        padding-top: 0vh;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }
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
        font-size: 1.6vh;
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
        font-size: 6vh;
        margin-top: 0%;
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
