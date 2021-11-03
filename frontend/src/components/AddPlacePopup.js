import React from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {

  const [nameCard, setNameCard] = React.useState('');
  const [urlCard, setUrlCard] = React.useState('');

  function nameEnter(e) {
    setNameCard(e.target.value);
  }

  function urlEnter(e) {
    setUrlCard(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onAddNewCard({
      link: urlCard,
      name: nameCard,
    });
  }

  return (
    <PopupWithForm name="add" title="Новое место" formName="popupCardForm"  isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
      children={<>
        <input id="mesto-name" type="text" className="popup__input popup__input_mesto_name" name="mestoName" placeholder="Название"
        required minLength="2" maxLength="30" value={nameCard} onChange={nameEnter}/>
        <span id="mesto-name-error" className="popup__input-error"></span> 
        <input id="mesto-description" type="url" className="popup__input popup__input_mesto_link" name="mestoDescription"
        placeholder="Ссылка на картинку" value={urlCard} onChange={urlEnter} required/>
        <span id="mesto-description-error" className="popup__input-error"></span> 
      </>}
    />
  )
}

export default AddPlacePopup;