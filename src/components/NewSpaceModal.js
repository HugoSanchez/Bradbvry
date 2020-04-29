        
import React, {useState} from 'react';

import {
    Row, 
    Column, 
    Title,
    Text
} from '../components/common';

import {
    TextField,
    Modal
} from '@material-ui/core';

import styled from 'styled-components';


let width = window.innerWidth;
let height = window.innerHeight;

const NewSpaceModal = props => {

    
    const [name, setName] = useState(null)
    const [desc, setDesc] = useState(null)
    const [image, setImage] = useState(null)
    const [spaceType, setSpaceType] = useState('private')


    const onChangeHandler = e => {
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    const onRequestClose = () => {
        setImage(null)
        props.onClose()
    }

    const handleNameChange = e => {
        console.log(e.target)
    }

    return (
        <Container >
        <Modal
            open={props.isOpen}
            onClose={() => onRequestClose()}
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
        > 
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
                            <input type="file" name="file" onChange={e => onChangeHandler(e)}/>
                        }
                    </UploadImageBox>
                    <SpaceTypeBox>
                        <SpaceType 
                            color={spaceType == 'public' ? 'rgb(190, 235, 194)' : '#FFF'}
                            onClick={() => setSpaceType('public')}>
                            <Text fontWeight={spaceType == 'public' ? '600' : null}>
                                Make my space public!
                            </Text>
                        </SpaceType>
                        <SpaceType 
                            color={spaceType == 'members' ? 'rgb(190, 235, 194)' : '#FFF'}
                            onClick={() => setSpaceType('members')}>
                            <Text fontWeight={spaceType == 'members' ? '600' : null}>
                                This space should be Members only
                            </Text>
                        </SpaceType>
                        <SpaceType 
                            color={spaceType == 'private' ? 'rgb(190, 235, 194)' : '#FFF'}
                            onClick={() => setSpaceType('private')}>
                            <Text fontWeight={spaceType == 'private' ? '600' : null}>
                                I want this to be fully private.
                            </Text>
                        </SpaceType>
                    </SpaceTypeBox>
                    <FormBodyBox>
                        <form>
                            <TextField
                                id="standard-multiline-flexible"
                                label="New Space Name"
                                variant="outlined"
                                value={name}
                                onChange={handleNameChange}
                                style={{
                                    fontFamily: 'Montserrat',
                                    fontWeight: '500',
                                }}
                                InputProps={{
                                    
                                    style: {
                                        fontFamily: 'Montserrat',
                                        fontWeight: '500',
                                        color: "rgba(55, 55, 55, 1)"
                                    }
                                }}
                            />
                            <br></br>
                            <br></br>
                            <br></br>
                            <TextInput
                                id="standard-multiline-static"
                                label="Description"
                                variant="outlined"
                                multiline
                                rows={5}
                                helperText="Keep it short!"
                                InputProps={{
                                    style: {
                                        fontFamily: 'Montserrat',
                                        fontWeight: '300',
                                        color: "gray"
                                    }
                                }}
                            />
                        </form>
                    </FormBodyBox>
                    
                </FormContainerRow>
                <BottomRow />
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
    border-radius: 8px;
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

const ModalTitle = styled(Title)`
    margin: 0 auto;
    width: 100%;
    text-align: center;
`;

const FormContainerRow = styled(Row)`
    flex: 4;
`;

const UploadImageBox = styled(Row)`
    flex: 1.5;
    justify-content: center;
    align-items: center;
`;

const FormBodyBox = styled(Row)`
    flex: 1.5;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const SpaceTypeBox = styled(Column)`
    flex: 1.5;
    padding: 3%;
`;

const SpaceType = styled(Row)`
    flex: 1;
    display: flex;
    align-items: center;
    padding: 5%;
    border-radius: 2px;
    background: ${props => props.color};
    &:hover{
        opacity: 0.7; 
    }
`;

const Image = styled.img`
    width: 100%;
    height: 100%;
    object-fit: cover;
    padding: 2%;
    border-radius: 10px;
    &:hover{
        opacity: 0.4; 
    }
`;

const BottomRow = styled(Row)`
    flex: 1;
    justify-content: center;
    align-items: center;
    border-width: 0.09px;
    border-style: solid;
    border-color: green;
`;

const TextInput = styled(TextField)`
    width: 100%;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: lightgray;
`;

export {NewSpaceModal}