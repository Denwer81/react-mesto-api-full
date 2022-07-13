import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Header from './Header';
import Login from './Login';
import Register from './Register';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import ChangeAvatar from './ChangeAvatarPopup';
import AddCardPopup from './AddCardPopup';
import DeleteCardPopup from './DeleteCardPopup';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import ProtectedRoute from './ProtectedRoute ';
import { register, authorize, validateToken } from '../utils/auth';
import { lockScroll, unlockScroll } from '../utils/scroll';

function App() {
  const [currentUser, setCurrentUser] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [selectedCard, setSelectedCard] = React.useState({});
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = React.useState(false);
  const [isDeleteCardPopupOpen, setIsDeleteCardPopupOpen] = React.useState(false);
  const [isTooltipPopupOpen, setIsTooltipPopupOpen] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputData, setinputData] = React.useState({});
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [isResponseOk, setIsResponseOk] = React.useState(false);
  const [userEmail, setUserEmail] = React.useState('');
  // const [token, setToken] = React.useState('');
  const history = useHistory();

  React.useEffect(() => {
    if (loggedIn) { 
      api.getProfile()
      .then((userData) => {
        setCurrentUser({
          name: userData.name,
          description: userData.about,
          avatar: userData.avatar,
          id: userData._id
        });
      })
      .catch(err => console.log(err));
    }
  }, [loggedIn]);

  React.useEffect(() => {
    if (loggedIn) {
      api.getInitialCards()
        .then(cardsData => {
        const formattedCardData = cardsData.map(cardData => {
          return {
            title: cardData.name,
            link: cardData.link,
            cardId: cardData._id,
            likes: cardData.likes,
            createByUserId: cardData.owner,
          };
        });
        setCards(formattedCardData);
      })
      .catch(err => console.log(err));
    }
  }, [loggedIn]);

  function handleCardLike(cardId, isLiked) {
    api.likesCard(cardId, isLiked)
      .then(data => {
        setCards(cards => cards.map(card => card.cardId === cardId
          ? { ...card, likes: data.likes }
          : card));
      })
      .catch(err => console.log(err));
  }

  function handleSubmitDeleteForm() {
    setIsLoading(true);
    api.deleteCard(selectedCard.cardId)
      .then((data) => {
        if (data) {
          setCards(cards => cards.filter(card => card.cardId !== selectedCard.cardId));
        }
        handleCloseAllPopup();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  }

  function handleSubmitEditForm(userName, userAbout) {
    setIsLoading(true);
    api.editProfile(userName, userAbout)
      .then(data => {
        setCurrentUser({ ...currentUser, name: data.name, description: data.about });
        handleCloseAllPopup();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  }

  function handleSubmitAvatarForm(link) {
    setIsLoading(true);
    api.changeAvatar(link)
      .then(data => {
        setCurrentUser({ ...currentUser, avatar: data.avatar })
        handleCloseAllPopup();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  }

  function handleSubmitAddCardForm(name, link) {
    setIsLoading(true);
    api.addNewCard(name, link)
      .then(data => {
        const formattedCardData = {
          title: data.name,
          link: data.link,
          cardId: data._id,
          likes: data.likes,
          createByUserId: data.owner,
        };

        setCards([formattedCardData, ...cards]);
        handleCloseAllPopup();
      })
      .catch(err => console.log(err))
      .finally(() => {
        setTimeout(() => {
          setIsLoading(false);
        }, 300);
      });
  }

  function handleSubmitSignUp(email, password) {
    setIsLoading(true);
    register(email, password)
      .then(res => {
        if (res) {
          setIsResponseOk(true);
          setIsTooltipPopupOpen(true);
          history.push('/sign-in');
        }
      })
      .catch(error => {
        setErrorMessage(error);
        setIsResponseOk(false);
        setIsTooltipPopupOpen(true);
      })
      .finally(setIsLoading(false));
  }

  function handleSubmitSignIn(email, password) {
    setIsLoading(true);
    authorize(email, password)
      .then(res => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          // setToken(res.token);
          setLoggedIn(true);
          setUserEmail(email);
          history.push('/');
        }
      })
      .catch(error => {
        setErrorMessage(error);
        setIsTooltipPopupOpen(true);
      })
      .finally(setIsLoading(false));
  }

  function checkToken() {
    if (localStorage.getItem('jwt')) {
      const jwt = localStorage.getItem('jwt');

      validateToken(jwt)
        .then(res => {
          console.log(res);
          // setToken(jwt);
          setLoggedIn(true);
          setUserEmail(res.email);
          history.push('/');
        });
    }
  }

  React.useEffect(() => {
    checkToken();
  }, []);

  function handleSignOut() {
    localStorage.removeItem('jwt');
    setUserEmail('');
    setLoggedIn(false);
    history.push('/sign-in');
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
    lockScroll();
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
    lockScroll();
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
    lockScroll();
  }

  function handleCardClick(cardData) {
    setSelectedCard(cardData);
    setIsImagePopupOpen(true);
    lockScroll();
  }

  function handleDeleteCard(cardData) {
    setSelectedCard(cardData);
    setIsDeleteCardPopupOpen(true);
    lockScroll();
  }

  function handleCloseAllPopup() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsDeleteCardPopupOpen(false);
    setIsTooltipPopupOpen(false);
    setTimeout(() => {
      setSelectedCard({});
      setinputData({});
    }, 300);
    unlockScroll();
  }

  function handleInputData(evt) {
    setinputData({ ...inputData, [evt.target.name]: evt.target.validationMessage });
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">

        <div className="page__container">

          <Header
            loggedIn={loggedIn}
            userEmail={userEmail}
            handleSignOut={handleSignOut} />

          <Switch>
            <ProtectedRoute exact path="/" loggedIn={loggedIn}>
              <Main
                initialCards={cards}
                onEditProfile={handleEditProfileClick}
                onEditAvatar={handleEditAvatarClick}
                onAddPlace={handleAddPlaceClick}
                onCardClick={handleCardClick}
                handleCardLike={handleCardLike}
                handleDeleteCard={handleDeleteCard} />
            </ProtectedRoute>

            <Route path="/sign-up">
              <Register
                handleInputData={handleInputData}
                inputData={inputData}
                onSubmitForm={handleSubmitSignUp}
                isLoading={isLoading} />

            </Route>

            <Route path="/sign-in">
              <Login
                handleInputData={handleInputData}
                inputData={inputData}
                onSubmitForm={handleSubmitSignIn}
                isLoading={isLoading} />
            </Route>
          </Switch>

          <Footer />

        </div>

        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          closePopup={handleCloseAllPopup}
          handleInputData={handleInputData}
          inputData={inputData}
          onSubmitForm={handleSubmitEditForm}
          isLoading={isLoading} />

        <ChangeAvatar
          isOpen={isEditAvatarPopupOpen}
          closePopup={handleCloseAllPopup}
          handleInputData={handleInputData}
          inputData={inputData}
          onSubmitForm={handleSubmitAvatarForm}
          isLoading={isLoading} />

        <AddCardPopup
          isOpen={isAddPlacePopupOpen}
          closePopup={handleCloseAllPopup}
          handleInputData={handleInputData}
          inputData={inputData}
          onSubmitForm={handleSubmitAddCardForm}
          isLoading={isLoading} />

        <DeleteCardPopup
          isOpen={isDeleteCardPopupOpen}
          closePopup={handleCloseAllPopup}
          onSubmitForm={handleSubmitDeleteForm}
          isLoading={isLoading} />

        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          closePopup={handleCloseAllPopup} />

        <InfoTooltip
          isOpen={isTooltipPopupOpen}
          closePopup={handleCloseAllPopup}
          errorMessage={errorMessage}
          isResponseOk={isResponseOk} />

      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;