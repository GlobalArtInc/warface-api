import axios from "axios";
import { Endpoint, Server } from "./enum/common.enum";
import { Clan } from "./interfaces/clan.interface";
import { Achievement } from "./interfaces/common.interface";
import { Player } from "./interfaces/player.interface";
import { Top } from "./interfaces/top.interface";
import { Weapon } from "./interfaces/weapons.interface";
import clanService from "./services/clan.service";
import playerService from "./services/player.service";
import topService from "./services/top.service";
import weaponsService from "./services/weapons.service";

export class WFApi {
  static getApiUrl(server: Server) {
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

  async getTop100(server: Server): Promise<Top> {
    return topService.getTop(server);
  }

  async getPlayer(name: string, server: Server | null = null): Promise<Player> {
    return playerService.getPlayer(name, server)
  }

  async getClan(name: string, server: Server | null = null): Promise<Clan> {
    return clanService.getClan(name, server);
  }

  async getWeapons(server: Server): Promise<Weapon[]> {
    return weaponsService.getWeapons(server);
  }
}