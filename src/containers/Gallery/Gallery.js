import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import {setInitialConfiguration_Action} from '../../actions';
import {LoadingCard, Header, SpaceCard2, Title, Text, SectionTitle, SectionSubTitle, UserCard} from '../../components';
import Box from '3box';

import {ColTitle} from './styles';


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
			<div className="test">
				
				{
					collectionsArray.map(col => {
						if (col.message.type) {
							return (
								<div className='public-card'>
									<img className="card-image" src={col.message.content.image}/>

									<div className='public-card-image'>
									</div>
									<div className='public-card-title'>
										<ColTitle>{col.message.content.name.replace(/-/g, ' ')}</ColTitle>
									</div>
									<div className='public-card-details'>
										<div className='description'>
											<Text>{col.message.content.description}</Text>
										</div>
										<div className='avatar'>
											<UserCard 
												user={col.author}
												placeholderColor={'rgba(235, 235, 235, 0.4)'}
											/>
										</div>
									</div>
								</div>
							)
						}
					})
				}
			</div>
		</div>
	)
}

