import styled from 'styled-components';


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