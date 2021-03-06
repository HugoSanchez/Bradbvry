import React, {useEffect, useState} from 'react';

import {
    handleUpdateCollection_Action,
    handleCreateCollection_Action
} from '../../../actions';

import {
    useDispatch
} from "react-redux";

import {
    Gn,
    Label,
    Error,
    Warning,
    ModalTitle,
    FormBodyBox,
    CloseTab,
} from './styles';

import {
    FormButton,
    FileInput,
    NameInput,
    DrawerCont,
    DescriptionInput,
    CollectionTypeSel
} from '../../common';

import {
    isASCII,
} from '../../../utils';


export const NewCollectionForm = props => {
    
    let dispatch = useDispatch()
    let errorObj = {name: null, desc: null}
    
    let [name, setName] = useState('')
    let [desc, setDesc] = useState('')
    let [image, setImage] = useState(false)
    let [error, setError] = useState(false)
    let [isEdit, setIsEdit] = useState(false)
    let [loading, setLoading] = useState(false)
    let [collectionType, setCollectionType] = useState('public')

    useEffect(() => {
        let checked = isASCII(name)
        if (!checked) {setError(true)}
        else {setError(false)}
    
    }, [name])

    useEffect(() => {
        if (props.collection) {
            setName(props.collection.name)
            setDesc(props.collection.description)
            setIsEdit(true)
        }
    }, [])

    const onImageUpload = async e => {
        if (e.target.files.length > 0) {
            let fileName = e.target.files[0].name
            // let stringFile = await getBase64(e.target.files[0])
            setImage({name: fileName, file: e.target.files[0]})
        }
    }

    const handleFormSubmit = async () => {
        setLoading(true)
        if (name.length < 1 && desc.length < 1) { setError(errorCodes)}
        else if (name.length < 1) {setError({...error, name: errorCodes.name})}
        else if (desc.length < 1) {setError({...error, desc: errorCodes.desc})}
        else {
            if (isEdit){handleEditCollection()}
            else {handleCreateCollection()}
        }
    }

    const callback = () => {props.onClose()}


    const handleEditCollection = async () => {
        let threadConfig = parseCollectionConfigObject()
        dispatch(handleUpdateCollection_Action(threadConfig, props.history, props.collection))
        props.onClose()
    }

    const handleCreateCollection = async () => {
        let threadConfig = parseCollectionConfigObject()
        dispatch(handleCreateCollection_Action(threadConfig))     
        props.onClose()   
    }

    const parseCollectionConfigObject = () => {
        let threadConfig = {}
        threadConfig.name = name
        threadConfig.type = collectionType
        threadConfig.description = desc
        threadConfig.image = image.file
        return threadConfig
    }

    const errorCodes = {
        name: 'A name is required for your collection',
        desc: 'A description is required for your collection'
    }

    return (
        <DrawerCont 
            opacity={loading ? '0.7' : '0.9'}
            width={window.innerWidth}>     
            <CloseTab onClick={() => {props.onClose()}}>
                x
            </CloseTab>     
            
            <ModalTitle>
                {isEdit ? 'Update' : 'Create A New'}  Collection
            </ModalTitle>

            <FormBodyBox>
                <Label><Gn>1.</Gn> Set your Collection's name</Label>
                {error ? <Error>{'* Invalid character'}</Error> : null}
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
                <Warning>Please bear in mind that for the moment all collections are public!</Warning>
                <CollectionTypeSel 
                    collectionType={collectionType}
                    setCollectionType={setCollectionType}
                />

                <Label><Gn>4.</Gn> Upload a cover image</Label>
                <FileInput 
                    file={image}
                    onChange={(e) => onImageUpload(e)}
                />  

                <FormButton 
                    text={isEdit ? 'Update Collection' : 'Create Collection'}
                    loading={loading}
                    isActive={name && desc && image || isEdit && !error}
                    onClick={handleFormSubmit}/>

            </FormBodyBox>               
        </DrawerCont>
    )
}




