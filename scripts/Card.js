export {Card, crateCards, popupTypeImage};
import {openPopup, focusElement} from './index.js'

const initialCards = [
    {
      name: "Нарьян-Мар",
      link: "https://live.staticflickr.com/65535/49467519261_64e10478ed_b.jpg",
    },
    {
      name: "Диксон",
      link: "https://live.staticflickr.com/4688/38761938434_a8488ff5d9_b.jpg",
    },
    {
      name: "Дудинка",
      link: "https://live.staticflickr.com/5525/10904348995_de06885b26_b.jpg",
    },
    {
      name: "Белушья Губа",
      link: "https://live.staticflickr.com/4271/34038884623_422f053a4b_c.jpg",
    },
    {
      name: "Магадан",
      link: "https://live.staticflickr.com/4037/4382400584_b2a96a3b8d_c.jpg",
    },
    {
      name: "Тикси",
      link: "https://live.staticflickr.com/65535/50754839667_8f4ee620a8_b.jpg",
    },
  ];

  const popupTypeImage = document.querySelector(".popup_type_image");
 
 
  class Card {
      constructor(data, cardSelector) { 
          this._name = data.name;
          this._link = data.link;
          this._cardSelector = cardSelector;
      }

      _getTemplate() {
        const cardElement = document
        .querySelector(this._cardSelector)
        .content
        .querySelector(".element")
        .cloneNode(true);
  
      return cardElement;
      }

      generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();

        this._element.querySelector(".element__title").textContent = this._name;
        this._element.querySelector(".element__image").src = this._link;
        this._element.querySelector(".element__image").alt = this._name;

        return this._element;
      }

      //Toggles likes.
      _switchLike() {
        this._element.querySelector(".element__like").classList.toggle("element__like_active");
      }
    
      //Removes an element.
      _removeElement() {
       // const listItemRemove = this._element.currentTarget.closest(".element");
       this._element.remove();
      }

      //Tears off an image for viewing
      _viewImage() {
        const popupImage = popupTypeImage.querySelector(".popup__element-image");
        const popupImageCaption = popupTypeImage.querySelector(".popup__image-caption");
        const targetImage = this._element.querySelector(".element__image");
    
        popupImage.src = targetImage.src;
        popupImage.alt = targetImage.alt;
        popupImageCaption.textContent = targetImage.alt;
    
        openPopup(popupTypeImage);
        focusElement(popupTypeImage);
    }

        //listens to events in the element.
      _setEventListeners() {
        this._element.querySelector(".element__like").addEventListener("click", () => {
            this._switchLike();
        });
    //console.log(this._element);
        this._element
        .querySelector(".element__delete")
        .addEventListener("click", () => {
            this._removeElement();
        });
    
        this._element.querySelector(".element__image").addEventListener("click", () => {
            this._viewImage();
        });
    }
  }

//Add cards in DOM
 function crateCards()  {initialCards.forEach((item) => {
    const card = new Card(item, '.element-template');
    const cardElement = card.generateCard();
  
    document.querySelector('.elements__grid-container').append(cardElement);
  });
}