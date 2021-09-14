const wrapper = require('../index')

new wrapper().getWeapons('int').then((weapons) => {
    console.log(weapons)
}).catch(console.log)