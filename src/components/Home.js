import React, {Component}       from 'react';
import {PointSpreadLoading}     from 'react-loadingg';
import CircularButton           from './common/CircularButton';
import ItemsContainer           from './ItemsContainer';
import InstallMetamask          from './InstallMetamask';
import ProfileCard              from './ProfileCard';
import Header                   from './common/Header';
import Box                      from '3box';
import '../App.css';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {
            items: [],
            loading: true,
            date: new Date(),
            renderMetamask: false,
        }
    }

    async componentDidMount(){
        await this.handleMetamaskException()
        await this.fetchUserProfile()
    }

    async handleMetamaskException(){
        if (typeof window.ethereum == 'undefined') {
            console.log('Here')
        this.setState({renderMetamask: true})} 
    }
    
    async fetchUserProfile(){
        let accounts    = await window.ethereum.enable();
        let box         = await Box.openBox(accounts[0], window.ethereum)
        let space       = await box.openSpace('bradbvry--main')
        let profile     = await Box.getProfile(accounts[0])
        let rawitems    = await space.private.all()
        let parseditems = await this.parseSpaceItems(rawitems)

        this.setState({
            loading: false,
            accounts: accounts, 
            items: parseditems,
            profile, 
            space,
            box 
        }) 
    }

    async parseSpaceItems(items){
        let array = [];
        for (let item in items) {
             let object = {}
             let element = items[item]
             let parsedEl = JSON.parse(element)
             object[item.toString()] = parsedEl
             array.push(object)       
        }
        return array;
    }

    render() {

        const {
            items, 
            profile,
            loading, 
        } = this.state
        
        return (
            <div className="App">
                <Header />
                <div className="Main">

                    {!loading && <ItemsContainer items={items} />}
                    {loading && <PointSpreadLoading color={"rgb(190, 235, 194)"} />}
                    {
                    // profile && <ProfileCard profile={profile} />
                    }

                    {
                        !loading && 
                            <CircularButton 
                            plus={true} 
                            path="/editor"
                            iconId="home-add-entry-circular-button-icon"
                            buttonId="home-add-entry-circular-button"
                        />
                    }
                    
                </div>
            </div>
        );
    }
}

export default Home;

