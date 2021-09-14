const wrapper = require('../index')

new wrapper().getClan('Beenus', 'int').then((clan) => {
    console.log(clan)
}).catch(console.log)