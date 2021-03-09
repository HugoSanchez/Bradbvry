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

    return (
        <Container>
            <Text>{props.isOwner ? 'Your C' : 'C'}ollections</Text>
            <Underline />
            <Carousel>
                {   
                    collections.length === 0 ?
                    <Title>You have no collections, create one!</Title>
                    :
                    collections.map((thread, index) => {
                        return <SpaceCard 
                                    key={index} 
                                    thread={thread} />
                    })
                }
            </Carousel>  
        </Container>
    );
}