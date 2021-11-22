export default class Api {
  constructor(config) {
    this._url = config.url;
    this._headers = config.headers;
  }

  getUserInfo = () => {
    return fetch(this._url + "users/me", {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Сервер не доступен");
    });
  };

  setUserInfo = (data) => {
    return fetch(this._url + "users/me", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка");
    });
  }

  getCards = () => {
    return fetch(this._url + "cards", {
      method: "GET",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Сервер не доступен");
    });
  };

  addTasks = (data) => {
    return fetch(this._url + "cards", {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка");
    });
  };

  removeTasks = (dataId) => {
    console.log(this._url + "cards" + dataId)
    return fetch(this._url + "cards" + dataId, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject("Ошибка");
    });
  }

  setUserInfo = (userData) => {
    return fetch(this._url + "users/me", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(userData),
    });
  };

  setAvatar = (avatar) => {
    return fetch(this._url + "users/me/avatar", {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    });
  };
}