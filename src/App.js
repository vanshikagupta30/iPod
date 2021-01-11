import React from 'react';
// Getting Screen component
import Screen from './components/Screen';
// Getting icons from Fontawesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faForward, faBackward, faPlay, faPause } from '@fortawesome/free-solid-svg-icons'
// Getting zingtouch library for gesture - rotate function
import ZingTouch from 'zingtouch';

// List items for each pages on screen
const Home = ['Music', 'Video' , 'Game' ,'Settings', 'About'];
const Music = ['Songs', 'Artists'];
const Video = [], Game = [], Settings = [], About = [];
// List of song names
const Songs = ['Eminem - Rap God', 'Imagine Dragons - Thunder', 'Luis Fonsi - Despacito ft. Daddy Yankee', 'Maroon 5 - Girls Like You ft. Cardi B', 'Sia - Cheap Thrills'];
const Artists = Songs;


class App extends React.Component {

    constructor () {
        super();
        this.state = {
            currentPage: 'Home',
            currentList: Home,
            activePos: 0,
            play: false,
            song: Songs[0]
        }
        // Maintains the current location 
        this.route = '/Home/'; 
        this.Lists = [Home, Music, Game, Settings, Songs, Artists, About];
        // For checking whether zingtouch gesture - rotate is binded or not
        this.binded = false;
        this.lis = document.querySelectorAll('.screen li');
        this.aud = document.querySelector('audio');
    }
   
    // Function to change the active element using zingtouch library
    rotate = () => {

        // Sets the wheel as target
        var target = document.getElementById('keys');
        var region = new ZingTouch.Region(target);
        var previousAngle = 0;

        // Binds the rotate gesture to the target
        if( !this.binded ){
            this.binded = true;
            region.bind(target, 'rotate', function(e) {
                previousAngle += e.detail.distanceFromLast;
                // Selects next or previous item from the list based on change in angle of the target
                if(previousAngle>60){
                    selectNext();
                    previousAngle=0;
                }else if(previousAngle<-60){
                    selectPrev();
                    previousAngle=0;
                }
            // console.log(e.detail.distanceFromLast ,previousAngle);
            });
        }

        // Increases the active postion value in state which rerenders the list 
        var selectNext = () => {
            this.lis = document.querySelectorAll('.screen li');

            // Verifies whether the active element is not the last element of the list
            if(this.lis.length === this.state.activePos+1){
                this.setState({ activePos: 0 });
            }
            else{
                this.setState({ activePos: this.state.activePos+1 });
            }
            // if(this.lis.length !== this.state.activePos+1){
            //     this.setState({ activePos: this.state.activePos+1 });
            // }
            // else{
            //     this.setState({ activePos: 0 });
            // }
        }

        // Decreases the active postion value in state which rerenders the list 
        var selectPrev = () => {
            this.lis = document.querySelectorAll('.screen li');

            // Verifies whether the active element is not the first element of the list
            if(0 === this.state.activePos){
                this.setState({ activePos: this.lis.length-1 });
            }
            else{
                this.setState({ activePos: this.state.activePos-1 });
            }
            // if(0 !== this.state.activePos){
            //     this.setState({ activePos: this.state.activePos-1 });
            // }
            // else{
            //     this.setState({ activePos: this.lis.length-1 });
            // }
        }

    }

    // Opens the selected page (by changing the state for rerendering the screen component)
    changeListToNext = () => {
        var listAvailable = true;
        var list = [];
        let selectedItem = this.state.currentList[this.state.activePos];
        if (selectedItem === 'Video'){
            if (this.aud)
                this.aud.pause();
            this.setState({
                play: false
            });
        }
        // Checks whether a list is available
        try {
            list = eval(selectedItem);
        } catch (err) {
            listAvailable = false;
        }
        // Updates the DOM Object
        this.lis = document.querySelectorAll('.screen li');
        if (this.lis.length!==0 && listAvailable){
            this.setState({
                currentPage: selectedItem,
                currentList: list,
                activePos: 0
            });
            this.route += selectedItem + '/';
        }
        console.log('route : ', this.route);
    }

    // Opens the previous page (by changing the state for rerendering the screen component)
    changeListToBack = () => {
        var route = this.route;
        var pos = route.indexOf(this.state.currentPage);
        // Finds the new route and new(previous) page by removing the current page name from the route
        route = route.slice(0, pos-1);
        var prev = route.slice(route.lastIndexOf('/')+1);
        var prevList = eval(prev);

        // Verifies that the current page is not Home and changes the state for rerendering the screen component
        if (prev.length > 0){
            this.route = route+'/';
            console.log(this.route);
            this.setState({ 
                currentPage: prev, 
                currentList: prevList, 
                activePos: prevList.indexOf(this.state.currentPage) 
            });
        }
    }

    // To play or pause the audio
    TogglePlayPauseMusic = () => {
        if (this.state.currentPage !== 'Video'){
            this.aud = document.querySelector('audio');
            if (!this.state.play) {
                // play and pause is the inbuild function in js
                this.aud.play();
                this.setState({ play: true });
            } else {
                this.aud.pause();
                this.setState({ play: false });
            }
        }
    }
    // Plays the selected song
    SelectMusic = () => {
        this.setState({
            song: Songs[this.state.activePos],
            // play: true,
            play: false
        }, () => {
            // this.aud = document.querySelector('audio');
            this.TogglePlayPauseMusic();
            // this.aud.play();
        })
    }
    // Plays the next song from the available songs list
    PlayNext = () => {
        let currentIndex = Songs.indexOf(this.state.song);
        let nextIndex = currentIndex+1;
        if (nextIndex === Songs.length){
            nextIndex = 0;
        }
        this.setState({
            song: Songs[nextIndex],
            // play:true,
            play: false
        }, () => {
            console.log('Hey I am here! on playNext');
            // this.aud = document.querySelector('audio');
            this.TogglePlayPauseMusic();
            // this.aud.play();
        })
    }
    // Plays the previous song from the available songs list
    PlayPrevious = () => {
        let currentIndex = Songs.indexOf(this.state.song);
        let prevIndex = currentIndex-1;
        if (prevIndex === -1){
            prevIndex = Songs.length-1;
        }
        this.setState({
            song: Songs[prevIndex],
            play: false
        }, () => {
            console.log('Hey I am here! on playPrevious');
            // this.aud = document.querySelector('audio');
            this.TogglePlayPauseMusic();
        })
    }


  render () {
    const {currentPage} = this.state;
    //   console.log('rendered');
    return (
        <div>
            <link href="https://fonts.googleapis.com/css2?family=Amaranth:wght@400&display=swap" rel="stylesheet" />
            
            <div className="main">

                <audio src={process.env.PUBLIC_URL + '/Audios/' + this.state.song +'.mp3'} />
                

                {/* Screen component */}
                <Screen state={this.state} />

                {/* Controls section */}
                <section className="navigator" onMouseOver={this.rotate}>

                    {/* Wheel with control buttons */}
                    <div id="keys">
                        
                        <div className="menu-btn" onTouchStart={this.changeListToBack} onClick={this.changeListToBack}>
                            MENU
                        </div>
                        <div className="fwd">
                            <FontAwesomeIcon icon={faForward} onClick={ this.state.currentPage === 'Songs' ?  this.PlayNext : null }/>
                        </div>
                        <div className="bkd">
                            <FontAwesomeIcon icon={faBackward} onClick={ this.state.currentPage === 'Songs' ?  this.PlayPrevious : null }/>       
                        </div>
                        <div className="play-pause">
                            {/* Dynamically interchanges the play and pause icon */}
                            { this.state.play 
                                ? <FontAwesomeIcon icon={faPause} onClick={this.TogglePlayPauseMusic}/> 
                                : <FontAwesomeIcon icon={faPlay} onClick={this.TogglePlayPauseMusic}/>
                            }
                        </div>
                    </div>

                    {/* Center Button */}
                    <div 
                        className="play" 
                        onClick={
                            // Calls the SelectMusic function only if the current page is Songs
                            this.state.currentPage === 'Songs' || this.state.currentPage === 'Artists'
                            ? this.SelectMusic
                            : this.changeListToNext
                        }>
                    </div>
                    
                </section>
            </div>
        </div>
      );
  }
}

export default App;