import { WFClient } from "../core";
import { Endpoint, Server } from "../core/common";
import axios from "axios";

export class UserProvider {
  async stat(nickname: string, server: Server | null = null) {
    return new Promise(async (resolve, reject) => {
      if(!nickname) {
        reject('nickname_not_specified');
      }
      let servers: Server[] = [];
      if(server) {
        servers.push(server);
      } else {
        servers = [Server.Ru, Server.Int];
      }

      for(const server of servers) {
        const endpoint = WFClient.getEndpoint(server);

        try {
          const [playerRes, achievements] = await Promise.all([
            axios.get(`${encodeURI(`${endpoint}/user/stat?name=${nickname}`)}`),
            this.achievements(nickname, server),
          ]);
          const player = playerRes.data;

          if(player.user_id) {
            return resolve(this.formatPlayerStructure({
              player,
              server,
              achievements,
            }));
          }
        } catch (err) {
          const response = err.response.data;

          if (response.message === 'Ошибка: invalid response status') {
            return reject('maintenance');
          } else if (response.message === 'Персонаж неактивен') {
            return reject('inactive');
          } else if (response.message === 'Игрок скрыл свою статистику') {
            return reject('hidden');
          } else if (server === servers[servers.length - 1] && response.message === 'Пользователь не найден') {
            return reject('not_found');
          }
        }
      }
    });
  }

  async achievements(nickname: string, server: Server) {
    return new Promise(async (resolve, reject) => {
      let endpoint: Endpoint;
      if(!nickname) {
        return reject(new Error('nickname_not_specified'));
      }
      let servers: Server[] = [];
      if(server) {
        servers.push(server);
        endpoint = WFClient.getEndpoint(server);
      } else {
        servers = [Server.Ru, Server.Int];
        endpoint = WFClient.getEndpoint(server);
      }

      try {
        const achievements = await axios.get(encodeURI(`${endpoint}/user/achievements?name=${nickname}`));

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

  private getMatch(el: any, regexp: any) {
    return el.match(regexp)[0].trim();
  }

  private parseFullResponse(fullResponse: string) {
    return fullResponse.split(/<Sum>/).reduce((acc, el) => {
      if (!el) return acc
  
      const key = this.getMatch(el, /.*(?=\=)/)
      acc[key] = +this.getMatch(el, /(?<=\=).*/)
  
      return acc
    }, {});
  }

  private formatPlayerStructure(playerData: any) {
    const { server, player, achievements } = playerData;
    const full_player = this.parseFullResponse(player['full_response']);
    delete player['full_response'];
  
    return {
        server,
        player,
        full_player,
        achievements,
    };
  }

}
