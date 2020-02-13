import React, {Component} from 'react';
import ItemsContainer     from './ItemsContainer';
import clipUploading      from '../resources/clipUploading.png';
import CircularButton     from './common/CircularButton';
import Button             from './common/Button';
import Header             from './common/Header';
import Box                from '3box';
import '../App.css';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            date: new Date(),
            items: [],
            renderMetamask: false,
        }
    }

    async componentDidMount(){
        await this.handleMetamaskException()
        await this.fetchUserProfile()
    }

    async handleMetamaskException(){
        if (typeof window.ethereum == 'undefined') {
        this.setState({renderMetamask: true})} 
    }
    
    async fetchUserProfile(){
        let accounts    = await window.ethereum.enable();
        let box         = await Box.openBox(accounts[0], window.ethereum)
        let space       = await box.openSpace('bradbvry--main')
        let profile     = await Box.getProfile(accounts[0])
        let rawitems    = await space.private.all()
        let parseditems = await this.parseSpaceItems(rawitems)
        this.setState({accounts: accounts, profile, space, items: parseditems}) 
    }

    async parseSpaceItems(items){
        let array = [];
        for (let item in items) {
             let object = {}
             let element = items[item]
             let parsedEl = JSON.parse(element)
             object.item = parsedEl[0]
             array.push(object)
        }
        return array;
    }


    _renderEmptyHome() {
        return (
            <div className="Modal">
                <img src={clipUploading} id="Modal-Image" alt=""/>
                <h1 id="empty-home-title">Hi there!</h1>
                <p id="empty-home-text">It appears that you haven't saved any entries yet.</p>
                <p id="empty-home-text-2"> Click on the button below to start creating new memories.</p>
                <Button id="empty" path={"/editor"} text="New entry" onClick={() => null}/>
            </div>
        );
    }

    render() {
        
        return (
            <div className="App">
                <Header />
                <div className="Main">
                    
                    <div className="profile-card">
                         {this.state.profile ? 
                        <div>
                            <h3>{this.state.profile.name }</h3>
                            <h5>{this.state.profile.description}</h5>
                            <img src={this.state.profile.image} id="" alt=''/>
                        </div>
                         : 
                         null
                         } 
                    </div>

                    {
                        this.state.items.length < 0 ?
                        null :
                        <ItemsContainer items={this.state.items}/>
                    }

                    <CircularButton 
                        plus={true} 
                        path="/editor"
                        iconId="home-add-entry-circular-button-icon"
                        buttonId="home-add-entry-circular-button"/>
                </div>
            </div>
        );
    }
}

export default Home;

