import React from 'react';

function Header(props) {
  return (
    <header className="header background">
      <div className="header__logo"></div>
      <div className="header__email">{props.currentEmail}</div>
      <div className="header__exit" onClick={props.signOut}>Выйти</div>
    </header>
  );
}

export default Header;
