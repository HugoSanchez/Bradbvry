import React, {useEffect, useState, Fragment} from 'react';
import {useSelector}  from "react-redux";
import {Mixpanel} from '../../utils';
import {ZoraSubGraph} from '../../constants'
import {zoraSubGraphByAddress} from '../../constants/queries';
import axios from 'axios';

import {
	Contain,
	MasonryCont,
} from './styles';

import {
	Header, 
	Masonry,
	LoadingCard, 
	ImageCard, 
} from '../../components';

export const Discover = props => {

	// Instantiate state.
	let [ownedItems, setownedItems] = useState([])
	let [creations, setcreations] = useState([])
	let [loading, setLoading] = useState(true)

    // Get user data from redux state.
    let provider = useSelector(state => state.user.provider)
    let address = useSelector(state => state.user.address)

    useEffect(() => {
		// Track event in Mixpanel.
		Mixpanel.track('DISCOVER');
	}, [])
	
	useEffect(() => {
		const queryNFTs = async () => {
			let query = zoraSubGraphByAddress()
			let {data} = await axios.post(ZoraSubGraph, {query})
			console.log('response: ', data.data)
			setcreations(data.data.user.creations)
			setownedItems(data.data.user.collection)
			setLoading(false)
		}
		queryNFTs()
    }, [])
    
    if (!loading) {
        return (
            <Fragment>
                <Header />
				<Contain>
					<MasonryCont>
						<Masonry gap={0} columns={3}>
							{
								creations.map(token => {
									return (
										<NFTWrapper 
											key={token.id} 
											token={token}/>
									)									
								})
							}
						</Masonry>
					</MasonryCont>	
				</Contain>
            </Fragment>
        );
    }

    else return (
        <div>
            <Header />
            <div className="Main">
                <LoadingCard />
            </div>
        </div>
    )
}




const NFTWrapper = props => {

	let [metadata, setMetadata] = useState(null)
	let [isError, setIsError] = useState(false)

	useEffect(() => {
		axios.get(props.token.metadataURI)	
			.then(res => {
				console.log('Metadata: ', res.data)
				setMetadata(res.data)
			})
	}, [])

	if (metadata && !isError) {

		let entry = {}
		entry.title = metadata.name		
		entry.type = metadata.mimeType
		entry.entry = props.token.contentURI
		entry.timestamp = props.token.createdAtTimestamp
		entry.description = metadata.description

		if (metadata.mimeType === "video/mp4") {
			return null
		}

		return (
			<div>
				<ImageCard 
					entry={entry} />
			</div>
		)
	}

	return <div></div>
}