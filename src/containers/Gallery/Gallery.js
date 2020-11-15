import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import Box from '3box';

import {
	LoadingCard, 
	Header, 
	SectionTitle, 
	SectionSubTitle, 
	GalleryCard
} from '../../components';

import {
	ColContainer,
} from './styles';

import { setUserIsLogged_Action } from '../../actions';

const { Magic } = require('magic-sdk');
const magic = new Magic(process.env.REACT_APP_MAGIC_API_KEY);

export const Gallery = props => {

	const dispatch = useDispatch()
	const [collectionsArray, setCollections] = useState([])

	useEffect(() => {
		checkIfLogged()
		handleCollectionLoad()
	}, [])

	const checkIfLogged = async () => {
		let isLogged = await magic.user.isLoggedIn();
		if (!isLogged) {dispatch(setUserIsLogged_Action({bool: isLogged}))}
		else {
			// await magic.user.logout()
			let data = await magic.user.getMetadata()
			let email = data.email
			let address = data.publicAddress
			dispatch(setUserIsLogged_Action({bool: isLogged, email, address}))
		}
	}

	const handleCollectionLoad = async () => {
		let galleryAddress = process.env.REACT_APP_COLLECTIONS_GALLERY
		let collections = await Box.getThreadByAddress(galleryAddress)
		console.log(collections)
		setCollections(collections)
	}

	if (collectionsArray.length === 0) {
		return <LoadingCard />
	}

    return (
		<div>
			<Header />
			<SectionTitle>Gallery</SectionTitle>
			<SectionSubTitle>Browse through some of the best Collections</SectionSubTitle>
			<ColContainer>
				
				{
					collectionsArray.map(col => {
						if (col.message.type) {
							return (
								<GalleryCard 
									key={col.postId}
									collection={col}/>
							)
						}
					})
				}
			</ColContainer>
		</div>
	)
}

