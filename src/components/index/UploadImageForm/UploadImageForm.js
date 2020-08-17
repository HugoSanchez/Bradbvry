import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {handleSaveImage_Action} from '../../../actions';
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

export const UploadImageForm = props => {

    let [name, setName] = useState('')
    let [desc, setDesc] = useState('')
    let [image, setImage] = useState(false)

    const dispatch = useDispatch()

    const onImageUpload = async e => {
        let fileName = e.target.files[0].name
        let stringFile = await getBase64(e.target.files[0])
        setImage({name: fileName, file: stringFile})
    }

    const handleFormSubmit = async () => {
        let object = {
            title: name,
            description: desc, 
            image: image
        }

        dispatch(handleSaveImage_Action(object))
        props.onClose()
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

               { image && <Button onClick={handleFormSubmit}/>}
            </FormBodyBox>               
        </DrawerCont>
    )
}




