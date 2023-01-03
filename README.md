# Warface API
Небольшой модуль-враппер для работы с Warface API. 

[![Publish Package to npmjs](https://github.com/GlobalArtInc/warface-api-wrapper/actions/workflows/publish.yml/badge.svg)](https://github.com/GlobalArtInc/warface-api-wrapper/actions/workflows/publish.yml)
## Установка
```sh
$ npm install @globalart/warface-api
```

## Инициализация враппера
```js
const { WFApi } = require('@globalart/warface-api');
```
```es6
import { WFApi } from '@globalart/warface-api';
```

## Примеры кода
**Получение игрока**
```js
new WF().getPlayer("МедикХххх").then((player) => {
    console.log(player)
}).catch((err) => {
    // Ошибки поиска (игрок не найден, неативен и т.д.)
    console.log(err)
})
```
**Получение клана**
```js
new WF().getClan("атомные_медики").then((clan) => {
    console.log(clan)
}).catch((err) => {
    // Ошибки поиска (клан не найден и т.д.)
    console.log(err)
})
```