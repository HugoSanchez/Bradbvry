import React, {useState} from 'react';

import {
    Gn,
    Note,
    Label,
    ModalTitle,
    FormBodyBox,
    Button,
} from './styles';

import {
    NameInput,
    DrawerCont,
} from '../../common';

export const AddMemberForm = props => {

    let [email, setEmail] = useState('')


    const handleFormSubmit = async () => {

        props.onClose()
    }

    return (
        <DrawerCont>          
            <ModalTitle>
                Add Member
            </ModalTitle>

            <Note>
                Collections are invite-only. To share your collection, please type the email of the person you want to share this collection with.
            </Note>

            <FormBodyBox>
                <Label><Gn>1.</Gn> Enter member's email </Label>
                <NameInput 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}/> 

            <Button onClick={handleFormSubmit}/>
            </FormBodyBox>               
        </DrawerCont>
    )
}




