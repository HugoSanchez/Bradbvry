import React from 'react';
import {Link} from 'react-router-dom';
import {Mixpanel} from '../utils';
import {Header} from '../components/common/Header';
import {JoinWaitlist} from '../components';

import main from '../resources/home.png';
import screenshot from '../resources/collection.png';
import '../App.css';

const LandingPage = props => {

	Mixpanel.track('LANDING_VISIT');

	let width = window.innerWidth > 500

    return (
        <div>
            <Header />
            <section className="presentation">
                <div className="introduction">
                    <div className="intro-text">

                        <h1>Create,</h1>
                        <h1>Store {"&"} Share,</h1>
                        <h1>On your terms.</h1>
                        <p>
							A NEW way to connect and share online where you are in control.
							Try it out!
                        </p>
                    </div>
                    <div className="cta">
                        <JoinWaitlist/>
                    </div>
                </div>
                <div className="main-screenshot">
                    <img src={screenshot} alt="matebook" />
                </div>
            </section>

			
				<section className="presentation section final">
					<div className="intro-text section text description">
						<p> 
							Built on IPFS and Ethereum, Bradbvry allows you to 
							share your last trip with your loved ones or follow your favorite creator 
							in a way that's<span className="bold"> intimate</span>, <span className="bold"> beatiful</span>, and <span className="bold">decentralized. </span>
						</p>
					</div>
						{
							width ? 
							<div className="screenshot">
								<img src={main} alt="matebook" />
							</div>
							:
							null
	
						}
				</section>
				
            
				{
					width ? 
					<section className="presentation section final footer">

					</section>
					:
					null

				}
	

        </div>
    );
}

export default LandingPage;
