import React, {Component} from 'react';
import {connect} from 'react-redux';
import '../App.css';
import DanteEditor from "Dante2";
import CircularButton from '../components/common/CircularButton';

class Editor extends Component {
    constructor(props) {
        super(props)
        this.options  = this.defaultOptions()
        this.storage  = this.dataStorageFnc()
        this.wrappers = this.defaultWrappers()
        
        this.state = {
            item: null, 
            originalDate: Date.now()
        }
    }

    async componentDidMount() {
        this.mounted = true;
        if (this.props.location.item) {
            let {timestamp} = this.props.location
            this.setState({item: timestamp[0]})
        } else { 
            this.setState({item: this.state.originalDate}) 
        }
    }

    async componentWillUnmount() {
        this.mounted = false;
    }

    async handleAutomaticSave(editorContext) {
        let dateUpdate = Date.now()
        let {item, originalDate} = this.state
        let {space} = this.props
        let intervalBool = originalDate + 10000 < dateUpdate
        let isSpaceSetBool = !(space === 'undefined' || space == null)
        if (intervalBool && isSpaceSetBool) { 
            let content  = JSON.stringify(editorContext.editorContent)
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

    dataStorageFnc() {
        return {
            url: "http://localhost:8000/",
            save_handler: (editorContext, content) => { 
                this.handleAutomaticSave(editorContext)
            }
        }
    }   

    
    render(){

        let item = this.props.location.item
        let timestamp = this.props.location.timestamp

        return (
            <div className="Main">

                <CircularButton 
                    path="/home"
                    arrow={true}
                    iconId="editor-circular-button-icon"
                    buttonId="editor-circular-button"/>

                <div className="Editor">

                    <DanteEditor 
                        content={item ? item[timestamp[0]] : null} 
                        read_only={false}
                        config={this.options}
                        data_storage={this.storage}
                        default_wrappers={this.wrappers}/>

                </div>
            </div>
        );
    } 
}

function mapStateToProps(state) {
    return {
        box:        state.user.data.box,
        space:      state.user.data.space,
    }
}

export default connect(mapStateToProps, {})(Editor);