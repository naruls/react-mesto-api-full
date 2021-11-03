import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function Card(props) {

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = props.card.owner._id === currentUser._id;
  const isLiked = props.card.likes.some(i => i._id === currentUser._id);

  const cardDeleteButtonClassName = (`${isOwn ? 'element__delete-button' 
  : 'element__delete-button element__delete-button_hidden'}`);
  const cardLikeButtonClassName = (`${isLiked ? 'element__like-button element__like-button_active'
  : 'element__like-button'}`);

  function handleCardClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleCardDelete() {
    props.onCardDelete(props.card);
  }

  return (
      <div className="element">
        <div className="element__image" style={{ backgroundImage: `url(${props.card.link})` }} onClick={handleCardClick}></div>
        <button type="button" className={cardDeleteButtonClassName} onClick={handleCardDelete}></button>
        <div className="element__bottom">
          <h2 className="element__name">{props.card.name}</h2>
          <div className="element__like-place">
            <button type="button" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
            <p className="element__like-count">{props.card.likes.length}</p>
          </div>
        </div>
      </div>
  );
}

export default Card;
