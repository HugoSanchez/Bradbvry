import React from 'react';
import styled from 'styled-components';

import {Text} from './Text';
import {primaryGray85, primaryGreen} from '../../constants/colors';

export const FileInput = props => {
    let {
        file,
        accept,
        onChange
    } = props;

    return (
        <FileInputBox file={file}>
            <TextDiv>
                <InputText file={file}> 
                    { 
                        file ? file.name : `No file chosen` 
                    }
                </InputText>
            </TextDiv>

            <InputTypeFile 
                accept={accept}
                onChange={onChange} />
        </FileInputBox>
        
    );
}

const FileInputBox = styled.div`
    margin-right: 2%;
    margin-left: 2%;
    height: 50px;
    border-radius: 3px;
    background: rgb(30,30, 30);
    border-style: ${ props => props.file ? `solid` : `dashed`};
    border-color: ${ props => props.file ? primaryGreen : primaryGray85};
    border-width: 2px;
    position: relative;
`;

const TextDiv = styled.div`
    width: 100%;
    height: 100%;
    opacity: 0.9;
    display: flex;
    justify-content: center;
    align-items: center;
`;

const InputText = styled(Text)`
    z-index: -1; 
    color: ${props => props.file ? primaryGreen : null};   
    font-style: ${props => props.file ? null : `italic`};
    font-weight: ${props => props.file ? `500` : null};
`;

const InputTypeFile = styled.input.attrs({ type: 'file' })`
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    cursor: pointer;
    z-index: 10;
`;