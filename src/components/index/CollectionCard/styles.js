import styled from 'styled-components';
import {View, Title, Text} from '../../common';

export const SpaceCardContainer = styled.div`
    width: 200px;
    height: 260px;
    margin-top: 0px;
    margin-right: 60px;
    margin-bottom: 60px;
    display: flex;
    flex-direction: column;
	border-radius: 10px;
	overflow: hiddden;
    overflow-wrap: break-word;
	background: white;
	position: relative;
	align-items: flex-end;
    transition: 0.6s ease-out;
    
    opacity: 0.8;
    box-shadow: 0px 7px 10px rgba(0,0,0,0.1);

    &:hover{
        box-shadow: 0px 0px 5px rgba(0,0,0,0.2); 
        transform: translateY(5px);
    }
`;

export const SpaceTitle = styled(Title)`
    text-transform: capitalize; 
    font-size: 30px;
`

export const TextBox = styled(View)`
    width: 200px;
    padding: 8%;
    
`;

export const SpaceImage = styled.img`

    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 10px;
    
    &:hover{
        opacity: 0.2; 
		transition: 0.7s;
    }
`;