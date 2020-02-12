import React, {Component} from 'react';
import clipUploading from '../resources/clipUploading.png';
import Button from './common/Button';
import Header from './common/Header';
import Box from '3box';
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
        this.setState({profile, space, items: parseditems}) 
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
                <img src={clipUploading} id="Modal-Image" />
                <h1 id="empty-home-title">Hi there!</h1>
                <p id="empty-home-text">It appears that you haven't saved any entries yet.</p>
                <p id="empty-home-text-2"> Click on the button below to start creating new memories.</p>
                <Button id="empty" path={"/editor"} text="New entry" onClick={() => null}/>
            </div>
        );
    }

    _renderItemArray() {
        return (
            <div className="Modal">
                {   
                    this.state.items.map(item => {
                        console.log('Hurra!')
                    })                        
                }
            </div>
        )
    }

    render() {
        
        return (
            <div className="App">
                <Header />
                <div className="Main">
                    
                    <div className="profile-card">
                        <h1>Profile</h1>
                    </div>

                    <div className="item-container"> 
                        <p className="list-title">Latest stories</p>
                        <p className="list-title-underscore"></p>
                
                        <div className="item-card">
                            <div className="item-card-date-box">
                                <p className="item-card-day">{ this.state.date.getDay() }</p>
                                <p className="item-card-month-and-year">FEB</p>
                            </div>
                            <h1 className="item-card-title">On the Origin of Stories</h1>
                            <p className="item-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut verat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a elit aliquam, In a elit aliquam, In a elit aliquam, vulputate leo quis, sodales massa. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                        </div>

                        <div className="item-card">
                            <div className="item-card-date-box">
                                <p className="item-card-day">{ this.state.date.getDay() }</p>
                                <p className="item-card-month-and-year">FEB</p>
                            </div>
                            <h1 className="item-card-title">On the Origin of Stories</h1>
                            <p className="item-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut verat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a elit aliquam, In a elit aliquam, In a elit aliquam, vulputate leo quis, sodales massa. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                        </div>

                        <div className="item-card">
                            <div className="item-card-date-box">
                                <p className="item-card-day">{ this.state.date.getDay() }</p>
                                <p className="item-card-month-and-year">FEB</p>
                            </div>
                            <h1 className="item-card-title">On the Origin of Stories</h1>
                            <p className="item-card-body">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut verat. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit. In a elit aliquam, In a elit aliquam, In a elit aliquam, vulputate leo quis, sodales massa. Interdum et malesuada fames ac ante ipsum primis in faucibus.</p>
                        </div>


                        
                    </div>
                    
                </div>
            </div>
        );
    }
}

export default Home;

