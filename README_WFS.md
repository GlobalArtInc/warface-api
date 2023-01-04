## Инициализация враппера [WFS]
[Документация](https://wfbot.cf/swagger/) <br />
Common JS
```js
const { WFSClient } = require('@globalart/warface-api');
```
EcmaScript 6
```ts
import { WFSClient } from '@globalart/warface-api';
```

**Получение статистики игрока**
```js
new WFSClient().player.stats("МедикХххх").then((res) => {
    console.log(res)
})
```
___
**Получение статистики по PVE-миссиям игрока**
```js
new WFSClient().player.pve("атомные_медики").then((res) => {
    console.log(res)
}).catch((err) => {
    // Ошибки поиска (клан не найден и т.д.)
    console.log(err)
})
```
___
**Получение статистики по достижениям спецопераций игрока**
```js
new WFSClient().player.pveAchievements("атомные_медики").then((res) => {
    console.log(res)
}).catch((err) => {
    // Ошибки поиска (клан не найден и т.д.)
    console.log(err)
})
```
___
**Получить текущее количество игроков на серверах**
```js
new WFSClient().online.stats().then((res) => {
    console.log(res)
});
```