import React from 'react';
import styled from 'styled-components';
import {device} from '../constants';
import ItemsCarousel from 'react-items-carousel';

import {
    useSelector
} from "react-redux";

import {
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

const ItemsContainer = React.memo((props) => {

    let items = useSelector(state => state.threads.itemsArray);
    let entries = items.filter(item => item.message.type === 'entry')
    let spaces = [1, 2, 3, 4, 5]

    return (
        <Container key={items.length}> 
            <Text>Your spaces</Text>
            <Underline />
            <Carousel>

                <SpaceCard onClick={() => console.log('Hello World')}>
                    <SpaceImage src="https://images.unsplash.com/photo-1512168203104-3910bc2bcd54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"/>
                    <TextBox>
                        <Title color={"white"}>Random Notes</Title>
                        <Text color={"white"}>Stories and pictures about different travels around the world.</Text>
                    </TextBox>
                </SpaceCard>

                <SpaceCard>
                    <SpaceImage src="https://images.unsplash.com/photo-1503075131240-fe4b3a7fa473?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"/>
                   <TextBox>
                        <Title color={"white"}>Kitch Essays</Title>
                        <Text color={"white"}>A collection of essays on the future of technology and society.</Text>
                    </TextBox>
                </SpaceCard>

                <SpaceCard>
                    <SpaceImage src="https://images.unsplash.com/photo-1534778061111-b71fa828e390?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                    <TextBox>
                        <Title color={"white"}>Another Space</Title>
                        <Text color={"white"}>An Awesome collection of short, crazy, stories - Charles Bukowski style.</Text>
                    </TextBox>
                </SpaceCard>

                <SpaceCard>
                    <SpaceImage src="https://images.unsplash.com/photo-1503075131240-fe4b3a7fa473?ixlib=rb-1.2.1&auto=format&fit=crop&w=668&q=80"/>
                    <TextBox>
                        <Title color={"white"}>Kitch Essays</Title>
                        <Text color={"white"}>A collection of essays on the future of technology and society.</Text>
                    </TextBox>
                </SpaceCard>

                <SpaceCard onClick={() => console.log('Hello World')}>
                    <SpaceImage src="https://images.unsplash.com/photo-1512168203104-3910bc2bcd54?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=668&q=80"/>
                    <TextBox>
                        <Title color={"white"}>Random Notes</Title>
                        <Text color={"white"}>Stories and pictures about different travels around the world.</Text>
                    </TextBox>
                </SpaceCard>

                <SpaceCard>
                    <SpaceImage src="https://images.unsplash.com/photo-1534778061111-b71fa828e390?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60"/>
                    <TextBox>
                        <Title color={"white"}>Another Space</Title>
                        <Text color={"white"}>An Awesome collection of short, crazy, stories - Charles Bukowski style.</Text>
                    </TextBox>
                </SpaceCard>

            </Carousel>    

            <Text>Latest entries</Text>
            <Underline />
            {
                entries.map((entry, index) => {
                    return  <ListItem key={index} item={entry} />
                })
            }
        </Container>
    );
});

const Container = styled(View)`
    flex: 6;
    overflow: hidden;
    @media ${device.mobileL} {
        padding-top: 30px;
    }
`;

const Carousel = styled(Row)`
    overflow: hidden;
    overflow-x: scroll;
    height: 290px;
    width: 100%;
    ::-webkit-scrollbar {
        display: none;
    }
`;

const SpaceCard = styled.div`
    width: 200px;
    height: 260px;
    margin-top: 0px;
    margin-right: 60px;
    display: flex;
    flex-direction: column;
	border-radius: 10px;
	
	background: black;
	position: relative;
	align-items: flex-end;
    transition: 0.4s ease-out;
    opacity: 0.8;
    box-shadow: 0px 7px 10px rgba(black, 0.5);

    &:hover{
        box-shadow: 0 0 10px rgba(0,0,0,0.2); 
        transform: translateY(5px);
    }
`;

const TextBox = styled(View)`
    width: 200px;
    padding: 1.5rem;
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
