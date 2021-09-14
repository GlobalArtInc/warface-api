const axios = require('axios')
const {getPlayer} = require('./player.js')

class WRAPPER {
    constructor(name, server) {
        this.name = name
        this.server = server
    }

    getServers() {
        return ['ru', 'int'];
    }

    getApiUrl(server) {
        switch (server) {
            case 'ru':
                return 'http://api.warface.ru/'
            case 'int':
                return 'http://api.wf.my.com/'
        }
    }

    async getPlayer() {
        let servers = []
        if (this.server) {
            servers.push(this.server)
        } else {
            servers = this.getServers()
        }

        for (let server of servers) {
            const api = this.getApiUrl(server);
//
            const url = `${api}user/stat?name=${this.name}`

            try {
                const {data} = await axios.get(url)
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
