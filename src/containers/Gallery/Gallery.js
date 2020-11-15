import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {setInitialConfiguration_Action} from '../../actions';
import {LoadingCard, Header, Title, Text, SectionTitle, SectionSubTitle, UserCard, GalleryCard} from '../../components';
import Box from '3box';

import {
	ColContainer,
	ColTitle
} from './styles';


export const Gallery = props => {

	const [collectionsArray, setCollections] = useState([])

	useEffect(() => {
		handleCollectionLoad()
	}, [])

	const handleCollectionLoad = async () => {
		let galleryAddress = process.env.REACT_APP_COLLECTIONS_GALLERY
		let collections = await Box.getThreadByAddress(galleryAddress)
		setCollections(collections)
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
								<GalleryCard collection={col}/>
							)
						}
					})
				}
			</ColContainer>
		</div>
	)
}

