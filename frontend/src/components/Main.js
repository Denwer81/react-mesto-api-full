import React from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext';
import Card from './Card';

function Main({ initialCards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, handleCardLike, handleDeleteCard }) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="main">

      <section className="profile container main__profile">
        <button
          className="profile__image"
          onClick={onEditAvatar}
          type="button"
          aria-label="аватар"
          style={{ backgroundImage: `url(${currentUser.avatar || ''})` }}>
        </button>
        <div className="profile__info">
          <h1 className="profile__user-name">{currentUser.name}</h1>
          <button
            className="profile__edit-btn"
            onClick={onEditProfile}
            type="button"
            aria-label="редактировать профиль">
          </button>
          <p className="profile__text">{currentUser.description}</p>
        </div>
        <button
          className="profile__add-card-btn"
          onClick={onAddPlace}
          type="button"
          aria-label="меню добавления карточки">
        </button>
      </section>

      <section className="cards container">
        <ul className="cards__list">
          {
            initialCards.map(data => (
              <Card
                key={data.cardId}
                cardData={data}
                onCardClick={onCardClick}
                handleCardLike={handleCardLike}
                handleDeleteCard={handleDeleteCard} />
            ))
          }
        </ul>
      </section>

    </main>
  );
}

export default Main;