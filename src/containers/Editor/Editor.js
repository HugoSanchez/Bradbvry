import React, {useState, useEffect, Fragment} from 'react';
import DanteEditor from "Dante2";
import {ThreadID} from '@textile/hub';
import axios from 'axios';

import {
    CircularButton, 
    LoadingCard,
    Header
} from '../../components';


import {
    setThreadItems_Action,
    setActiveThread_Action,
    handleSaveItem_Action,
    setInitialConfiguration_Action,
    setActiveItem_Action,
} from '../../actions';

import {
    useDispatch, 
    useSelector
} from 'react-redux';

import {
    useIsLogged
} from '../../hooks';

import {
    getSpecificItemsUrl
} from '../../constants';

export const Editor = props => {

    let {
        itemId,
		threadName,
		user
	} = props.match.params
    
    const location = props.location
    
    const dispatch = useDispatch()
    const [isLogged, isOwner] = useIsLogged(user)
    const loggedOwner = isLogged && isOwner

    const [entry, setEntry] = useState(null)
    const [content, setContent] = useState(null)
    const [loading, setLoading] = useState(true)

    const client = useSelector(state => state.user.client)
    const item = useSelector(state => state.threads.activeItem)
    const activeThread = useSelector(state => state.threads.activeThread)
    const threadsArray = useSelector(state => state.threads.threadsArray)

    
    useEffect(() => {
		if (isLogged) {handleComponentConfig()}
		else if (isLogged === false) {fetchItemIfExternal()}
    }, [isLogged])
    
    useEffect(() => {
		// Check selectedThread is correct.
		// If activeThread is not set, 
		// user is reloading and should be set.
		const checkActiveThread = async () => {
			if (!activeThread && threadsArray.length > 0) {
                let thread = threadsArray.find(thread => thread.name === threadName)
                dispatch(setActiveThread_Action(thread))
                fetchThreadDataAndSetItem(thread)                
            } 
		}
		checkActiveThread()
    }, [threadsArray])


    const handleComponentConfig = () => {
        // If activeThread is null, 
        // the initial config must be set.
        if (!threadsArray.length > 0) {
            dispatch(setInitialConfiguration_Action())
        }
        // Else, if session is properly set,
        // the user is navigating and we just have
        // to parse and set the items in state.
        else if (item) {
            parseItemAndSet(item)
            setLoading(false)
        }
        // Else, user wants to create a new entry.
        else {setLoading(false)}
    }

    const fetchThreadDataAndSetItem = async (thread) => {
        // If user is reloading, or maybe user is accesing
        // a url that has been shared to him, we fetch the data
        // then fetch the item content and set the state. 
		let threadId = ThreadID.fromString(thread.id)
        let items = await client.find(threadId, 'entries', {})
        let item = items.filter(item => item._id === itemId)
        let entry = await axios.get(item[0].contentURI)
        // Setting redux state.
        dispatch(setThreadItems_Action(items.reverse()))
        dispatch(setActiveItem_Action(item[0]))
        // Setting local state.
        setEntry(entry.data)
        setLoading(false)
    }
    
    const fetchItemIfExternal = async () => {
		// This functions only gets called if user is not logged.
		// It fetches the collection entries from the backend.
		let fetchUrl = getSpecificItemsUrl(user, threadName, itemId)
        let {data} = await axios.get(fetchUrl)
        let entry = await axios.get(data.item[0].contentURI)
        setEntry(entry.data)
        setLoading(false)
        // Handle global state
        dispatch(setActiveItem_Action(data.item[0]))
		dispatch(setActiveThread_Action(data.collection[0]))
		dispatch(setThreadItems_Action(data.entries.reverse()))
	}

    

    const parseItemAndSet = (item) => {
        setEntry(location.state.entry)
        setLoading(false)
    }

    const handleSaveItem = async () => {        
        if (loggedOwner) {
            setLoading(true)
            dispatch(handleSaveItem_Action(content, goBack))
        }
        else {goBack()}
    }

    const goBack = () => {
        return props.history.goBack()
    }

    const handleAutomaticSave = async content => {
        setContent(content)
    }


    const defaultOptions = {
        debug: false,

        continuousBlocks: [
            "unstyled",
            "blockquote",
            "ordered-list",
            "unordered-list",
            "unordered-list-item",
            "ordered-list-item",
            "code-block"
        ],

        key_commands: {
            "alt-shift": [{ key: 65, cmd: 'add-new-block' }],
            "alt-cmd": [{ key: 49, cmd: 'toggle_block:header-one' },
            { key: 50, cmd: 'toggle_block:header-two' },
            { key: 53, cmd: 'toggle_block:blockquote' }],
            "cmd": [{ key: 66, cmd: 'toggle_inline:BOLD' },
            { key: 73, cmd: 'toggle_inline:ITALIC' },
            { key: 75, cmd: 'insert:link' }]
        },

        character_convert_mapping: {
            '> ': "blockquote",
            '*.': "unordered-list-item",
            '* ': "unordered-list-item",
            '- ': "unordered-list-item",
            '1.': "ordered-list-item",
            '# ': 'header-one',
            '##': 'header-two',
            '==': "unstyled",
            '` ': "code-block"
        },
    }


    const defaultWrappers = [
        { className: 'editor--p', block: 'unstyled' },
        { className: 'header-one', block: 'header-one' },
        { className: 'header-two', block: 'header-two' },
        { className: 'header-three', block: 'header-three' },
        { className: 'graf--blockquote', block: 'blockquote' },
        { className: 'graf--insertunorderedlist', block: 'unordered-list-item' },
        { className: 'graf--insertorderedlist', block: 'ordered-list-item' },
        { className: 'graf--code', block: 'code-block' },
        { className: 'graf--bold', block: 'BOLD' },
        { className: 'graf--italic', block: 'ITALIC' }
    ]


    const dataStorageFnc = {
        url: null,
        save_handler: (editorContext, content) => {
            handleAutomaticSave(content)
        }
    }   

    if (loading){
		return (
			<Fragment>
				<Header />
				<LoadingCard />
			</Fragment>
		)
	}

    return (
        <div className="Main">

            <Header />

            <CircularButton 
                onClick={handleSaveItem}
                arrow={true}
                iconId="editor-circular-button-icon"
                buttonId="editor-circular-button"/>

            <div className="Editor">

                <DanteEditor 
                    read_only={location.state.onlyRead}
                    config={defaultOptions}
                    default_wrappers={defaultWrappers}
                    content={entry}
                    data_storage={dataStorageFnc}/>
                    
            </div>
        </div>
    );

}



