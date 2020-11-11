import React, {useState, useEffect} from 'react';
import {useHistory} from "react-router-dom";
import {useDispatch} from 'react-redux';
import logo from '../../resources/favicon.png';
import {setInitialConfiguration_Action} from '../../actions';
import {LoadingCard, Header, SpaceCard2, Title, Text, UserAvatar} from '../../components';
import Box from '3box';

import {ColTitle} from './styles';


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
							col.message.config = col.message.content
							return (
								<div className='public-card'>
									<img className="card-image" src={col.message.config.image}/>

									<div className='public-card-image'>
									</div>
									<div className='public-card-title'>
										<ColTitle>Collection</ColTitle>
									</div>
									<div className='public-card-details'>
										<Text>{col.message.config.description}</Text>
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

