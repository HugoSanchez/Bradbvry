import React from 'react';
import styled from 'styled-components';

import {Row} from './Row';
import {Text} from './Text';

import {
    lightGray150,
    primaryGray45
} from '../../constants/colors';

export const CollectionTypeSel = props => {
    let {
        collectionType,
        setCollectionType
    } = props;

    return (
        <SpaceTypeBox>
        <SpaceType 
            color={ collectionType === 'public' ? primaryGray45 : null }
            onClick={() => setCollectionType('public')}>
            <Text
                color={lightGray150}
                fontWeight={collectionType === 'public' ? '500' : null}>
                    Public
            </Text>
        </SpaceType>
        <SpaceType
            color={ collectionType === 'members' ? primaryGray45 : null }
            onClick={() => setCollectionType('members')}>
            <Text
                color={lightGray150}
                fontWeight={collectionType === 'members' ? '500' : null}>
                    Members
            </Text>
        </SpaceType>
        <SpaceType
            color={ collectionType === 'private' ? primaryGray45 : null }
            onClick={() => setCollectionType('private')}>
            <Text
                color={lightGray150}
                fontWeight={collectionType === 'private' ? '500' : null}>
                    Private
            </Text>
        </SpaceType>
    </SpaceTypeBox>
    );
}

const SpaceTypeBox = styled(Row)`
    flex: 1;
`;

const SpaceType = styled(Row)`
    flex: 1;
    display: flex;
    height: 50px;
    align-items: center;
    justify-content: center;
    margin-left: 2%;
    margin-right: 2%;
    border-radius: 2px;
    cursor: pointer;
    background: ${props => props.color};
    &:hover{
        opacity: 0.7; 
    }
`;