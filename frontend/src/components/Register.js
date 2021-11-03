import React from 'react';
import { Link, withRouter } from 'react-router-dom'; 

function Register(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');


  function emailEnter(e) {
    setEmail(e.target.value);
  }

  function passwordEnter(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.regiserAuth(email, password);
  }

  return (
    <>
      <header className="header background">
        <div className="header__logo"></div>
        <Link to="sign-in" className="header__loginButton">Войти</Link>
      </header>
      <main className="sign">
        <div className="sign__window">
          <h2 className="sign__name">Регистрация</h2>
          <form className="sign__form" onSubmit={handleSubmit}>
            <input type="email" className="sign__email" placeholder="Email" value={email} onChange={emailEnter} required />
            <input type="password" className="sign__password" placeholder="Пароль" value={password} onChange={passwordEnter} required />
            <button className="sign__button">зарегистрироваться</button>
          </form>
          <p className="sign__inform">Уже зарегистрированы? <Link to="sign-in" className="sign__inform-link">Войти</Link></p>
        </div>
      </main>
    </>
  );
}

export default withRouter(Register); 