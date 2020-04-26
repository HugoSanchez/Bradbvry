import React from 'react';
import styled from 'styled-components';
import {device} from '../constants';

import {
    useSelector
} from "react-redux";

import {
    EmptyHome,
    ListItem
} from './index';

import {
    Underline,
    Title,
    Text,
    View,
    Row
} from './common';

/**
 * This component is just a container containing an iterator.
 * @param {item}: the item to pass on from parent to ListItem
 * @param {index}: item index. 
 */

const ItemsContainer = props => {

    let items = useSelector(state => state.user.data.parsedItems);

    if (items.length < 1) {
        return <EmptyHome />
    }

    else {
        return (
            <Container key={items.length}> 

                <Row>
                    <SpaceCard onClick={() => console.log('Hello World')}>
                        <SpaceImage src="https://images.unsplash.com/photo-1512168203104-3910bc2bcd54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"/>
                            <Title color={"white"}>Random Notes</Title>
                            <Text color={"white"}>Stories and pictures about different travels around the world.</Text>
                    </SpaceCard>

                    <SpaceCard>
                        <SpaceImage src="https://images.unsplash.com/photo-1503075131240-fe4b3a7fa473?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"/>
                        <Title color={"white"}>Kitch Essays</Title>
                        <Text color={"white"}>A collection of essays on the future of technology and society.</Text>
                    </SpaceCard>

                    <SpaceCard>
                        <SpaceImage src="https://images.unsplash.com/photo-1534778061111-b71fa828e390?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                        <Title color={"white"}>Another Space</Title>
                        <Text color={"white"}>An Awesome collection of short, crazy, stories - Charles Bukowski style.</Text>
                    </SpaceCard>
                </Row>

                <Text>Latest stories</Text>
                <Underline />
                {
                    items.map((item, index) => {
                        return  <ListItem key={index} item={item} />
                    })
                }
            </Container>
        );
    }
}

const Container = styled(View)`
    flex: 6;
    padding-top: 35px;
    @media ${device.mobileL} {
        padding-top: 30px;
    }
`;

const SpaceCard = styled.div`
    width: 200px;
    height: 260px;
    margin-top: 0px;
    margin-right: 30px;
    margin-left: 30px;
    margin-bottom: 30px;
    display: flex;
    flex-direction: column;
	border-radius: 10px;
	padding: 1.5rem;
	background: black;
	position: relative;
	display: flex;
	align-items: flex-end;
    transition: 0.4s ease-out;
    opacity: 0.8;
    box-shadow: 0px 7px 10px rgba(black, 0.5);

    &:hover{
        box-shadow: 0 0 10px rgba(0,0,0,0.2); 
        transform: translateY(5px);
    }
`;

const SpaceInfo = styled.div`
`;


const SpaceImage = styled.img`

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

export default ItemsContainer;
