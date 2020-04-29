        
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
                    
                    <FormBodyBox>
                        <form>
                            <TextField
                                id="standard-multiline-flexible"
                                label="New Space Name"
                                variant="outlined"
                                value={name}
                                onChange={handleNameChange}
                                style={{
                                    width: '100%',
                                    fontFamily: 'Montserrat',
                                    fontWeight: '500',
                                }}
                                InputProps={{
                                    
                                    style: {
                                        fontSize: '20px',
                                        fontFamily: 'Montserrat',
                                        fontWeight: '300',
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
                                rows={4}
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
                <BottomRow>
                    <SimpleButton backgroundColor={'rgb(255, 255, 255)'} text={"Cancel"}/>
                    <SimpleButton text={"Create Space!"}/>  
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