import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function EditProfilePopup(props) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description, setDescription] = React.useState('');

  function nameChange(e) {
    setName(e.target.value);
  }
  function descriptionChange(e) {
    setDescription(e.target.value);
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [props.isOpen, currentUser]); 

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser({
      name,
      about: description,
    });
  } 

  return (
  <PopupWithForm name="change" title="Редактировать профиль" formName="popupForm"  isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
    children={<>
      <input id="profile-name" type="text" className="popup__input popup__input_user_name" name="name" required minLength="2"
      maxLength="40" value={name ? name : ""} onChange={nameChange}/>
      <span id="profile-name-error" className="popup__input-error"></span> 
      <input id="profile-description" type="text" className="popup__input popup__input_user_description" name="description" 
      required minLength="2" maxLength="200" value={description ? description : ""} onChange={descriptionChange}/>
      <span id="profile-description-error" className="popup__input-error"></span> 
    </>}
  />
  )
}

export default EditProfilePopup;