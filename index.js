import fetch from 'node-fetch';
import {getPlayer} from "./player.js";

export default class wrapper {
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

    async getClan() {
        let servers = []
        if (this.server) {
            servers.push(this.server)
        } else {
            servers = this.getServers()
        }
        for (let server of servers) {
            try {
                const api = this.getApiUrl(server);
                const response = await fetch(encodeURI(`${api}clan/members?clan=${this.name}`));
                if (response.status === 200) {
                    return response.json()
                }
            } catch (err) {
                console.error(err)
            }
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
            try {
                const api = this.getApiUrl(server);
                const response = await fetch(encodeURI(`${api}user/stat?name=${this.name}`));
                if (response.status === 429) continue;
                const player = await response.json();

                if (player.user_id) {
                    return Promise.resolve(getPlayer(player, server))
                } else if (player.message === 'Ошибка: invalid response status') {
                    return Promise.reject('maintenance');
                } else if (player.message === 'Персонаж неактивен') {
                    return Promise.reject('inactive');
                } else if (player.message === 'Игрок скрыл свою статистику') {
                    return Promise.reject('hidden');
                } else if (player.message === 'Пользователь не найден' && server === servers[servers.length - 1]) {
                    return Promise.reject('not_found');
                }
            } catch (err) {
                console.error(err)
            }
        }

    }
}