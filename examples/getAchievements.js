const wrapper = require('../index')

new wrapper().getAchievements('CK1983').then((achievements) => {
    console.log(achievements)
}).catch(console.log)