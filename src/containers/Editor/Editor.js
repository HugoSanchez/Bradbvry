import React, {useState, useEffect, Fragment} from 'react';
import DanteEditor from "Dante2";
import {CircularButton, LoadingCard} from '../../components';
import '../../App.css';

import {
    handleSaveItem_Action,
    setInitialConfiguration_Action,
} from '../../actions';

import {
    useDispatch, 
    useSelector
} from 'react-redux';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const Editor = props => {
    
    const location = props.location
    
    const dispatch = useDispatch()
    const [entry, setEntry] = useState(null)
    const [content, setContent] = useState(null)
    const [loading, setLoading] = useState(true)
    const item = useSelector(state => state.threads.activeItem)
    const activeThread = useSelector(state => state.threads.activeThread)


    useEffect(() => {
		// Check if user is logged in. 
		const isLoggedIn = async () => {
            let isLogged = await magic.user.isLoggedIn();
            if (!isLogged) { props.history.push(`/signin`)} 
            // If not, redirect to sign in url
            else {handleConfig()}
		}
		isLoggedIn()
	}, [])

    const handleConfig = () => {
        // If activeThread is null, the initial config must be set.
        if (!activeThread) {dispatch(setInitialConfiguration_Action())}

        // If item exists, parse it and set state.
        if (item) {parseItemAndSet(item)}
        else {setLoading(false)}
    }

    const parseItemAndSet = (item) => {
        setEntry(location.state.entry)
        setLoading(false)
    }

    const handleSaveItem = async () => {
        setLoading(true)
        dispatch(handleSaveItem_Action(content, goBack))
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
				<LoadingCard />
			</Fragment>
		)
	}

    return (
        <div className="Main">

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



