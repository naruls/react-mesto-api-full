import closeIcon from '../images/Close_Icon.svg';

function PopupWithForm(props) {

  return (
    <section className={props.isOpen ? `popup popup_hidden popup_${props.name} popup_active` : `popup popup_hidden popup_${props.name}` }>
      <div className="popup__background"></div>
      <button type="button" className="popup__close-button popup__close-button-change"><img src={closeIcon} className="popup__close-image" alt="кнопка" onClick={props.onClose}/></button>
      <div className="popup__container">
        <h2 className="popup__info">{props.title}</h2>
        <form name={`${props.formName}`} className="popup__form form popup__info-form" noValidate onSubmit={props.onSubmit}>
          {props.children}
          <button className="popup__save-button popup__submit" type="submit" name="save-button">
            Сохранить
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
