import React from 'react';
// Subcomponents of screen
import Home from './Home';
import Game from './Game'
import Settings from './Settings';
import Music from './Music';
import Video from './Video';
import About from './About';
import Songs from './Songs';
import Artists from './Artists';
// Getting icons from Fontawesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronCircleRight } from '@fortawesome/free-solid-svg-icons'

class Screen extends React.Component {
   
  render () {
    const state = this.props.state;
    return (
        <div className="screen">

            {/* Left portion of the screen for rendering lists items of curret page */}
            <div className="left">
                <div id='title' > iPod</div>
                {state.currentList.map((item, index) => {
                    if (state.currentPage==='Songs' || state.currentPage==='Artists' ){
                        return null
                    }
                    if (state.activePos === index) {
                        return <li className='active' key={index}> 
                                    <span style={{ padding:10 }}>< FontAwesomeIcon icon={faChevronCircleRight} /></span> 
                                    {item} 
                                    {/* <span style={{ position:'absolute', right: 140}}>&gt;</span>  */}
                                </li>
                    } 
                    else {
                        return <li key={index}> {item} </li>
                    }
                })}
            </div>

            {/* Right portion of the screen */}
            <div className="right">
                <div >
                    {/* Displays the subcomponent of screen based on */}
                    {state.currentPage==='Home'     ? <Home />     : null}
                    {state.currentPage==='Music'    ? <Music />    : null}
                    {state.currentPage==='Video'    ? <Video />    : null}
                    {state.currentPage==='Game'     ? <Game />     : null}
                    {state.currentPage==='Settings' ? <Settings /> : null}
                    {state.currentPage==='About'    ? <About />    : null}
                    {state.currentPage==='Songs'    ? <Songs state={state} /> : null}  
                    {state.currentPage==='Artists'  ? <Artists state={state} /> : null}  
                </div>
            </div>

        </div>
      );
  }
}

export default Screen;
