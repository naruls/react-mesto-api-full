import React from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) {

  const avatarRef = React.useRef(); 

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  } 


  return (
  <PopupWithForm name="avatar" title="Обновить аватар" formName="popupAvatarForm"  isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}
    children={<>
      <input id="avatar-description" type="url" className="popup__input popup__input_avatar_link" name="avatarDescription" placeholder="Ссылка на картинку" ref={avatarRef} required/>
      <span id="avatar-description-error" className="popup__input-error"></span> 
    </>}
  />
  )
}

export default EditAvatarPopup;