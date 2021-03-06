import React from 'react';

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

    if (props.isOwner) {

        return (
            <View>

                <CircularButton
                userAdd
                size={'25px'}
                bottom={'18vh'} 
                onClick={() => props.addMember()}
                />

                <CircularButton
                    quillPen
                    size={'25px'}
                    onClick={props.openEditor()}
                />

                <CircularButton
                    imageAdd
                    size={'25px'}
                    bottom={'26vh'} 
                    onClick={() => props.addImage()}
                />

            </View>
        )
    }

    return null
}


/**
 *              
 */
