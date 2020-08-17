import React, { Fragment } from "react";
import { ListItem } from './index';
import Masonry from 'react-masonry-css'
import styled from 'styled-components';

import {
    Underline,
    Text,
} from './common';

const MasonryIterator = props => {
    return (
        <Masonry
            breakpointCols={3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {
                props.items.map((p, i) => {
                    return (
                        <Image src={p.message.content.image.file} alt={i} key={i}/>
                    )
                })
            }
        </Masonry>
    )
} 

const ListItemsIterator = props => {
    console.log('here!')
    return props.items.map((item, index) => {
        return  <ListItem key={index} item={item} shadow={props.shadow} />
    })
}

const Image = styled.img`
    width: 95%;
    border-radius: 5%;
    margin-bottom: 5%;
    box-shadow: 0 0 80px rgba(0,0,0,0.1);
`
const Container = styled.div`
    margin-bottom: 12%;
`;

export const ItemsList = props => {
    // This is a nested iterator that will render either
    // groups of text entries, of groups of images using 
    // a masontry layout.
    let groupedItems = groupItemsByType(props.entries)

    console.log('render!')

    return (
        <Container>
            <Text>Latest entries</Text>
            <Underline />
            {
                groupedItems.map(group => {
                    if (group.groupType === 'entry') {
                        return <ListItemsIterator items={group.items} shadow={props.shadow}/>
                    } else if (group.groupType === 'image') {
                        return <MasonryIterator items={group.items}/>
                    }
                })
            }
        </Container>
    );
}

/////////////////////////////////////////////////
/////// HELPER FUNCTIONS
////////////////////////////////////////////////

const groupItemsByType = entries => {

    let currentTypeOfEntry = null
    let groupedItems = [];
    let breakCount = 0

    for (let i = 0; i < entries.length; i++) {
        if (!currentTypeOfEntry) {
            currentTypeOfEntry = entries[i].message.type
            groupedItems[breakCount] = {groupType: entries[i].message.type, items: []}
            groupedItems[breakCount].items.push(entries[i])
        } else if (entries[i].message.type === currentTypeOfEntry) {
            groupedItems[breakCount].items.push(entries[i])
        } else {
            breakCount++
            currentTypeOfEntry = entries[i].message.type
            groupedItems[breakCount] = {groupType: entries[i].message.type, items: []}
            groupedItems[breakCount].items.push(entries[i])
        }
    }
    return groupedItems;
}

/**
 * 
 export const ItemsList = props => {

    let groupedItems = groupItemsByType(props.entries)

    return (
        <Fragment>
            <Text>Latest entries</Text>
            <Underline />
            {
                props.entries.map((entry, index) => {
                    if (entry.message.type === 'entry') {
                        return  <ListItem key={index} item={entry} shadow={props.shadow} />
                    }
                })
            } 
        </Fragment>
    );
} 
 */


