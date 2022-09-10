import React, { Component } from 'react';
import starWarsIcon from '../images/Star_Wars_Logo.svg';
import '../styles/header.scss';

class Header extends Component {
  render() {
    return (
      <header className="header">
        <div>
          <img src={ starWarsIcon } alt="starWarsIcon" className="logo" />
        </div>
      </header>

    );
  }
}

export default Header;
