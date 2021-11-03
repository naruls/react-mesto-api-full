import React from 'react';
import Card from './Card.js';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header.js';
import Footer from './Footer.js';


function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <>
    <Header currentEmail={props.currentEmail} signOut={props.signOut}/>
    <main className="container">
      {/*<PopupWithForm name="confirm" title="Вы уверены?" formName="popupFormConfirm"  isOpen={props.isConfirmOpen} onClose={props.onClose}
      />*/}
      <section className="profile background">
        <img src={currentUser.avatar} className="profile__avatar" alt="Жак-Ив Кусто"/>
        <div className="profile__frontground" onClick={props.onEditAvatar}></div>
        <div className="profile__info">
          <div className="profile__top-info">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button className="profile__change-button" type="button" onClick={props.onEditProfile}></button>
          </div>
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button className="profile__add-button" type="button" onClick={props.onAddPlace}></button>
      </section>
      <section className="elements background">
      </section>
      <div id="card-template">
        {props.cards.map((card) => (
          <Card card={card} onCardClick={props.onCardClick} key={card._id}  onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}/>
        ))}
      </div>
    </main>
    <Footer/>
    </>
  );
}

export default Main;