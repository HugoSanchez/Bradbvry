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
	ImageCard2, 
	PlainTextCard,
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
						<Masonry gap={15} columns={3}>
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

	// This should be a separate component

	let [plainText, setplainText] = useState(false)
	let [metadata, setMetadata] = useState(null)
	let [isError, setIsError] = useState(false)

	useEffect(() => {
		const handleMeta = async () => {
			let res = await  axios.get(props.token.metadataURI)
			if (res.data.mimeType === "text/plain") {
				// This logic should move to PlainTextCard
				let text = await axios.get(props.token.contentURI)
				setplainText(text.data)
			}
			setMetadata(res.data)
		}
		handleMeta()
	}, [])

	if (metadata && !isError) {

		let entry = {}
		entry.token = props.token
		entry.title = metadata.name		
		entry.type = metadata.mimeType
		entry.entry = props.token.contentURI
		entry.timestamp = props.token.createdAtTimestamp
		entry.description = metadata.description

		if (metadata.mimeType === "video/mp4") {
			return null
		}

		if (metadata.mimeType === "text/plain") {
			return (
				<PlainTextCard 
					isNFT={true}
					entry={entry}
					text={plainText}/>
			)
		}

		return (
			<div>
				<ImageCard2 
					isNFT={true}
					entry={entry}
					isImage={true}
					text={plainText}/>
			</div>
		)
	}

	return <div></div>
}