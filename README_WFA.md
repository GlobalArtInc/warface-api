## Инициализация враппера [WF API]
[Документация](https://ru.warface.com/wiki/index.php/API)

Common JS
```js
const { WFClient } = require('@globalart/warface-api');
```

EcmaScript 6
```ts
import { WFClient } from '@globalart/warface-api';
```

## Примеры кода
**Получение игрока**
```ts
new WFClient().player.stat("МедикХххх").then((player) => {
    console.log(player)
}).catch((err) => {
    // Ошибки поиска (игрок не найден, неативен и т.д.)
    console.log(err)
})
```
**Получение клана**
```js
new WFClient().clan.members("атомные_медики").then((clan) => {
    console.log(clan)
}).catch((err) => {
    // Ошибки поиска (клан не найден и т.д.)
    console.log(err)
})
```