        
import React, {useState} from 'react';
import {
    Row, 
    Column, 
    Title
} from '../components/common';

import {Modal} from '@material-ui/core';
import styled from 'styled-components';


let width = window.innerWidth;
let height = window.innerHeight;

const NewSpaceModal = props => {

    const [image, setImage] = useState(null)

    const onChangeHandler = e => {
        setImage(URL.createObjectURL(e.target.files[0]))
    }

    const onRequestClose = () => {
        setImage(null)
        props.onClose()
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
    border-width: 0.09px;
    border-style: solid;
    border-color: blue;
`;

const UploadImageBox = styled(Row)`
    flex: 1;
    justify-content: center;
    align-items: center;
    &:hover{
        box-shadow: 0 0 10px rgba(0,0,0,0.2); 
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

const FormBodyBox = styled(Row)`
    flex: 2;
    justify-content: center;
    align-items: center;
    border-width: 0.09px;
    border-style: solid;
    border-color: blue;
`;

const BottomRow = styled(Row)`
    flex: 1;
    justify-content: center;
    align-items: center;
    border-width: 0.09px;
    border-style: solid;
    border-color: green;
`;

export {NewSpaceModal}