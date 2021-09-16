const wrapper = require('../index')

new wrapper().getClan('Атомные_медики').then((clan) => {
    console.log(clan)
}).catch(console.log)