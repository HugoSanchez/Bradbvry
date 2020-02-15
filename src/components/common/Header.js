import React, {useState} from 'react';
import logo from '../../resources/Bradbury.png'
import '../../App.css';

const Header = props => {

    const [active, setActive] = useState(false); 

    window.onscroll = function() {
        if(window.pageYOffset === 0) {setActive(false)} else {setActive(true)}
    };

    let imageIPFSaddress = "https://ipfs.io/ipfs/QmZua3V14oN5uak7ux23g3oqg7aZ7mmxXFoTUz76QeuTAd" 

    return (
        <div id="Header" className={active ? 'active' : null}>
            <img src={logo} id="Header-Image" alt=''/>
        </div>
    );
}

export default Header;
