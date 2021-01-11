import React from 'react';


class Video extends React.Component {

  render () {
    return (
        <div className="full-screen ">
          <img src="https://lh3.googleusercontent.com/proxy/_kDf8o88PpVEU2--aPkw9RaaCMj3uLPq-ehtAIdFqaqlhgRs1CNPCFzGoIj4wMsHRxbnsnZ7p2YkIb_cqPdgPLa76CuBAdFKvzEGCrLTKTLC_6_mX7oa0avEndxDjUVEr8fM-vWFPz1Br0-Z940EIA"/>
            {/* <video src={process.env.PUBLIC_URL + '/Videos/'+ 'Fast and Furious.mp4' } autoPlay /> */}
        </div>
      );
  }
}

export default Video;
