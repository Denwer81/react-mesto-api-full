class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this.headers = headers;
  }

  _checkResponse(res) {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
        headers: this.headers
      })
      .then(this._checkResponse);
  }

  getProfile() {
    return fetch(`${this._baseUrl}/users/me`, {
        headers: this.headers
      })
      .then(this._checkResponse);
  }

  editProfile(name, about) {
    return fetch(`${this._baseUrl}/users/me`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          about: about
        })
      })
      .then(this._checkResponse);
  }

  changeAvatar(link) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this.headers,
        body: JSON.stringify({
          avatar: link
        })
      })
      .then(this._checkResponse);
  }

  addNewCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
        method: 'POST',
        headers: this.headers,
        body: JSON.stringify({
          name: name,
          link: link
        })
      })
      .then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this.headers
      })
      .then(this._checkResponse);
  }

  likesCard(cardId, isLiked) {
    let method = isLiked ? 'DELETE' : 'PUT';
    
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
        method: method,
        headers: this.headers
      })
      .then(this._checkResponse);
  }
}

let jwt = localStorage.getItem('jwt');



function checkToken() {
  if (localStorage.getItem('jwt')) {
    jwt = localStorage.getItem('jwt');
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${jwt}`
  }
});

export default api;