        
import React, {useState} from 'react';

import {
    Row, 
    Column, 
    SimpleButton,
    Title,
    Text
} from '../components/common';

import {
    TextField,
    Modal
} from '@material-ui/core';

import styled from 'styled-components';

import {RiCheckLine} from 'react-icons/ri';



let width = window.innerWidth;
let height = window.innerHeight;

const NewSpaceModal = props => {

    
    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [image, setImage] = useState(null)
    const [spaceType, setSpaceType] = useState('private')

    const resetState = () => {
        setName('')
        setDesc('')
        setImage(null)
    }

    const onRequestClose = () => {
        resetState()
        props.onClose()
    }

    const handleNameChange = e => {
        setName(e.target.value)
    }

    const handleDescriptionChange = e => {
        setDesc(e.target.value)
    }

    const onChangeHandler = e => {
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    return (
        <Container >
        <Modal
            open={props.isOpen}
            onClose={() => onRequestClose()}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description">

            <ModalCard>
                <HeaderRow>
                    <ModalTitle>Create New Space!</ModalTitle>
                </HeaderRow>
                <FormContainerRow>
                    <UploadImageBox>
                        {
                            image ? 
                            <Image src={image} />
                            :
                            <div>
                                <Label>Set Space Image</Label>
                                <FileInput type="file" name="file" onChange={e => onChangeHandler(e)}/>
                            </div>
                        }
                    </UploadImageBox>
                    
                    <FormBodyBox>
                        <form>
                            <TextField
                                id="standard-multiline-flexible"
                                placeholder="Space Name"
                                variant="outlined"
                                value={name}
                                required
                                helperText={name.length + '/20'}
                                onChange={handleNameChange}
                                FormHelperTextProps={{style: {textAlign: 'right'}}}
                                style={{width: '100%'}}
                                inputProps={{maxLength: '20'}}
                                InputProps={{
                                    style: {
                                        fontFamily: 'Montserrat',
                                        fontWeight: '300',
                                        color: 'rgba(55, 55, 55, 1)'
                                    }
                                }}
                            />
                            <br></br>
                            <br></br>
                            <TextInput
                                id="standard-multiline-static"
                                placeholder="Description"
                                variant="outlined"
                                value={desc}
                                multiline
                                required
                                rows={3}
                                helperText={desc.length + '/140'}
                                onChange={handleDescriptionChange}
                                FormHelperTextProps={{style: {textAlign: 'right'}}}
                                inputProps={{maxLength: '140'}}
                                InputProps={{
                                    style: {
                                        fontFamily: 'Montserrat',
                                        fontWeight: '300',
                                        color: 'rgba(55, 55, 55, 1)'
                                    }
                                }}
                            />
                        </form>

                        <SpaceTypeBox>
                            <SpaceType 
                                onClick={() => setSpaceType('public')}>
                                <Text
                                    fontWeight={spaceType == 'public' ? '500' : null}>
                                        Public
                                </Text>
                                {spaceType == 'public' ? <RiCheckLine size={22} /> : null }
                            </SpaceType>
                            <SpaceType
                                onClick={() => setSpaceType('members')}>
                                <Text
                                    fontWeight={spaceType == 'members' ? '500' : null}>
                                        Members
                                </Text>
                                {spaceType == 'members' ? <RiCheckLine size={22} /> : null }
                            </SpaceType>
                            <SpaceType
                                onClick={() => setSpaceType('private')}>
                                <Text
                                    fontWeight={spaceType == 'private' ? '500' : null}>
                                        Private
                                </Text>
                                {spaceType == 'private' ? <RiCheckLine size={22} /> : null }
                            </SpaceType>
                        </SpaceTypeBox>
                    </FormBodyBox>
                    
                </FormContainerRow>
                <BottomRow>
                    <SimpleButton
                        onClick={onRequestClose}
                        backgroundColor='rgb(255, 255, 255)' 
                        textColor='rgb(10, 15, 80)'
                        text={"Cancel"}/>
                    <SimpleButton text={"Create Space!"} shadow={true}/>  
                </BottomRow>
            </ModalCard>
        </Modal>
        </Container>
    );
}

const Container = styled.div`
`;

const ModalCard = styled.div`
    display: flex;
    flex-direction: column;
    position: fixed;
    top: ${height * 0.2}px;
    right: ${width * 0.225}px;
    width: ${width * 0.55}px;
    height: ${height * 0.65}px;
    background: white;
    border-radius: 10px;
    outline: none;
`;

const HeaderRow = styled(Row)`
    flex: 1;
    justify-content: center;
    align-items: center;
    border-bottom-width: 0.09px;
    border-bottom-style: solid;
    border-bottom-color: lightgray;
`;

const FileInput = styled.input`
`;

const Label = styled.label`
    margin-bottom: 15px;
    font-family: Montserrat;
    font-weight: 300;
`;

const ModalTitle = styled(Title)`
    margin: 0 auto;
    width: 100%;
    text-align: center;
`;

const FormContainerRow = styled(Row)`
    flex: 4;
    justify-content: space-between;
    padding-left: 5%;
    padding-right: 5%;
`;

const UploadImageBox = styled(Row)`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const FormBodyBox = styled(Row)`
    flex: 2;
    padding-left: 5%;
    flex-direction: column;
    justify-content: center;
`;

const SpaceTypeBox = styled(Row)`
    height: 5%;
    padding: 3%;
`;

const SpaceType = styled(Row)`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 3%;
    border-radius: 2px;
    background: ${props => props.color};
    &:hover{
        opacity: 0.7; 
    }

`;

const Image = styled.img`
    width: 100%;
    height: 92%;
    object-fit: cover;
    padding: 5%;
    border-radius: 20px;
    &:hover{
        opacity: 0.4; 
    }
`;

const BottomRow = styled(Row)`
    flex: 1;
    justify-content: center;
    align-items: center;
    border-top-width: 0.09px;
    border-top-style: solid;
    border-top-color: lightgray;
`;

const TextInput = styled(TextField)`
    width: 100%;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: lightgray;
`;

export {NewSpaceModal}