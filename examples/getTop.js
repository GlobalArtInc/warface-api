const wrapper = require('../index')

new wrapper().getTop100('int').then((response) => {
    console.log(response)
}).catch(console.log)