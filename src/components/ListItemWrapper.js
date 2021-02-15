import React, {useState, useEffect} from 'react';
import {ListItem} from './ListItem'
import axios from 'axios';

export const ListItemWrapper = props => {

    let {item} = props;
    let [entry, setEntry] = useState(null)

    useEffect(() => {
        // Get the actual content from IPFS
        const getEntry = async () => {
            let entry = await axios.get(item.contentURI)
            console.log('E: ', entry.data)
            setEntry(entry.data)
        }
        getEntry()
    }, [])

    if (entry) return (

        <ListItem 
            item={item} 
            entry={entry}
            shadow={props.shadow} 
            isModerator={props.isModerator} />

    );

    return (
        <div></div>
    );
}