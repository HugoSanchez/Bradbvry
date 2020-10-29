import React, {useState} from 'react';

import {
    useSelector,
    useDispatch
} from "react-redux";

import {
    Gn,
    Label,
    ModalTitle,
    FormBodyBox,
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
    Mixpanel
} from '../../../utils';

import {threadObj} from '../../../constants';
import {ThreeBox} from '../../../utils/3box';
import {setThreadArray_Action} from '../../../actions';


export const NewCollectionForm = props => {

    let errorObj = {name: null, desc: null}
    
    let [name, setName] = useState('')
    let [desc, setDesc] = useState('')
    let [image, setImage] = useState(false)
    let [error, setError] = useState(errorObj)
    let [loading, setLoading] = useState(false)
    let [collectionType, setCollectionType] = useState('private')

    const dispatch = useDispatch()
    const space = useSelector(state => state.user.data.space);
    const account = useSelector(state => state.user.data.address);
    const threadsArray = useSelector(state => state.threads.threadsArray);

    const onImageUpload = async e => {
        let fileName = e.target.files[0].name
        let stringFile = await getBase64(e.target.files[0])
        setImage({name: fileName, file: stringFile})
    }

    const handleFormSubmit = async () => {
        setLoading(true)
        if (name.length < 1 && desc.length < 1) { setError(errorCodes)}
        else if (name.length < 1) {setError({...error, name: errorCodes.name})}
        else if (desc.length < 1) {setError({...error, desc: errorCodes.desc})}
        else {
            // First parse thread config object.
            name = name.replace(/\s+/g, '-').toLowerCase();
            let threadConfig = Object.assign({}, threadObj)
            threadConfig.name = name
            threadConfig.description = desc
            threadConfig.image = image.file
            // Create thread, post config object and subscribe.
            let thread = await ThreeBox.createConfidentialThread(space, account, name, collectionType)
            let config = {type: 'config', content: threadConfig}
            await space.subscribeThread(thread._address)
            await thread.post(config)
            Mixpanel.track('NEW_COLLECTION');
            // Add thread to current threadsArray (reducer).
            thread.config = threadConfig
            let array = [...threadsArray]
            array.push(thread)
            dispatch(setThreadArray_Action(array.reverse()))
            props.onClose()
        }
    }

    const errorCodes = {
        name: 'A name is required for your space',
        desc: 'A description is required for your space'
    }

    return (
        <DrawerCont>          
            
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




