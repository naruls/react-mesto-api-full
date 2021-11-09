import React from 'react';
import Main from './Main.js';
import Login from './Login.js';
import Register from './Register.js';
import api from '../utils/Api';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import ProtectedRoute from "./ProtectedRoute";
import InfoTooltip from "./InfoTooltip";
import * as mestoAuth from '../utils/Auth.js';
import ImagePopup from './ImagePopup.js';

import {  Route, Redirect, Switch, withRouter, useHistory } from 'react-router-dom';


import { CurrentUserContext } from '../contexts/CurrentUserContext';



function App(props) {
  const [currentEmail, setCurrentEmail] = React.useState('');
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  /*const [isConfirmPopupOpen, setConfirmPopupOpen] = React.useState(false);*/
  const [isImagePopupOpen, setImagePopupOpen] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState({});
  const [selectedCard, setSelectedCard] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [succesRegister, setSuccesRegister] = React.useState(false);
  const [isInfoTooltipOpen, setInfoTooltipOpen] = React.useState(false);

  const history = useHistory();


    const checkToken = React.useCallback(() => {
        const token = localStorage.getItem('token');
        if(token){
        mestoAuth.getContent(token).then(
            (data) => {
                console.log(data)
                handleLogin(true);
                setCurrentEmail(data.message.email);
                history.push('/');
            })
            .catch((err) => { console.log(err); }
            );
        }
    }, []);


    React.useEffect(() => {
            checkToken();
    }, [checkToken]);




  React.useEffect(() => {
      const token = localStorage.getItem('token');
      api.getUserInfo(token)
        .then((data)=>{
          setCurrentUser( {...data.message} );
        })
        .catch((err) => {
          console.log(err)
        });
    }, []);


  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  /*function handleConfirmClick() {
      setConfirmPopupOpen(true);
  }*/

 function handleLogin() {
    setLoggedIn(true);
  } 

  function handleCardClick(card) {
    setSelectedCard(card);
    setImagePopupOpen(true);
  }

  function closeAllPopups() {
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setAddPlacePopupOpen(false);
    setImagePopupOpen(false);
    /*setConfirmPopupOpen(false);*/
    setInfoTooltipOpen(false);
    setSelectedCard({});
  }

  function handleUpdateUser(data) {
    api.setUserInfo(data, localStorage.token)
      .then(
      (data) => {
        console.log(data.data)
        setCurrentUser(data.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleUpdateAvatar(data) {
    api.setUserAvatar(data, localStorage.token)
      .then(
      (data) => {
        setCurrentUser(data.data);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleAddPlaceSubmit(data) {
    api.postCard(data, localStorage.token)
      .then(
      (data) => {
        setCards([data.data, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [cards , setCards ] = React.useState([]);

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    api.getInitialCards(token)
      .then((data)=>{
      setCards([...data.data])
    })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some((i) => i === currentUser._id);
   
    api.changeLikeCardStatus(card._id, !isLiked, localStorage.token)
      .then((newCard) => {
        const data = newCard.data
        const newCards = cards.map((item) => (item._id === card._id ? data : item));
        setCards(newCards);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id, localStorage.token)
    .then((data) => {
      setCards((state) => state.filter((c) => c !== card));
    })
    .catch((err) => {
      console.log(err);
    });
  }

  function signOut(){
    localStorage.removeItem("token");
    history.push('/sign-in');
  }

  function loginAuth(email, password){
    mestoAuth.authorize(email, password).then((data) => {
    if (data.token) {
      setCurrentEmail(email);
      handleLogin();
      history.push('/mesto');
    }
  })
  .catch(err => console.log(err));
  }

  function regiserAuth(email, password){
    mestoAuth.register(email, password).then((res) => {
      if(res){
        history.push('/sign-in');
        setInfoTooltipOpen(true);
        setSuccesRegister(true);
        }
      else{
        setInfoTooltipOpen(true);
        setSuccesRegister(false);
      }
    })
    .catch((err) =>{
      console.log(err)
    })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Switch>
      <ProtectedRoute exact path="/"
      loggedIn={loggedIn}
      component={Main}
      onEditAvatar={handleEditAvatarClick} 
        onAddPlace ={handleAddPlaceClick} 
        onEditProfile={handleEditProfileClick}
        onCardClick={handleCardClick}
        onClose={closeAllPopups}
        cards={cards}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
        currentEmail={currentEmail}
        signOut={signOut}/>
      <Route path="/sign-up">
        <Register setInfoTooltipOpen={setInfoTooltipOpen} setSuccesRegister={setSuccesRegister} regiserAuth={regiserAuth}/>
      </Route>
      <Route path="/sign-in">
        <Login handleLogin={handleLogin} loginAuth={loginAuth}/>
      </Route>
      <Route path="/">
        {loggedIn ? <Redirect to="/" /> : <Redirect to="/sign-in" />}
      </Route> 
      </Switch>
      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser}/> 
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/> 
      <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddNewCard={handleAddPlaceSubmit}/>
      <InfoTooltip isInfoTooltipOpen={isInfoTooltipOpen} onClose={closeAllPopups} succesRegister={succesRegister}/>
      <ImagePopup isOpen={isImagePopupOpen} onClose={closeAllPopups} card={selectedCard}/>
    </CurrentUserContext.Provider>
  );
}

export default withRouter(App);
