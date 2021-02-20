import React, { Fragment } from "react";
import styled from 'styled-components';

import {
    useSelector
} from "react-redux";

import {
    SpaceCard,
} from './index';

import {
    Underline,
    Carousel,
    Title,
    Text,
} from './common';

const Container = styled.div`
    width: 100%;
    height: 100%;
    overflow: hidden;
`;

export const SpacesCarousel = props => {

    let collections = props.collections

    console.log(collections)

    return (
        <Container>
            <Text>Your collections</Text>
            <Underline />
            <Carousel>
                {   
                    collections.length === 0 ?
                    <Title>You have no collections, create one!</Title>
                    :
                    collections.map((thread, index) => {
                        return <SpaceCard 
                                    key={index} 
                                    thread={thread} 
                                    isOwner={props.isOwner}/>
                    })
                }
            </Carousel>  
        </Container>
    );
}