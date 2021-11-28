const onError = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
};

export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserInfo = () => {
    return fetch(this._url + "users/me", {
      method: "GET",
      headers: this._headers,
    }).then(onError);
  };

  setUserInfo = (data) => {
    return fetch(this._url + "users/me", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(onError);
  };

  getCards = () => {
    return fetch(this._url + "cards", {
      method: "GET",
      headers: this._headers,
    }).then(onError);
  };

  addTasks = (data) => {
    return fetch(this._url + "cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(onError);
  };

  removeTasks = (dataId) => {
    return fetch(this._url + "cards/" + dataId, {
      method: "DELETE",
      headers: this._headers,
    }).then(onError);
  };

  setUserInfo = (userData) => {
    return fetch(this._url + "users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userData),
    }).then(onError);
  };

  setAvatar = (avatar) => {
    return fetch(this._url + "users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(onError);
  };

  addLike = (dataId) => {
    return fetch(this._url + "cards/likes/" + dataId, {
      method: "PUT",
      headers: this._headers,
    }).then(onError);
  };

  removeLike = (dataId) => {
    return fetch(this._url + "cards/likes/" + dataId, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`);
    });
  };
}
