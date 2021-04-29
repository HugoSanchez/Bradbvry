import React, {useState} from 'react';
import {useDispatch} from "react-redux";
import {handleSaveImage_Action} from '../../../actions';
import {getBase64} from '../../../utils';

import {
    lightGray150,
    primaryGray45
} from '../../../constants/colors';

import {
    Gn,
    Label,
    TypeBox,
    MediaType,
    ModalTitle,
    FormBodyBox,
} from './styles';

import {
    Text,
    FormButton,
    FileInput,
    NameInput,
    DrawerCont,
    DescriptionInput,
} from '../../common';

import {
    UploadImageForm
} from '../../index';

export const UploadMediaForm = props => {

    let [name, setName] = useState('')
    let [desc, setDesc] = useState('')
    let [image, setImage] = useState(false)
    let [mediaType, setMediaType] = useState('image')

    const dispatch = useDispatch()

    const onImageUpload = async e => {
        setImage({name: e.target.files[0].name, file: e.target.files})
    }

    const handleFormSubmit = async () => {
        image.file[0].title = name
        image.file[0].description = desc
        dispatch(handleSaveImage_Action({files: image.file}))
        props.onClose()
    }

    return (
        <DrawerCont>          
            
            <ModalTitle>
                Upload Media
            </ModalTitle>

            <FormBodyBox>

                <Label><Gn>1.</Gn> Choose media type </Label>
                <TypeBox>
                    <MediaType
                        color={ mediaType === 'image' ? primaryGray45 : null }
                        onClick={() => setMediaType('image')}>
                        <Text
                            color={lightGray150}
                            fontWeight={mediaType === 'image' ? '500' : null}>
                                Image
                        </Text>
                    </MediaType>

                    <MediaType
                        color={ mediaType === 'video' ? primaryGray45 : null }
                        onClick={() => setMediaType('video')}>
                        <Text
                            color={lightGray150}
                            fontWeight={mediaType === 'video' ? '500' : null}>
                                Video
                        </Text>
                    </MediaType>
                </TypeBox>
                

                <UploadImageForm
                    name={name}
                    desc={desc}
                    image={image}
                    setName={setName}
                    setDesc={setDesc}
                    onImageUpload={onImageUpload}
                />

                <FormButton 
                    isActive={!!image}
                    text={'Upload Media'}
                    onClick={!!image ? handleFormSubmit : null}
                />
                    
            </FormBodyBox>               
        </DrawerCont>
    )
}




