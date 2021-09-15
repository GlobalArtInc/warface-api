const wrapper = require('../index')

new wrapper().getAchievements('CK1983').then((a) => {
    console.log(a)
}).catch(console.log)