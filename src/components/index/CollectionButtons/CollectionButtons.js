import React, {useEffect, useState}  from 'react';
import {useSelector} from 'react-redux';
import Box from '3box';

import {
    CircularButton,
    View
} from '../../common';


/**
 * @param {addMember} props: opens the Add Memeber drawer;
 * @param {addImage} props: opens the Add Image drawer;
 * @param {openEditor} props: navigates to Editor;
 * @param {activeThread} props: active thread;
 */


export const CollectionButtons = props => {

    const [isModerator, setIsModerator] = useState(false)
    const address = useSelector(state => state.user.data.address)
    const activeThread = useSelector(state => state.threads.activeThread)


    useEffect(() => {
        // Collection Buttons should only be rendered if user is moderator.
        // We check whether that is true and render accordingly.
        const checkModerators = async () => {
            let config = await Box.getConfig(address) 
            let did = config.spaces['bradbvry--main'].DID
            console.log(activeThread)
            let moderators = await activeThread.listModerators();
            let includes = moderators.includes(did) || moderators.includes(address)
            setIsModerator(includes)
        }
        checkModerators()
    },[address, props.activeThread])

    

    if (isModerator) {
        return (
            <View>
                <CircularButton
                userAdd
                size={'25px'}
                bottom={'26vh'} 
                onClick={() => props.addMember()}
                />
                <CircularButton
                    imageAdd
                    size={'25px'}
                    bottom={'18vh'} 
                    onClick={() => props.addImage()}
                />
                <CircularButton
                    quillPen
                    size={'25px'}
                    onClick={props.openEditor()}
                />
            </View>
        )
    }
    return null
}

