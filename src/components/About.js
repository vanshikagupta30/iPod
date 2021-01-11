import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons'
import MyImage from '../assets/images/my-image.jpg'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
class Settings extends React.Component {

   
  render () {
    return (
        <div className="full-screen">
            <img id='my-image' src={MyImage} alt='Vanshika' />
            <div >
              <p style={styles.myName}>Vanshika</p>
              <p className='icon'>
                <a href='https://contact.vanshikagupta@gmail.com' target='_blank' rel="noopener noreferrer"><FontAwesomeIcon icon={ faEnvelope } /></a>
                <a href='https://www.linkedin.com/in/vanshika-gupta-ab14491a2/' target='_blank' rel="noopener noreferrer"><FontAwesomeIcon icon={ faLinkedin } /></a>
                <a href='https://github.com/vanshikagupta30' target='_blank' rel="noopener noreferrer"><FontAwesomeIcon icon={ faGithub } /></a>
                <a href='https://instagram.com/_vanshika6405' target='_blank' rel="noopener noreferrer"><FontAwesomeIcon icon={ faInstagram } /></a>
              </p>
            </div>
        </div>
      );
  }
}

var styles = {
  myName:{
    marginLeft: 20
  }
}

export default Settings;
