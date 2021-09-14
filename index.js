const axios = require('axios')
const {getPlayer} = require('./player.js')

const getServers = ['ru', 'int'];

class WRAPPER {
    getApiUrl(server) {
        switch (server.toLowerCase()) {
            case 'ru':
                return 'http://api.warface.ru/'
            case 'int':
                return 'http://api.wf.my.com/'
        }
    }

    async getPlayer(name, server) {
        if (!name)
            return Promise.reject("No nickname specified")

        if (server && getServers.indexOf(server) !== -1)
            return Promise.reject(`The server is wrong, available servers: ${getServers.join(', ')}`)

        let servers = []
        if (server) {
            servers.push(server)
        } else {
            servers = getServers
        }

        for (let server of servers) {
            const api = this.getApiUrl(server);

            try {
                const {data} = await axios.get(`${api}user/stat?name=${name}`)
                return Promise.resolve(getPlayer(data, server))
            } catch (err) {
                const {data} = err.response

                if (data.message === 'Ошибка: invalid response status') {
                    return Promise.reject('maintenance');
                } else if (data.message === 'Персонаж неактивен') {
                    return Promise.reject('inactive');
                } else if (data.message === 'Игрок скрыл свою статистику') {
                    return Promise.reject('hidden');
                } else if (servers[servers.length - 1] === server && data.message === 'Пользователь не найден') {
                    return Promise.reject('not_found');
                }
            }
        }
    }

}

module.exports = WRAPPER
