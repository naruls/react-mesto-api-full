import closeIcon from '../images/Close_Icon.svg';

function ImagePopup(props) {
  return (
    <section className={props.isOpen ? "popup popup_main popup_hidden popup_active" : "popup popup_main popup_hidden" }>
      <div className="popup__background popup__background_main"></div>
      <div className="popup__full"> 
        <button className="popup__close-button popup__close-button_main"><img src={closeIcon} className="popup__close-image" alt="кнопка" onClick={props.onClose}/></button>
        <img src={props.card.link} className="popup__card" alt="Увеличенное фото"/>
        <h2 className="popup__name">{props.card.name}</h2>
      </div>  
    </section>
  );
}

export default ImagePopup;
