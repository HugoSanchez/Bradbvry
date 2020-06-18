import React, { Fragment } from "react";
import { ListItem } from './index';

import {
    Underline,
    Text,
} from './common';


export const ItemsList = props => {

    return (
        <Fragment>
            <Text>Latest entries</Text>
            <Underline />
            {
                props.entries.map((entry, index) => {
                    return  <ListItem key={index} item={entry} />
                })
            } 
        </Fragment>
    );
}