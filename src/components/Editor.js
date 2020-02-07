import React from 'react';
import '../App.css';
import DanteEditor from "Dante2";
import CircularButton from './common/CircularButton';

const Editor = props => {

    const defaultOptions = {
        debug: false,
        read_only: true,

        xhr: {
            before_handler: () => console.log('Try1'),
            success_handler: () => console.log('Try2'),
            error_handler: () => console.log('Try3'),
        },

        data_storage: {
            url: 'http://localhost:8000/',
            method: "POST",
            success_handler: () => console.log('Succeeding'),
            failure_handler: () => console.log('Failing'),
            interval: 500,
            withCredentials: false,
            crossDomain: false,
            headers: {}
        },
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
                    config={{read_only: true}}
                    data_storage={{
                        url: "http://localhost:8000/",
                        save_handler: (editorContext, content) => { 
                            console.log('Context: ', editorContext)
                            console.log('Content:', content)}
                        }}
                    />
            </div>
        </div>
    );
}

export default Editor;
