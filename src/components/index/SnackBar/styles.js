import {Text} from '../../common';
import styled from 'styled-components';


export const MessageBox = styled.div`
    min-height: 20px;
    min-width: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${props => props.success ? '#C5FFDC' : 'rgb(254, 200, 200)'};
`;

export const SnackText = styled(Text)`
	font-weight: 500;
	margin-top: 3%;
	margin-bottom: 3%;  
`;