import React, {useState} from 'react';

import {getBase64} from '../../../utils';

import {
    Gn,
    Label,
    ModalTitle,
    FormBodyBox,
    Button,
} from './styles';

import {
    FileInput,
    NameInput,
    DrawerCont,
    DescriptionInput,
} from '../../common';

// import {useSelector} from "react-redux";

export const UploadImageForm = props => {

    let errorObj = {name: null, desc: null}
    
    let [name, setName] = useState('')
    let [desc, setDesc] = useState('')
    let [image, setImage] = useState(false)
    let [error, setError] = useState(errorObj)

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
        console.log(e.target.files[0].name)
        let fileName = e.target.files[0].name
        let stringFile = await getBase64(e.target.files[0])
        console.log(stringFile)
        setImage({name: fileName, file: stringFile})
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
        <DrawerCont>          
            
            <ModalTitle>
                Upload Image
            </ModalTitle>

            <FormBodyBox>
                <Label><Gn>1.</Gn> Choose a title </Label>
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

                <Label><Gn>3.</Gn> Upload a cover image</Label>
                <FileInput 
                    file={image}
                    onChange={(e) => onImageUpload(e)}
                />  

               { name && desc && image && <Button />}
            </FormBodyBox>               
        </DrawerCont>
    )
}




