import React, {useEffect, useState} from 'react';
import {useSelector}  from "react-redux";
import {Mixpanel} from '../../utils';
import {Header} from '../../components/common/Header';
import {LoadingCard, ImageCard} from '../../components';
import {NFTSubGraph} from '../../constants'
import {theGraphQuery} from '../../constants/queries';
import axios from 'axios';
import Masonry from 'react-masonry-css';

export const Discover = props => {

	// Instantiate state.
	let [tokens, setTokens] = useState([])
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
			let query = theGraphQuery()
			let {data} = await axios.post(NFTSubGraph, {query})
			setTokens(data.data.tokens)
			setLoading(false)
			console.log('response: ', data.data.tokens)
		}
		queryNFTs()
    }, [])
    
    if (!loading) {
        return (
            <div>
                <Header />
                <div className="Main">
					<Masonry
						breakpointCols={window.innerWidth < 550 ? 2 : 3}
						className="my-masonry-grid"
						columnClassName="my-masonry-grid_column">
							{
								tokens.map(token => {
									return (
										<NFTWrapper 
											key={token.id} 
											token={token}/>)
								})
							}
					</Masonry>	
                </div>
            </div>
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

	let [token, setToken] = useState(null)

	useEffect(() => {
		axios.get(props.token.tokenURI)	
			.then(res => {
				setToken(res.data)
			})
	}, [])

	const getImageUrl = (token) => {
		
		if (props.token.contract.name === 'Rarible') {
			return 'https://ipfs.io/' + token.image.substring(7)
		}

		return token.image
	}

	if (token) {
		let entry = {}
		let image = getImageUrl(token)

		entry.entry = image
		entry.title = token.name
		entry.description = token.description

		return <ImageCard entry={entry} />
	}
	return <div></div>
}