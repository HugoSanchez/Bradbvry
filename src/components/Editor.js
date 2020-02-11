import React, {Component} from 'react';
import '../App.css';
import Box from '3box';
import DanteEditor from "Dante2";
import CircularButton from './common/CircularButton';

class Editor extends Component {
    constructor(props) {
        super(props)
        this.options = this.defaultOptions()
        this.wrappers = this.defaultWrappers()
        this.state = {item: null, originalDate: Date.now()}
    }

    async componentWillMount() {
        const accounts = await window.ethereum.enable();
        const box      = await Box.openBox(accounts[0], window.ethereum)
        const space    = await box.openSpace('bradbvry--main')
        this.setState({box, space, item: this.state.originalDate})
    }

    async handleAutomaticSave(editorContext) {
        let dateUpdate = Date.now()
        let {item, space, originalDate} = this.state
        let intervalBool = originalDate + 10000 < dateUpdate
        let isSpaceSetBool = !(space == 'undefined' || space == null)
        if (intervalBool && isSpaceSetBool) { 
            
            let content  = JSON.stringify(editorContext.editorContent.blocks)
            await space.private.set(item.toString(), content)
            this.setState({ originalDate: dateUpdate })
        }
    }

    async defaultOptions() {
        const default_options = {
            debug: false,
            read_only: true, //This doesn't work.
    
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

        return default_options
    }


    defaultWrappers() {
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

        return default_wrappers
    }
    
    render(){
        return (
            <div className="Main">
                <CircularButton />
                <div className="Editor">
                    <DanteEditor  
                        read_only={false}
                        default_wrappers={this.wrappers}
                        content={null}  
                        config={this.options}
                        data_storage={{
                            url: "http://localhost:8000/",
                            save_handler: (editorContext, content) => { 
                                this.handleAutomaticSave(editorContext)
                            }}}
                        />
                </div>
            </div>
        );
    } 
}

export default Editor;
