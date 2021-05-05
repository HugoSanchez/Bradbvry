import styled from 'styled-components';
import {Text} from '../../components';

export const DropZoneCont = styled.div`
	height: ${window.innerHeight}px;

	&:focus {
		outline: none;
	}
`;

export const MoreOptionsPositioner = styled.div`
	position: fixed;
	top: 14vh;
	right: 3vw;
	width: 3rem; 
    height: 3rem; 
	border-radius: 1.5rem;
	display: flex;
	align-items: center;
	justify-content: center;
	&:hover{
        box-shadow: 0 0 10px rgba(0,0,0,0.1); 
    }
`;

export const MessageBar = styled.div`
	display: flex;
	align-items: center;
	justify-content: center;
	position: fixed;
	top: 0px;
	width: 100%;
	height: 60px;
	background: rgba(237, 202, 142, 0.8);
	z-index: 16;
`;

export const WarningText = styled(Text)`
	font-weight: 500;
`;

export const CloseBox = styled.div`
	position: absolute;
	top: 0px;
	right: 10px;
	width: 60px;
	height: 60px; 
	display: flex;
	align-items: center;
	justify-content: center;
	border: 1px solid black;
`;