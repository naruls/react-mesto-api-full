import closeIcon from '../images/Close_Icon.svg';
import succesReg from '../images/succesReg.svg';
import unsuccesReg from '../images/unsuccesReg.svg';

function InfoTooltip(props) {

  return (
    <section className={props.isInfoTooltipOpen ? `popup` : ` popup popup_hidden` }>
    <div className="popup__background"></div>
      <button type="button" className="popup__close-button"><img src={closeIcon} className="popup__close-image" alt="кнопка" onClick={props.onClose}/></button>
      <div className="popup__InfoTooltip-block">
        <img className="popup__InfoTooltip-icon" src={props.succesRegister ? `${succesReg}` : `${unsuccesReg}`}
        alt={props.succesRegister ? `Успешная регистрация` : `Неуспешная регистрация`}/>
        <p className="popup__InfoTooltip-text">{props.succesRegister ? `Вы успешно зарегистрировались!` : `Что-то пошло не так! Попробуйте ещё раз.`}</p>
      </div>
    </section>
  );
}

export default InfoTooltip;
