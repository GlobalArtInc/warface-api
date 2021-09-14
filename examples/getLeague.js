const wrapper = require('../index')

new wrapper().getLeague('int', 1).then((league) => {
    console.log(league)
}).catch(console.log)