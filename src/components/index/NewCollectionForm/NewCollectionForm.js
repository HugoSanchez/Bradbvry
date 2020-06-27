import React, {useState} from 'react';

import {getBase64} from '../../../utils';

import {
    Container,
    ModalTitle,
    FormBodyBox,
    Label,
    Gn,
    Button,
    FileInputBox,
    FileInput
} from './styles';

import {
    NameInput,
    DescriptionInput,
    CollectionTypeSel
} from '../../common';

// import {useSelector} from "react-redux";

export const NewCollectionForm = props => {

    let errorObj = {name: null, desc: null}
    
    let [name, setName] = useState('')
    let [desc, setDesc] = useState('')
    let [image, setImage] = useState(null)
    let [error, setError] = useState(errorObj)
    let [collectionType, setCollectionType] = useState('private')

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

    return (
        <Container>          
            
            <ModalTitle>
                Create A New Collection
            </ModalTitle>

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
                <CollectionTypeSel 
                    collectionType={collectionType}
                    setCollectionType={setCollectionType}
                />

                <Label><Gn>4.</Gn> Upload a cover image</Label>
                <FileInputBox>
                    <FileInput />  
                </FileInputBox> 

                <Button />
            </FormBodyBox>               
        </Container>
    )
}


