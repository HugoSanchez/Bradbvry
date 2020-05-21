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
    Text,
} from './common';


export const SpacesCarousel = props => {
    let threads = useSelector(state => state.threads.threadsArray);
    return (
        <Fragment>
            <Text>Your spaces</Text>
            <Underline />
            <Carousel>
                {
                    threads.map((thread, index) => {
                        return <SpaceCard key={index} thread={thread} />
                    })
                }
            </Carousel>  
        </Fragment>
    );
}