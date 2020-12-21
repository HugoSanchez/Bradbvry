import React, {useState} from 'react';
import {handleCreateCollection_Action} from '../../../actions';

import {
    useSelector,
    useDispatch
} from "react-redux";

import {
    Gn,
    Label,
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
    Mixpanel
} from '../../../utils';


export const NewCollectionForm = props => {

    let errorObj = {name: null, desc: null}
    
    let [name, setName] = useState('')
    let [desc, setDesc] = useState('')
    let [image, setImage] = useState(false)
    let [error, setError] = useState(errorObj)
    let [loading, setLoading] = useState(false)
    let [collectionType, setCollectionType] = useState('private')

    const dispatch = useDispatch()
    const client = useSelector(state => state.user.client);
    const account = useSelector(state => state.user.address);
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
            handleCreateCollection()
        }
    }

    const handleCreateCollection = async () => {
        // Parse thread name and config object
        let threadConfig = parseCollectionConfigObject()

        dispatch(handleCreateCollection_Action(threadConfig))

        /**
            // Either create confidential or create public thread
            let thread
            if (collectionType === 'private' || collectionType === 'members') {
                // Handle confidential thread
                thread = await ThreeBox.createConfidentialThread(client, account, name, collectionType)
                let config = {type: 'config', content: threadConfig}
                await thread.post(config)
            }
            else {
                // Handle public thread
                thread = await ThreeBox.createPublicThread(client, account, name)
                threadConfig.address = thread._address
                let config = {type: 'config', content: threadConfig}
                await thread.post(config)
                console.log('here')
                let gallery = await client.joinThreadByAddress(process.env.REACT_APP_COLLECTIONS_GALLERY)
                console.log('there')
                await gallery.post(config)
                console.log('1')
            }
            // Track event and update global state.        
            Mixpanel.track('NEW_COLLECTION');
            parseThreadAndUpdateState(thread, threadConfig)
         */
        
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

    console.log('Width: ', window.innerWidth) 

    return (
        <DrawerCont width={window.innerWidth}>     
            <CloseTab
                onClick={() => props.onClose()}>
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




