import axios from "axios";
import { Endpoint, Server } from "./enum/common.enum";
import { Achievement } from "./interfaces/common.interface";
import formatService from "./services/format.service";

export class WFApi {
  getApiUrl(server: Server) {
    return Endpoint[server];
  }

  async getAchievements(name: string, server: Server): Promise<Achievement[]> {
    return new Promise(async (resolve, reject) => {
      let endpoint: Endpoint;
      if(!name) {
        return reject(new Error('nickname_not_specified'));
      }
      let servers: Server[] = [];
      if(server) {
        servers.push(server);
        endpoint = this.getApiUrl(server);
      } else {
        servers = [Server.Ru, Server.Int];
        endpoint = this.getApiUrl(server);
      }

      try {
        const achievements = await axios.get(encodeURI(`${endpoint}user/achievements?name=${name}`));

        return resolve(achievements.data);
      } catch (err) {
        const {data} = err.response

        if (data.message === 'Ошибка: invalid response status') {
          return reject('maintenance');
        } else if (data.message === 'Персонаж неактивен') {
          return reject('inactive');
        } else if (data.message === 'Игрок скрыл свою статистику') {
          return reject('hidden');
        } else if (data.message === 'Пользователь не найден') {
          return reject('not_found');
        }
      }
    });
  }

  async getTop100(server: Server) {
    return new Promise(async (resolve, reject) => {
      if(!server) {
        return reject('no_server_specified');
      }
      const endpoint = this.getApiUrl(server);

      try {
        const response = await axios.get(`${endpoint}rating/top100`);

        return resolve(response.data);
      } catch (err) {
        return reject(err.response.data);
      }
    });
  }

  async getPlayer(name: string, server: Server | null = null) {
    return new Promise(async (resolve, reject) => {
      if(!name) {
        reject(new Error('nickname_not_specified'));
      }
      let servers: Server[] = [];
      if(server) {
        servers.push(server);
      } else {
        servers = [Server.Ru, Server.Int];
      }

      for(let server of servers) {
        const endpointUrl = this.getApiUrl(server);
        
        try {
          const [ playerRes, achievements ] = await Promise.all([
            axios.get(encodeURI(`${endpointUrl}user/stat?name=${name}`)),
            this.getAchievements(name, server),
          ]);
          const player = playerRes.data;

          if(player.nickname) {
            return resolve(formatService.format(player, achievements, server));
          }
        } catch (err) {
          const { data } = err.response;

          if (data.message === 'Ошибка: invalid response status') {
            return reject('maintenance');
          } else if (data.message === 'Персонаж неактивен') {
              return reject('inactive');
          } else if (data.message === 'Игрок скрыл свою статистику') {
              return reject('hidden');
          } else if (data.message === 'Пользователь не найден') {
              return reject('not_found');
          }
        }
      }
    });
  }

  async getClan(name: string, server: Server | null = null) {
    return new Promise(async (resolve, reject) => {
      if(!name) {
        reject('name_is_not_specified');
      }
      let servers: Server[] = []
      if (server) {
          servers.push(server);
      } else {
          servers = [Server.Ru, Server.Int];
      }
      
      for(const server of servers) {
        const endpoint = this.getApiUrl(server);

        try {
          const response = await axios.get(encodeURI(`${endpoint}clan/members?clan=${name}`))

          return resolve(response.data);
        } catch (err) {
          const {data} = err.response

          if (data.message === 'Ошибка: invalid response status') {
              return reject('maintenance');
          } else if (servers[servers.length - 1] === server && data.message === 'Клан не найден') {
              return reject('not_found');
          }
        }
      }
    });
  }

  async getWeapons(server: Server) {
    return new Promise(async (resolve, reject) => {
      const endpoint = this.getApiUrl(server);
      const response = await axios.get(`${endpoint}weapon/catalog`);

      try {
        return resolve(response.data);
      } catch (err) {
        return reject(err.response.data);
      }
    });
  }
}