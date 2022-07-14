const baseUrl = 'https://api.denwer.nomoredomains.xyz';
const headers = (token) => {
  return {
    'Content-Type': 'application/json',
    "Authorization": `Bearer ${token}`
  };
};

function checkResponse(res) {
  return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`);
}

export function getInitialCards(token) {
  return fetch(`${baseUrl}/cards`, {
    headers: headers(token)
  })
    .then(checkResponse);
}

export function getProfile(token) {
  return fetch(`${baseUrl}/users/me`, {
    headers: headers(token)
  })
    .then(checkResponse);
}

export function editProfile(token, name, about) {
  return fetch(`${baseUrl}/users/me`, {
    method: 'PATCH',
    headers: headers(token),
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(checkResponse);
}

export function changeAvatar(token, link) {
  return fetch(`${baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: headers(token),
    body: JSON.stringify({
      avatar: link
    })
  })
    .then(checkResponse);
}

export function addNewCard(token, name, link) {
  return fetch(`${baseUrl}/cards`, {
    method: 'POST',
    headers: headers(token),
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(checkResponse);
}

export function deleteCard(token, cardId) {
  return fetch(`${baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: headers(token)
  })
    .then(checkResponse);
}

export function likesCard(token, cardId, isLiked) {
  let method = isLiked ? 'DELETE' : 'PUT';

  return fetch(`${baseUrl}/cards/${cardId}/likes`, {
    method: method,
    headers: headers(token)
  })
    .then(checkResponse);
}
