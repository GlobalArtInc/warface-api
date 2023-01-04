import axios from "axios";
import { WFApi } from "..";
import { Endpoint, Server } from "../enum/common.enum";
import { Achievement } from "../interfaces/common.interface";
import { Player } from "../interfaces/player.interface";

export class playerService {

  async getPlayer(name: string, server: Server | null): Promise<Player> {
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
        const endpointUrl = WFApi.getApiUrl(server);
        
        try {
          const [ playerRes, achievements ] = await Promise.all([
            axios.get(encodeURI(`${endpointUrl}user/stat?name=${name}`)),
            this.getAchievements(name, server),
          ]);
          const player = playerRes.data;

          if(player.nickname) {
            return resolve(this.format(player, achievements, server));
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

  async getAchievements(name: string, server: Server): Promise<Achievement[]> {
    return new Promise(async (resolve, reject) => {
      let endpoint: Endpoint;
      if(!name) {
        return reject(new Error('nickname_not_specified'));
      }
      let servers: Server[] = [];
      if(server) {
        servers.push(server);
        endpoint = WFApi.getApiUrl(server);
      } else {
        servers = [Server.Ru, Server.Int];
        endpoint = WFApi.getApiUrl(server);
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

  getMatch(el: any, regexp: any) {
    return el.match(regexp)[0].trim();
  }

  format(playerData: Partial<Player>, achievements: Achievement[], server: Server) {
    let player = playerData;
    const full_player = this.parseFullResponse(player['full_response']);
    delete player['full_response'];
  
    return {
        server,
        player,
        full_player,
        achievements,
    };
  }

  parseFullResponse(full_response: string) {
    return full_response.split(/<Sum>/).reduce((acc, el) => {
      if (!el) return acc
  
      const key = this.getMatch(el, /.*(?=\=)/)
      acc[key] = +this.getMatch(el, /(?<=\=).*/)
  
      return acc
    }, {});
  }
}

export default new playerService();
