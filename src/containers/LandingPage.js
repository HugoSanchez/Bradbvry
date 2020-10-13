import React from 'react';
import {Link} from 'react-router-dom';
import {Mixpanel} from '../utils';
import {Header} from '../components/common/Header';

import main from '../resources/pablo-downloading.png';
import screenshot from '../resources/screenshot.png';
import privacy from '../resources/pablo-camera-access.png';
import terms from '../resources/pablo-basketball-game.png';
import beautiful from '../resources/pablo-augmented-reality.png'
import '../App.css';

const LandingPage = props => {

	Mixpanel.track('Landing visit');

    return (
        <div>
            <Header />
            <section className="presentation">
                <div className="introduction">
                    <div className="intro-text">
                        <h1>Create,</h1>
                        <h1>Store {"&"} Share.</h1>
                        <h1>Privately.</h1>
                        <p>
                            Bradbvry allows you to own and manage 
                            <span className="bold"> intimate private spaces </span> 
                            to store and share your creations.
                            <span className=""> We're starting with a text editor that is truly yours.</span> 

                        </p>
                    </div>
                    <div className="cta">
                        <Link to="/signin">
                            <button className="cta-add">Start Creating</button>
                        </Link>
                    </div>
                </div>
                <div className="cover">
                    <img src={main} alt="matebook" />
                </div>
            </section>

            <section className="presentation section final">
				<div className="screenshot">
					<img src={screenshot} alt="matebook" />
				</div>
				<div className="intro-text section text description">
					<p> <span className="bold">Bradbury is a web-based, personal text-editor that you really own, it's yours. </span>
						In the future, you will also store and share memories, pictures, documents or any other
						meaningful collection, on your terms. 
					</p>
				</div>
			</section>

			<section className="presentation section">
				<div className="introduction section">
					<div className="intro-text section">
						<h1>It's private.</h1>
						<p>
							Your data is encrypted with keys that you control, and stored in IPFS. 
							<span className="bold"> There is no way that we, or anyone else, can actually read any of your files</span> or entries.
						</p>
					</div>
				</div>
				<div className="cover section">
					<img src={privacy} alt="matebook" />
				</div>
			</section>

			<section className="presentation section">
				<div className="introduction section">
					<div className="intro-text section">
						<h1>It's on your terms</h1>
						<p>
							<span className="bold">You get to choose who gets to see what. </span>  Keep your files private, share them with your loved ones or even make them public. 
						</p>						
					</div>
				</div>
				<div className="cover section">
					<img src={terms} alt="matebook" />
				</div>
			</section>

			<section className="presentation section">
				<div className="introduction section">
					<div className="intro-text section">
						<h1>And it's beautiful!</h1>
						<p>
							Most text editors and online tools are just too ugly. We're trying to build a place where you feel inspired to create.<span className="bold"> Simple. Elegant. Easy.</span>
						</p>
					</div>
				</div>
				<div className="cover section">
					<img src={beautiful} alt="matebook" />
				</div>
			</section>

			<section className="presentation section final">
				<div className="intro-text section text final">
					<p>
						So far, Bradbvry is just an early experiment. We built it with the idea of exploring new digital interfaces for people to create, share and connect in new, much more deep and meaningful ways. 

						Please, feel free to reach out with any feedback, bugs or petitions here: hugo@bradbvry.com. Thanks!
					</p>

					<p>
						<span className="landing-footer-note">
						*Ilustrations by Ouch.pics: https://icons8.com
						</span>
					</p>
				</div>
			</section>
        </div>
    );
}

export default LandingPage;
