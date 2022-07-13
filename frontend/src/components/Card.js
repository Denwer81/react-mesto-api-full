import React from 'react';
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ cardData, onCardClick, handleCardLike, handleDeleteCard }) {
  const currentUser = React.useContext(CurrentUserContext);
  const isCreateByCurrentUser = currentUser.id === cardData.createByUserId;
  const isLikedByCurrentUser = cardData.likes.some(like => like._id === currentUser.id);

  return (
    <li className="card">
      <button
        className={`card__delete-btn ${isCreateByCurrentUser ? '' : 'card__delete-btn_hidden'}`}
        onClick={() => handleDeleteCard(cardData)}
        type="button"
        aria-label="удалить карточку">
      </button>
      <img className="card__image"
        onClick={() => onCardClick(cardData)}
        src={cardData.link}
        alt={cardData.title}
        loading="lazy" />
      <div className="card__info">
        <h2 className="card__title">{cardData.title}</h2>
        <div className="card__like-container">
          <button
            className={`card__like-btn ${isLikedByCurrentUser ? 'card__like-btn_active' : ''}`}
            onClick={() => handleCardLike(cardData.cardId, isLikedByCurrentUser)}
            type="button"
            aria-label="лайк карточки"></button>
          <p className="card__like-counter">{cardData.likes.length || 0}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;