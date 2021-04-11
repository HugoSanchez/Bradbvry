import React, {useEffect, useState} from "react";
import Gallery from "react-photo-gallery";

import {
    Container,
    Underline,
    Title,
    Row,
    Text,
} from './common';

import {
    Masonry,
    ImageCard,
    ListItemWrapper
} from '../components';


const GalleryIterator = props => {

    let [photos, setPhotos] = useState(null)

    useEffect(() => {   
        const getParsedArray = async () => {
            const photos = await parseItemsArray(props.items) 
            setPhotos(photos)
        }
        getParsedArray()
    }, [])

    const handleImageClick = (e) => {
        e.stopPropagation()
    }

    const parseItemsArray = async (items) => {

        let photos = items.map(item => {
            let photo = {width: 10, height: 20}
            photo.src = item.contentURI
            const img = new Image();
            img.src = item.contentURI;
            img.onload = function() {
                photo.width = this.width
                photo.height = this.height
            }
            return photo
        })
        return photos 
    }

    if (!photos) {
        return null
    }

    else {
        return (
            <Gallery
                margin={2} 
                photos={photos} 
                onClick={handleImageClick}
                targetRowHeight={50}
                />
        )
    }
    
}

const MasonryIterator = props => {
    return (
        <Masonry gap={15}>
            {
                props.items.map((p, i) => {
                    return (
                        <ImageCard 
                            alt={i} 
                            key={p._id} 
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
        return  <ListItemWrapper 
                    key={item._id}
                    item={item}
                    shadow={props.shadow}
                    isModerator={props.isModerator}
                    />
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
                    } else if (group.groupType.includes('image')) {
                        return <GalleryIterator 
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