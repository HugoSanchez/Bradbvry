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
    primaryGray85,
    primaryGreen
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

    const iputPropsConfig = {
        style: {
            fontFamily: 'Montserrat',
            fontWeight: '300',
            color: 'rgba(55, 55, 55, 1)',
            borderColor: 'red',
        }
    }

    return (
        <Container>          
            <FormContainerRow>
                <FormBodyBox>
                    <HeaderRow>
                        <ModalTitle>Create New Space</ModalTitle>
                    </HeaderRow>

                    <Form>
                        <TextField
                            value={name}
                            variant="standard"
                            style={{width: '100%'}}
                            placeholder="Space Name"
                            onChange={handleNameChange}
                            InputProps={{
                                classes: {
                                    focused: {
                                          borderColor: "yellow"
                                    }
                                }
                            }}
                            inputProps={{maxLength: '20'}}
                            helperText={error.name ? error.name : name.length + '/20'}
                            FormHelperTextProps={{
                                style: {
                                    textAlign: 'left', 
                                    color: error.name ? '#F64747' : null
                                }
                            }}
                        />
                        <br></br>
                        <br></br>
                        <TextInput
                            rows={3}
                            multiline
                            value={desc}
                            variant="outlined"
                            placeholder="Description"
                            InputProps={iputPropsConfig}
                            inputProps={{maxLength: '140'}}
                            onChange={handleDescriptionChange}
                            helperText={error.desc ? error.desc : desc.length +'/140'}
                            FormHelperTextProps={{
                                style: {
                                    textAlign: 'left', 
                                    color: error.desc ? '#F64747' : null
                                }
                            }}
                        />
                    </Form>

                    <StyledFileInput
                        id="duplicate-file-selection"
                        label="Choose file"
                        accept="image/*,video/*"
                        onChange={() => setImage(true)}
                        className={null}
                        primary
                        iconBefore
                        allowDuplicates
                        icon={null}
                        image={image}
                    />

                    <SpaceTypeBox>
                        <SpaceType 
                            onClick={() => setSpaceType('public')}>
                            <Text
                                fontWeight={spaceType === 'public' ? '500' : null}>
                                    Public
                            </Text>
                            {spaceType === 'public' ? <RiCheckLine size={22} /> : null }
                        </SpaceType>
                        <SpaceType
                            onClick={() => setSpaceType('members')}>
                            <Text
                                fontWeight={spaceType === 'members' ? '500' : null}>
                                    Members
                            </Text>
                            {spaceType === 'members' ? <RiCheckLine size={22} /> : null }
                        </SpaceType>
                        <SpaceType
                            onClick={() => setSpaceType('private')}>
                            <Text
                                fontWeight={spaceType === 'private' ? '500' : null}>
                                    Private
                            </Text>
                            {spaceType === 'private' ? <RiCheckLine size={22} /> : null }
                        </SpaceType>
                    </SpaceTypeBox>

                    <BottomRow>
                        <ButtonBox>

                        </ButtonBox>
                    
                        <ButtonBox>

                        </ButtonBox>
                    </BottomRow>
                </FormBodyBox>
                
            
               
            </FormContainerRow>
        </Container>
    )
}

const Container = styled(View)`
    border-radius: 8px;
`;

const HeaderRow = styled(Row)`
    flex: 1;
    flex-direction: row;
`;

const ModalTitle = styled(Title)`
    margin-top: 4%;
    width: 100%;
    text-align: center;
    font-family: Raleway;
    font-weight: 700;
    font-size: 32px;
`;

const FormContainerRow = styled(Row)`
    flex: 4;
    justify-content: space-between;
    padding-left: 5%;
    padding-right: 5%;
`;

const StyledFileInput = styled(FileInput)`
    background: ${props => props.image ? primaryGreen : '#FFF' };
    height: 10%;
    padding-top: 2%;
    color: ${primaryGray85};
    font-family: Montserrat;
    font-style: italic;
    border-width: 3px;
    border-style: solid;
    border-color: ${primaryGreen};
`

const FormBodyBox = styled(Row)`
    flex: 2;
    flex-direction: column;
    justify-content: center;
`;

const SpaceTypeBox = styled(Row)`
    margin-top: 2%;
    margin-bottom: 3%;
    height: 5%;
    padding: 3%;
`;

const SpaceType = styled(Row)`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 2%;
    border-radius: 2px;
    background: ${props => props.color};
    &:hover{
        opacity: 0.7; 
    }
`;

const BottomRow = styled(Row)`
    flex: 0.5;
    justify-content: center;
    align-items: space-between;
`;

const ButtonBox = styled(Row)`
    flex: 1;
    margin: 0.2%;
    border-width: 2px;
    border-style: solid;
    border-color: ${primaryGreen}
`;

const TextInput = styled(TextField)`
    width: 100%;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: lightgray;
`;

const Form = styled.form``;
