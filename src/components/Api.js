export default class Api {
  constructor(url) {
    this.url = url;
  }

  getUserInfo() {
    fetch("https://mesto.nomoreparties.co/v1/cohort-30/users/me", {
      headers: {
        authorization: "c5a5cb5f-db7e-4ac2-924a-a6deb50d8693",
      },
    })
      .then((res) => res.json())
      .then((result) => {
        return result;
        //console.log(result);
      });
  }
}
