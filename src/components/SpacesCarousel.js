import React, { Fragment } from "react";
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


export const SpacesCarousel = props => {

    let threads = useSelector(state => state.threads.threadsArray);

    return (
        <Fragment>
            <Text>Your collections</Text>
            <Underline />
            <Carousel>
                {   
                    threads.length === 0 ?
                    <Title>You have no collections, create one!</Title>
                    :
                    threads.map((thread, index) => {
                        return <SpaceCard key={index} thread={thread} />
                    })
                }
            </Carousel>  
        </Fragment>
    );
}