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
    UploadVideoForm,
    UploadImageForm
} from '../../index';

export const UploadMediaForm = props => {

    let dispatch = useDispatch()
    let [name, setName] = useState('')
    let [desc, setDesc] = useState('')
    let [image, setImage] = useState(false)
    let [video, setVideo] = useState(false)
    let [mediaType, setMediaType] = useState('image')
    let [activeButton, setActiveButton] = useState(false)


    const onImageUpload = async e => {
        setImage({name: e.target.files[0].name, file: e.target.files})
        if (mediaType === 'image') {setActiveButton(true)}
    }

    const onVideoUpload = async e => {
        setVideo({name: e.target.files[0].name, file: e.target.files})
        setActiveButton(true)
    }

    const handleMediaTypeChange = type => {
        setActiveButton(false)
        setMediaType(type)
        setImage(false)
        setVideo(false)
        setName('')
        setDesc('')
    }

    const handleFormSubmit = async () => {
        if (mediaType === 'image') return handleUploadImage()
        if (mediaType === 'video') return handleUploadVideo()
    }

    const handleUploadImage = async () => {
        image.file[0].title = name
        image.file[0].description = desc
        dispatch(handleSaveImage_Action(image.file))
        props.onClose()
    }

    const handleUploadVideo = async () => {
        video.file[0].title = name
        video.file[0].description = desc
        dispatch(handleSaveImage_Action(video.file, image.file))
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
                        onClick={() => handleMediaTypeChange('image')}>
                        <Text
                            color={lightGray150}
                            fontWeight={mediaType === 'image' ? '500' : null}>
                                Image
                        </Text>
                    </MediaType>

                    <MediaType
                        color={ mediaType === 'video' ? primaryGray45 : null }
                        onClick={() => handleMediaTypeChange('video')}>
                        <Text
                            color={lightGray150}
                            fontWeight={mediaType === 'video' ? '500' : null}>
                                Video
                        </Text>
                    </MediaType>
                </TypeBox>
                

                {
                    mediaType === 'image' ?   

                        <UploadImageForm
                            name={name}
                            desc={desc}
                            image={image}
                            setName={setName}
                            setDesc={setDesc}
                            onImageUpload={onImageUpload}
                        />
                    :

                        <UploadVideoForm
                            name={name}
                            desc={desc}
                            image={image}
                            video={video}
                            setName={setName}
                            setDesc={setDesc}
                            onVideoUpload={onVideoUpload}
                            onImageUpload={onImageUpload}
                        />
                }

                <FormButton 
                    isActive={activeButton}
                    text={'Upload Media'}
                    onClick={activeButton ? handleFormSubmit : null}
                />
                    
            </FormBodyBox>               
        </DrawerCont>
    )
}




