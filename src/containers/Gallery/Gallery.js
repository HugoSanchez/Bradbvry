import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux';
import logo from '../../resources/favicon.png';
import {setInitialConfiguration_Action} from '../../actions';
import {LoadingCard, Header} from '../../components'
import Box from '3box';

import {} from './styles';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const Gallery = props => {

	const [collections, setCollections] = useState([])


	useEffect(() => {
		load3box()
	}, [])

	const threadObj = {
		type: 'config',
		content: {
			description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt',
			image: 'https://images.unsplash.com/photo-1604176514868-fac005d0584c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
			name: 'Test Collection',
			address: 'threadAddress'
		}
	}

	const load3box = async () => {
		// /orbitdb/zdpuAtDMPJT8Q43ZRabKGME5Lk3SxidXdKzJUJWrBpwFv71kH/3box.thread.bradbvry--main.bv_gallery
		let data        = await magic.user.getMetadata()
		let email       = data.email
		let address     = data.publicAddress
		// Instantiate 3Box space and threads.
		// Console.log each step for debugging (will delete someday).		
		let getCollections         = await Box.getThreadByAddress(process.env.REACT_APP_COLLECTIONS_GALLERY)
		console.log(getCollections)
		setCollections(getCollections)
	}

    return (
		<div>
			<Header />
			<h1>Hello World!</h1>
		</div>
	)
}

