import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import '../App.css';
import Box from '3box';
import DanteEditor from "Dante2";
import CircularButton from './common/CircularButton';

const Editor = props => {

    const [dateNow, setDateNow] = useState(Date.now());
    const [item, setItem] = useState(1);

    const address = useSelector(state => state.user.address);

    const handleAutomaticSave = async editorContext => {
        console.log('Date now: ', dateNow)
        console.log('Item: ', item)
        if (dateNow + 10000 < Date.now()) { 
            // let box = await Box.openBox(address, window.ethereum)
            // let space = await box.openSpace('bradbvry--main') // This should not be hardcoded.
            // let content  = JSON.stringify(editorContext.editorContent.blocks)
            // await space.private.set(dateNow.toString(), content)
            const newDate = Date.now()
            console.log('New Date: ', newDate)
            setDateNow(newDate)
            setItem(item + 1)
            // const spaceData = await space.private.all()
            // console.log('Space Data: ', spaceData)
        }
    }


    const defaultOptions = {
        debug: false,
        read_only: true,

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
        }
    }

    const default_wrappers = [
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

    return (
        <div className="Main">
            <CircularButton />
            <div className="Editor">
                <DanteEditor  
                    read_only={false}
                    default_wrappers={default_wrappers}
                    content={null}  
                    config={defaultOptions}
                    data_storage={{
                        url: "http://localhost:8000/",
                        save_handler: async (editorContext, content) => { 
                            handleAutomaticSave(editorContext)
                        }}}
                    />
            </div>
        </div>
    );
}

export default Editor;
