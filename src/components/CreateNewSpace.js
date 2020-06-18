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
                <ModalTitle>Create A New Collection</ModalTitle>
            </HeaderRow>

            <FormBodyBox>
                <Label><Gn>1.</Gn> Set your Collection's name</Label>
                <NameInput 
                    value={name}
                    maxLength="20"
                    onChange={(e) => setName(e.target.value)}/>

                <Label><Gn>2.</Gn> Enter a brief description</Label>
                <DescriptionInput 
                    rows={3}
                    value={desc}
                    maxLength="140"
                    onChange={(e) => setDesc(e.target.value)}/>

                <Label><Gn>3.</Gn> Select your Collection's type</Label>
                <SpaceTypeBox>
                    <SpaceType 
                        color={ spaceType === 'public' ? primaryGray45 : null }
                        onClick={() => setSpaceType('public')}>
                        <Text
                            color={lightGray150}
                            fontWeight={spaceType === 'public' ? '500' : null}>
                                Public
                        </Text>
                    </SpaceType>
                    <SpaceType
                        color={ spaceType === 'members' ? primaryGray45 : null }
                        onClick={() => setSpaceType('members')}>
                        <Text
                            color={lightGray150}
                            fontWeight={spaceType === 'members' ? '500' : null}>
                                Members
                        </Text>
                    </SpaceType>
                    <SpaceType
                        color={ spaceType === 'private' ? primaryGray45 : null }
                        onClick={() => setSpaceType('private')}>
                        <Text
                            color={lightGray150}
                            fontWeight={spaceType === 'private' ? '500' : null}>
                                Private
                        </Text>
                    </SpaceType>
                </SpaceTypeBox>

                <Label><Gn>4.</Gn> Upload a cover image</Label>
                <NameInput 
                    value={name}
                    maxLength="20"
                    onChange={(e) => setName(e.target.value)}/>
                
                <Button />
            </FormBodyBox>               
        </Container>
    )
}

const Container = styled.div`
    padding-top: 6%;
    padding-right: 6%;
    padding-left: 6%;
    width: 500px;
    height: 100%;
    dislay: flex;
    overflow: scroll;
    background: #191919;
    opacity: 0.9;
    ::-webkit-scrollbar {
        width: 0px;  
    }
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
    font-size: 38px;
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
    font-size: 16px;
    font-weight: 600;
    margin: 2%;
    margin-bottom: 4%;
    margin-top: 8%;
`;

const Gn = styled.span`
    color: ${primaryGreen}
`;

const NameInput = styled.input`
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    margin-right: 2%;
    margin-left: 2%;
    height: 50px;
    font-family: Montserrat;
    font-weight: 300;
    font-size: 16px;
    font-style: italic;
    border-radius: 3px;
    background: rgb(30,30, 30);
    color: ${lightGray150};
    border:0;
    :focus {
        outline-width: 0;
    }
`;

const DescriptionInput = styled.textarea`
    padding-left: 5%;
    padding-right: 5%;
    padding-top: 2%;
    padding-bottom: 2%;
    margin-right: 2%;
    margin-left: 2%;
    font-family: Montserrat;
    font-weight: 300;
    font-size: 16px;
    font-style: italic;
    border-radius: 3px;
    background: rgb(30,30, 30);
    color: ${lightGray150};
    resize: none;
    border:0;
    :focus {
        outline-width: 0;
    }
    ::-webkit-scrollbar {
        width: 0px;  
    }
`;

const SpaceTypeBox = styled(Row)`
    flex: 1;
`;

const SpaceType = styled(Row)`
    flex: 1;
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin-left: 2%;
    margin-right: 2%;
    border-radius: 2px;
    background: ${props => props.color};
    &:hover{
        opacity: 0.7; 
    }
`;

const Button = styled.div`
    background: ${primaryGreen};
    margin-top: 4%;
    margin-right: 2%;
    margin-left: 2%;
    height: 50px;
`;

