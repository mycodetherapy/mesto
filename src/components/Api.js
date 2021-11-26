export default class Api {
  constructor(url) {
    this.url = url;
  }

  getUserInfo() {
    fetch("https://mesto.nomoreparties.co/v1/cohort-30/users/me", {
      headers: {
        authorization: "1aa13265-ad88-4c40-a102-69558d45a615",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
      });
  }
}
