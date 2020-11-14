import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import logo from '../../resources/favicon.png';
import {setInitialConfiguration_Action} from '../../actions';
import {LoadingCard, Header, SpaceCard2, Title, Text, UserAvatar} from '../../components';
import Box from '3box';

import {ColTitle} from './styles';


export const Gallery = props => {

	const [collections, setCollections] = useState([])

	useEffect(() => {
		handleCollectionLoad()
	}, [])

	const handleCollectionLoad = async () => {
		// /orbitdb/zdpuAtDMPJT8Q43ZRabKGME5Lk3SxidXdKzJUJWrBpwFv71kH/3box.thread.bradbvry--main.bv_gallery
		//let data        = await magic.user.getMetadata()
		//let email       = data.email
		//et address     = data.publicAddress
		// Instantiate 3Box space and threads.
		// Console.log each step for debugging (will delete someday).		
		let getCollections         = await Box.getThreadByAddress(process.env.REACT_APP_COLLECTIONS_GALLERY)
		console.log(getCollections)
		setCollections(getCollections)
	}

    return (
		<div>
			<Header />
			<h1 className="collection-header">Gallery</h1>
			<h1 className="collection-header-2">Browse through some of the best Collections</h1>
			<div className="test">
				
				{
					collections.map(col => {
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
										<Text>{col.message.content.description}</Text>
											<UserAvatar imageIPFSaddress={false}/>
										<div className='avatar'></div>
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

