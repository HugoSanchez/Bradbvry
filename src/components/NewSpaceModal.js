        
import React, {useState} from 'react';

import {
    Row, 
    View, 
    SimpleButton,
    Title,
    Text
} from '../components/common';

import {
    TextField,
    Modal
} from '@material-ui/core';

import {
    fileFromBase64,
    getBase64,
    ThreeBox
} from '../utils';

import {threadObj} from '../constants';
import {useSelector} from "react-redux";
import {RiCheckLine} from 'react-icons/ri';
import SimpleCrypto from "simple-crypto-js";
import styled from 'styled-components';


let width = window.innerWidth;
let height = window.innerHeight;

const NewSpaceModal = props => {

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
        // TODO: check that the file is actually an image.
        let stringFile = await getBase64(e.target.files[0])
        console.log(stringFile)
        
        /** 
        console.time('encryption')
        var _secretKey = SimpleCrypto.generateRandom();
        var simpleCrypto = new SimpleCrypto(_secretKey);
        var encrypted = simpleCrypto.encrypt(stringFile);
        console.timeEnd('encryption')
        */
        
        // setImage(stringFile)
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
            color: 'rgba(55, 55, 55, 1)'
        }
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
                    <UploadImageBox margin={image}>
                        {
                            image ? 
                            <Image src={image} /> :
                            <View>
                                <Label>Set Space Image</Label>
                                <FileInput 
                                    type="file" 
                                    name="file" 
                                    onChange={onImageUpload}
                                />
                            </View>
                        }
                    </UploadImageBox>
                    
                    <FormBodyBox>
                        <Form>
                            <TextField
                                value={name}
                                variant="outlined"
                                style={{width: '100%'}}
                                placeholder="Space Name"
                                onChange={handleNameChange}
                                InputProps={iputPropsConfig}
                                inputProps={{maxLength: '20'}}
                                helperText={error.name ? error.name : name.length + '/20'}
                                FormHelperTextProps={{
                                    style: {
                                        textAlign: 'right', 
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
                                        textAlign: 'right', 
                                        color: error.desc ? '#F64747' : null
                                    }
                                }}
                            />
                        </Form>

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
                    </FormBodyBox>
                    
                </FormContainerRow>
                <BottomRow>
                    <SimpleButton
                        onClick={onRequestClose}
                        backgroundColor='rgb(255, 255, 255)' 
                        textColor='rgb(10, 15, 80)'
                        text={"Cancel"}/>
                    <SimpleButton 
                        onClick={handleFormSubmit}
                        text={"Create Space!"} 
                        shadow={true}/>  
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
    border-radius: 6px;
    outline: none;
`;

const HeaderRow = styled(Row)`
    flex: 1;
    justify-content: center;
    align-items: center;
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
    margin-left: ${props => props.margin ? null : '3%'}
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
    border-radius: 12px;
    box-shadow: 0 0 5px rgba(0,0,0,0.2); 
    &:hover{
        opacity: 0.4; 
    }
`;

const BottomRow = styled(Row)`
    flex: 1;
    justify-content: center;
    align-items: center;
`;

const TextInput = styled(TextField)`
    width: 100%;
    border-bottom-width: 2px;
    border-bottom-style: solid;
    border-bottom-color: lightgray;
`;

const Form = styled.form``;
const FileInput = styled.input``;


export {NewSpaceModal}