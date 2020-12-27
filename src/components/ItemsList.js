import React from "react";
import { ListItem } from './index';
import Masonry from 'react-masonry-css'

import {
    Container,
    Underline,
    Title,
    Row,
    Text,
} from './common';

import {ImageCard} from '../components'

const MasonryIterator = props => {
    return (
        <Masonry
            breakpointCols={window.innerWidth < 550 ? 2 : 3}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column">
            {
                props.items.map((p, i) => {
                    return (
                        <ImageCard 
                            alt={i} 
                            key={i} 
                            entry={p} 
                            shadow={props.shadow}
                            isModerator={props.isModerator}/>
                    )
                })
            }
        </Masonry>
    )
} 

const ListItemsIterator = props => {
    return props.items.map((item, index) => {
        return  <ListItem 
                    key={index} 
                    item={item} 
                    shadow={props.shadow} 
                    isModerator={props.isModerator}/>

    })
}

export const ItemsList = props => {
    // This is a nested iterator that will render either
    // groups of text entries, of groups of images using 
    // a masontry layout.
    let groupedItems = groupItemsByType(props.items)

    return (
        <Container>
            <Text>Latest entries</Text>
            <Underline />
            {
                groupedItems.length === 0 ?
                    <Row>
                        <Title marginTop={'2%'} >
                            This collection is empty.
                        </Title>
                    </Row>
                :
                groupedItems.map((group, index) => {
                    if (group.groupType === 'post') {
                        return <ListItemsIterator 
                            key={index}
                            items={group.items} 
                            shadow={props.shadow}
                            isModerator={props.isModerator}/>
                    } else if (group.groupType === 'file') {
                        return <MasonryIterator 
                            key={index}
                            items={group.items}
                            shadow={props.shadow}
                            isModerator={props.isModerator}/>
                    }
                })
            }
        </Container>
    );
}

/////////////////////////////////////////////////
/////// HELPER FUNCTIONS
////////////////////////////////////////////////

// This function returns an array of blocks (objects) of content by type.
// For instance: block 1 == type entry, block 2 == type image.
// This allows to render the collection's content 
// by chronological order. 

const groupItemsByType = entries => {

    let currentTypeOfEntry = null
    let groupedItems = [];
    let breakCount = 0

    for (let i = 0; i < entries.length; i++) {
        if (!currentTypeOfEntry) {
            currentTypeOfEntry = entries[i].type
            groupedItems[breakCount] = {groupType: entries[i].type, items: []}
            groupedItems[breakCount].items.push(entries[i])
        } else if (entries[i].type === currentTypeOfEntry) {
            groupedItems[breakCount].items.push(entries[i])
        } else {
            breakCount++
            currentTypeOfEntry = entries[i].type
            groupedItems[breakCount] = {groupType: entries[i].type, items: []}
            groupedItems[breakCount].items.push(entries[i])
        }
    }
    return groupedItems;
}