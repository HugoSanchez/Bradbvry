import '../App.css';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import DanteEditor from "Dante2";
import {CircularButton} from '../components/common';
import {NewSpaceModal} from '../components';
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
            isOpen: false,
            content: null,
            timestamp: Date.now(),
        }
    }

    async componentDidMount() {
        window.scrollTo(0, 0)
        let {item} = this.props;
        let {timestamp} = item.message.content;
        if (item) {
            this.setState({timestamp: timestamp})
        } 
    }

    async handleSaveItem() {
        let {content} = this.state;
        content.timestamp = this.state.timestamp

        this.props.handleSaveItem_Action(content)
        this.props.history.push('/home')
    }

    async handleAutomaticSave(content) {
        this.setState({content})
    }

    async handleOpenModal() {
        this.setState({isOpen: true})
    }

    async handleCloseModal() {
        this.setState({isOpen: false})
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
            url: null,
            save_handler: (editorContext, content) => {
                this.handleAutomaticSave(content)
            }
        }
    }   

    
    render(){

        let {item} = this.props

        return (
            <div className="Main">

                <NewSpaceModal isOpen={this.state.isOpen} onClose={() => this.handleCloseModal()}/>

                <CircularButton 
                    onClick={() => this.handleSaveItem()}
                    arrow={true}
                    iconId="editor-circular-button-icon"
                    buttonId="editor-circular-button"/>

                <CircularButton 
                    onClick={() => this.handleOpenModal()}
                    plus={true}
                    iconId="home-add-entry-circular-button-icon"
                    buttonId="editor-circular-button-plus"/>

                <div className="Editor">

                    <DanteEditor 
                        content={item ? item.message.content : null} 
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
