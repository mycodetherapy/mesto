# Проект: Место

Сервис "Место" это web-сайт, который позволяет добавлять фотографии с описаниями, ставить лайки, а также редактировать профиль пользователя.
Данный сервис возможно использовать как готовый элемент для построения социальной сети.

**Как это работает**

* Frontend интерактивность сайта управляется кодом на JavaScript  ES6.
* Код стороны клиента выстроен в рамках парадигмы ООП и разбит на независимые классы.
* Классы получают ссылки на объекты через контекст this.
* Асинхронность в управляющем файле построена на Callback-функциях.
* Сбор данных осуществляется через form.
* Для взаимодействия с сервером используются featch-запросы.
* Применяется адаптивная верстка. HTML и CSS используют: Grid Layout, Flexbox, @media, БЭМ.

Усли вы хотите посетить сайт, достаточно [перейти по ссылке.](https://mycodetherapy.github.io/mesto/index.html)

На сегодняшний день клиентская сторона сайта использует объектно ориентированный код, который может выглядеть запутанным для постороннего разработчика. Поэтому в моих планах проведение рефакторинга по построению дерева элементов с помощью инструментов библиотеки React.js. При этом я хочу применить функциональный подход внутри компонентов реакта. В совокупности это должно значительно упростить поддержку и развитие проекта в дальнейшем.
