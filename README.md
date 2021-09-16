# Warface API
Небольшой модуль-враппер для работы с Warface API. 

## Установка
```sh
$ npm install @globalart/warface-api
```

## Инициализация враппера
```js
const WF = require('@globalart/warface-api')
```

## Примеры кода
**Получение игрока**
```js
new WF().getPlayer("МедикХххх").then((player) => {
    console.log(player)
}).catch((err) => {
    console.log(err)
})
```
**Получение клана**
```js
new WF().getClan("атомные_медики").then((clan) => {
    console.log(clan)
}).catch((err) => {
    console.log(err)
})
```