import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTools } from '@fortawesome/free-solid-svg-icons'


class Settings extends React.Component {

  render () {
    return (
        <div className="full-screen bigger">
            < FontAwesomeIcon icon={faTools} />
        </div>
      );
  }
}

export default Settings;
