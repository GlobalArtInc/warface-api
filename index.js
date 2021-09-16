const axios = require('axios')
const {getPlayer} = require('./player.js')

const getServers = ['ru', 'int'];
const leagues = [1, 2, 3, 4, 5, 6];

class WRAPPER {
    /*
     * @function
     * @param {string} server
     * @return {string} Return the api url
     */
    getApiUrl(server) {
        switch (server.toLowerCase()) {
            case 'ru':
                return 'http://api.warface.ru/'
            case 'int':
                return 'http://api.wf.my.com/'
        }
    }

    /*
     * @function
     * @param {string} name
     * @param {string} server
     * @return {object} Returns the object of player
     */
    async getPlayer(name, server) {
        if (!name)
            return Promise.reject("No nickname specified")

        if (server && getServers.indexOf(server) === -1)
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
                const {data} = await axios.get(encodeURI(`${api}user/stat?name=${name}`))
                const achievements = await this.getAchievements(name, server)
                return Promise.resolve(getPlayer(data, achievements, server))
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

    async getTop100(server) {
        if (!server)
            return Promise.reject("No server specified")
        if (getServers.indexOf(server) === -1)
            return Promise.reject(`The server is wrong, available servers: ${getServers.join(', ')}`)

        const api = this.getApiUrl(server)

        try {
            const {data} = await axios.get(`${api}rating/top100`)
            return Promise.resolve(data)
        } catch (err) {
            const {data} = err.response
            return Promise.reject(data)
        }

    }

    async getAchievements(name, server) {
        let api;
        if (server) {
            if (getServers.indexOf(server) === -1)
                return Promise.reject(`The server is wrong, available servers: ${getServers.join(', ')}`)

            api = this.getApiUrl(server);
        } else {
            const player = await this.getPlayer(name)
            api = this.getApiUrl(player.server)
        }

        try {
            const {data} = await axios.get(encodeURI(`${api}user/achievements?name=${name}`))
            return Promise.resolve(data)
        } catch (err) {
            const {data} = err.response

            if (data.message === 'Ошибка: invalid response status') {
                return Promise.reject('maintenance');
            } else if (data.message === 'Персонаж неактивен') {
                return Promise.reject('inactive');
            } else if (data.message === 'Игрок скрыл свою статистику') {
                return Promise.reject('hidden');
            } else if (data.message === 'Пользователь не найден') {
                return Promise.reject('not_found');
            }
        }

    }

    async getClan(name, server) {
        if (!name)
            return Promise.reject("No clan name specified")

        if (server && getServers.indexOf(server) === -1)
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
                const {data} = await axios.get(encodeURI(`${api}clan/members?clan=${name}`))
                return Promise.resolve({server, clan: data})
            } catch (err) {
                console.log(err)
                const {data} = err.response

                if (data.message === 'Ошибка: invalid response status') {
                    return Promise.reject('maintenance');
                } else if (servers[servers.length - 1] === server && data.message === 'Клан не найден') {
                    return Promise.reject('not_found');
                }
            }
        }
    }

    async getLeague(server, league) {
        if (!league)
            return Promise.reject("No league specified")
        if (leagues.indexOf(league) === -1)
            return Promise.reject("The league is wrong, available servers: " + leagues.join(', '))
        if (!server)
            return Promise.reject("No server specified")
        if (getServers.indexOf(server) === -1)
            return Promise.reject(`The server is wrong, available servers: ${getServers.join(', ')}`)

        const api = this.getApiUrl(server)

        try {
            const {data} = await axios.get(`${api}rating/monthly?league=${league}`)
            return Promise.resolve({server, data})
        } catch (err) {
            const {data} = err.response
            return Promise.reject(data)
        }
    }

    async getWeapons(server) {
        if (server && getServers.indexOf(server) === -1)
            return Promise.reject(`The server is wrong, available servers: ${getServers.join(', ')}`)

        try {
            const api = this.getApiUrl(server);
            const {data} = await axios.get(`${api}weapon/catalog`)
            return Promise.resolve({server, data})
        } catch (err) {
            const {data} = err.response
            return Promise.reject(data)
        }
    }

}

module.exports = WRAPPER
