import React, {Fragment} from 'react';

import {
    Gn,
    Label,
    Optional,
} from './styles';

import {
    FileInput,
    NameInput,
    DescriptionInput,
} from '../../common';

export const UploadImageForm = props => {

    return (
            <Fragment>
                <Label><Gn>2.</Gn> Upload image</Label>
                <FileInput 
                    file={props.image}
                    accept="image/*"
                    onChange={(e) => props.onImageUpload(e)}
                />  
                <Label><Gn>3.</Gn> Choose a title 
                <Optional> (optional)</Optional></Label>
                <NameInput 
                    value={props.name}
                    maxLength="20"
                    onChange={(e) => props.setName(e.target.value)}
                />

                <Label><Gn>4.</Gn> Enter a brief description 
                <Optional> (optional)</Optional></Label>
                <DescriptionInput 
                    rows={3}
                    value={props.desc}
                    maxLength="140"
                    onChange={(e) => props.setDesc(e.target.value)}
                />
            </Fragment>               
    )
}