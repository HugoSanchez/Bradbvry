import '../App.css';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import DanteEditor from "Dante2";
import {CircularButton} from '../components/common';
import {
    deleteEntry_Action,
    handleSaveItem_Action,
} from '../actions';

class Editor extends Component {
    constructor(props) {
        super(props)
        this.options  = this.defaultOptions()
        this.storage  = this.dataStorageFnc()
        this.wrappers = this.defaultWrappers()
        
        this.state = {
            item: null, 
            content: null,
            timestamp: Date.now(),
        }
    }

    async componentDidMount() {
        window.scrollTo(0, 0)
        let {item} = this.props;
        
        if (item) {
            console.log(item)
            let {timestamp} = item.message.content
            this.setState({timestamp: timestamp})
        } 

        // To do.
        // We need to check that user is signed in

    }

    async handleSaveItem() {
        let {content} = this.state;
        content.timestamp = this.state.timestamp
        this.props.handleSaveItem_Action(content)
        this.props.history.goBack()
    }

    async handleAutomaticSave(content) {
        this.setState({content})
    }

    async defaultOptions() {
        const default_options = {
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
            url: null,
            save_handler: (editorContext, content) => {
                this.handleAutomaticSave(content)
            }
        }
    }   

    
    render(){

        let {item, location} = this.props

        return (
            <div className="Main">

                <CircularButton 
                    onClick={() => this.handleSaveItem()}
                    arrow={true}
                    iconId="editor-circular-button-icon"
                    buttonId="editor-circular-button"/>

                <div className="Editor">

                    <DanteEditor 
                        content={item ? item.message.content : null} 
                        read_only={location.state.onlyRead}
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
        thread:     state.threads.activeThread,
        item:       state.threads.activeItem,
    }
}

function mapDispatchToProps(dispatch) {
    return { 
        handleSaveItem_Action: (item) => {
            dispatch(handleSaveItem_Action(item))},
        deleteEntry_Action: (item) => {
            dispatch(deleteEntry_Action(item))}
    }
}

export default connect(
    mapStateToProps, 
    mapDispatchToProps
)(Editor);
