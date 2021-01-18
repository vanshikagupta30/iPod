import React from 'react';


class Artists extends React.Component {
   
  render () {
    const state = this.props.state;
    return (
      <div className="full-screen">
          <div>
            Artists
          </div>
          <ul className='songs-list'>
            {state.currentList.map((item, index) => {
              var artistName = item.slice(0,item.indexOf('-'));
              if (state.activePos === index ) 
                return <li className='active' key={index}> {artistName} </li>
              else
                return <li key={index} > {artistName} </li>
            })}  
          </ul> 
      </div>
      );
  }
}

export default Artists;

// Eminem - Rap God