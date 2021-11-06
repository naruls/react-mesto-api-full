export const BASE_URL = 'https://api.kirillnihaenkonaruls.nomoredomains.icu';

const checkRes = (res) => {
    return res.ok ? res.json() : Promise.reject(`Ошибка: ${res.status}`)
}

export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
  .then((response) => {
    try {
      if (response.status === 200){
        return response.json();
      }
    } catch(e){
      return (e)
    }
  })
  .then((res) => {
    return res;
  })
}; 

 export const authorize = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    credentials: 'include',
    body: JSON.stringify({email, password})
  })
  .then((response => response.json()))
  .then((res) => {
    if (res) {
      document.cookie = `token=${res.token}`;
      localStorage.setItem('token', res.token);
      return res;
    }
    }).catch((err) => {
    Promise.reject(`Ошибка: ${err.status}`);
  });
}

export const getContent = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authorization': `Bearer ${token}`
    },
  })
  .then(res => res.json())
  .then(data => data)
  .catch((err) => {
    return err;
  });
} 