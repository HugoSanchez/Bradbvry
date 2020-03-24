import React from 'react';
import styled from 'styled-components';

const View = styled.div`
    flex: ${props => props.flex ? props.flex : 1};
    margin: 2%;
`;

export {View};