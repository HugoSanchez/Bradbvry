import React, {useState, Fragment} from 'react';
import {useDispatch} from "react-redux";
import {handleSaveImage_Action} from '../../../actions';
import {getBase64} from '../../../utils';

import {
    Gn,
    Label,
} from './styles';

import {
    FormButton,
    FileInput,
    NameInput,
    DescriptionInput,
} from '../../common';

export const UploadImageForm = props => {

    return (
            <Fragment>
                <Label><Gn>2.</Gn> Choose a title </Label>
                <NameInput 
                    value={props.name}
                    maxLength="20"
                    onChange={(e) => props.setName(e.target.value)}/>

                <Label><Gn>3.</Gn> Enter a brief description</Label>
                <DescriptionInput 
                    rows={3}
                    value={props.desc}
                    maxLength="140"
                    onChange={(e) => props.setDesc(e.target.value)}/>

                <Label><Gn>4.</Gn> Upload image</Label>
                <FileInput 
                    file={props.image}
                    onChange={(e) => props.onImageUpload(e)}
                />  
            </Fragment>               
    )
}