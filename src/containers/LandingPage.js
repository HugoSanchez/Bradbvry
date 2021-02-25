import React from 'react';
import {Link} from 'react-router-dom';
import {Mixpanel} from '../utils';
import {Header} from '../components/common/Header';

import main from '../resources/home.png';
import screenshot from '../resources/collection.png';
import privacy from '../resources/pablo-camera-access.png';
import terms from '../resources/pablo-basketball-game.png';
import beautiful from '../resources/pablo-augmented-reality.png'
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
                            Bradbvry allows you to
							<span className="bold"> own intimate collections </span>
                            to store and share your digital creations.
                        </p>
                    </div>
                    <div className="cta">
                        <Link to="/signin">
                            <button className="cta-add">Get started</button>
                        </Link>
                    </div>
                </div>
                <div className="main-screenshot">
                    <img src={screenshot} alt="matebook" />
                </div>
            </section>

			
				<section className="presentation section final">
					<div className="intro-text section text description">
						<p> This is where you<span className="bold"> store and share the things you want to keep forever. </span>
							It's also a new way to connect and share online where users are in control. It feels<span className="bold"> intimate</span>, it's<span className="bold"> beatiful</span> and <span className="bold">decentralized. </span>
							Try it out!
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
						<div className="intro-text section text final footer">
							<p>
								This is Bradbvry's MVP, please use it with caution and at your own risk. 

								Also, feel free to reach out with any feedback, bugs or petitions here: hugo@bradbvry.com. Thanks! :)
							</p>
						</div>
					</section>
					:
					null
				}

			
        </div>
    );
}

export default LandingPage;
