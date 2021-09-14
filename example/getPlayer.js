const wrapper = require('../index')

new wrapper().getPlayer('CK1983', 'int').then((clan) => {
    console.log(clan)
}).catch(console.log)