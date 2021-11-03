export class Api {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  getUserInfo(token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'GET',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    }).then(this._getResponseData)
  }

  getInitialCards(token) {
  return fetch(`${this._baseUrl}/cards`, {
    method: 'GET',
    headers: {
      ...this._headers,
      Authorization: `Bearer ${token}`
      }
  }).then(this._getResponseData)
} 

  setUserInfo(data, token) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }).then(this._getResponseData)
  }

   setUserAvatar(data, token) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        avatar: data.avatar
      })
    }).then(this._getResponseData)
  }

  postCard(data, token) {
  return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    }).then(this._getResponseData)
  }

  likeCard(data, token) {
  return fetch(`${this._baseUrl}/cards/likes/${data}`, {
      method: 'PUT',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    }).then(this._getResponseData)
  }

  dislikeCard(data, token) {
  return fetch(`${this._baseUrl}/cards/likes/${data}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    }).then(this._getResponseData)
  }
  
  deleteCard(data, token) {
  return fetch(`${this._baseUrl}/cards/${data}`, {
      method: 'DELETE',
      headers: {
        ...this._headers,
        Authorization: `Bearer ${token}`
      }
    }).then(this._getResponseData)
  }

  changeLikeCardStatus(data, isLiked) {
    if (isLiked) {
      return this.likeCard(data);
    } else {
      return this.dislikeCard(data);
    }
  }

  _getResponseData(res) {
    if (!res.ok) {
        return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
} 
}

const api = new Api({
  baseUrl: 'https://api.kirillnihaenkonaruls.nomoredomains.icu',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
}); 

export default api;