import React, {useState} from 'react';
import {handleCreateCollection_Action} from '../../../actions';

import {
    useDispatch
} from "react-redux";

import {
    Gn,
    Label,
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
    getBase64, 
} from '../../../utils';


export const NewCollectionForm = props => {
    
    let dispatch = useDispatch()
    let errorObj = {name: null, desc: null}
    
    let [name, setName] = useState('')
    let [desc, setDesc] = useState('')
    let [image, setImage] = useState(false)
    let [error, setError] = useState(errorObj)
    let [loading, setLoading] = useState(false)
    let [collectionType, setCollectionType] = useState('public')


    const onImageUpload = async e => {
        if (e.target.files.length > 0) {
            let fileName = e.target.files[0].name
            let stringFile = await getBase64(e.target.files[0])
            setImage({name: fileName, file: stringFile})
        }
    }

    const handleFormSubmit = async () => {
        setLoading(true)
        if (name.length < 1 && desc.length < 1) { setError(errorCodes)}
        else if (name.length < 1) {setError({...error, name: errorCodes.name})}
        else if (desc.length < 1) {setError({...error, desc: errorCodes.desc})}
        else {
            handleCreateCollection()
        }
    }

    const handleCreateCollection = async () => {
        let callback = (bool) => { props.onClose() }
        let threadConfig = parseCollectionConfigObject()
        dispatch(handleCreateCollection_Action(threadConfig, callback))        
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
        <DrawerCont width={window.innerWidth}>     
            <CloseTab onClick={() => {props.onClose()}}>
                x
            </CloseTab>     
            
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

                { 
                    name && 
                    desc && 
                    image && 
                    <FormButton 
                        text={'Create Collection'}
                        loading={loading}
                        onClick={handleFormSubmit}/>
                }
            </FormBodyBox>               
        </DrawerCont>
    )
}




