import React, {useState, Fragment} from 'react';

import {
    Row, 
    View, 
    SimpleButton,
    SimpleEmptyButton,
    Title,
    Text
} from '../components/common';

import {
    lightGray150,
    primaryGray85,
    primaryGreen,
    primaryGray45,
} from '../constants/colors';

import {
    Input,
    TextField,
} from '@material-ui/core';

import {
    getBase64
} from '../utils';

import { FileInput, Snackbar } from 'react-md';

// import {useSelector} from "react-redux";
import {RiCheckLine} from 'react-icons/ri';
import styled from 'styled-components';
import { BLAKE2B_24 } from 'multicodec';

// let width = window.innerWidth;
// let height = window.innerHeight;

export const CreateNewSpace = props => {

    let errorObj = {name: null, desc: null}
    
    let [name, setName] = useState('')
    let [desc, setDesc] = useState('')
    let [image, setImage] = useState(null)
    let [error, setError] = useState(errorObj)
    let [spaceType, setSpaceType] = useState('private')

    // const space = useSelector(state => state.user.data.space);
    // const account = useSelector(state => state.user.data.accounts[0]);


    const resetState = () => {
        setName('')
        setDesc('')
        setImage(null)
        setError(errorObj)
    }

    const onRequestClose = () => {
        resetState()
        props.onClose()
    }

    const handleNameChange = e => {
        setError({...error, name: null})
        setName(e.target.value)
    }

    const handleDescriptionChange = e => {
        setError({...error, desc: null})
        setDesc(e.target.value)
    }

    const onImageUpload = async e => {
        let stringFile = await getBase64(e.target.files[0])
        console.log(stringFile)
        setImage(stringFile)
    }

    const handleFormSubmit = async () => {
        if (name.length < 1 && desc.length < 1) { setError(errorCodes)}
        else if (name.length < 1) {setError({...error, name: errorCodes.name})}
        else if (desc.length < 1) {setError({...error, desc: errorCodes.desc})}
        else {

            /** 
            name = name.replace(/\s+/g, '-').toLowerCase();
            let threadConfig = Object.assign({}, threadObj)
            threadConfig.name = name
            threadConfig.description = desc
            threadConfig.image = image

            let thread = await ThreeBox.createConfidentialThread(space, account, name, spaceType)
            console.log('Thread: ', thread)
            await thread.post({threadConfig})
            let posts = await thread.getPosts()
            console.log('Posts: ', posts)
            // await space.unsubscribeThread(name)
            */

        }
    }

    const errorCodes = {
        name: 'A name is required for your space',
        desc: 'A description is required for your space'
    }

    const titleInputProps = {
        style: {
            fontFamily: 'Montserrat',
            fontWeight: '300',
            color: 'rgba(55, 55, 55, 1)',
        }
    }

    const iputPropsConfig = {
        style: {
            fontFamily: 'Montserrat',
            fontWeight: '300',
            color: 'rgba(55, 55, 55, 1)',
        }
    }

    return (
        <Container>          
            
            <HeaderRow>
                <ModalTitle>Create New Space</ModalTitle>
            </HeaderRow>

            <FormBodyBox>
                <Label>1. Set your space name</Label>
                <NameInput 
                    height={'60px'}
                    value={name}
                    maxLength="20"
                    onChange={(e) => setName(e.target.value)}/>

                <Label>2. Type a brief description</Label>
                <NameInput 
                    height={'120px'}
                    value={name}
                    maxLength="20"
                    onChange={(e) => setName(e.target.value)}/>
            </FormBodyBox>               
        </Container>
    )
}

const Container = styled.div`
    padding-top: 15%;
    padding-right: 6%;
    padding-left: 6%;
    width: 500px;
    height: 100%;
    dislay: flex;
    overflow: hidden;
    background: #191919;
    opacity: 0.9;
`;

const HeaderRow = styled(Row)`
    flex: 1;
    flex-direction: row;
`;

const ModalTitle = styled(Title)`
    width: 100%;
    text-align: center;
    font-family: Montserrat;
    font-weight: 600;
    font-size: 44px;
    color: ${lightGray150};
`;

const FormBodyBox = styled(Row)`
    flex: 2;
    flex-direction: column;
    justify-content: center;
`;

const Label = styled.label`
    color: ${lightGray150};
    font-family: Montserrat;
    font-size: 22px;
    font-weight: 500;
    margin: 2%;
    margin-bottom: 4%;
    margin-top: 8%;
`;

const NameInput = styled.input`
    padding: 5%;
    margin-right: 2%;
    margin-left: 2%;
    height: ${props => props.height};
    font-family: Montserrat;
    font-weight: 300;
    font-size: 22px;
    font-style: italic;
    border-radius: 5px;
    background: rgb(30,30, 30);
    color: ${lightGray150};
    border:0;
    :focus {
        outline-width: 0;
    }
`;

