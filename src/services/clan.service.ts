import axios from "axios";
import { WFApi } from "..";
import { Server } from "../enum/common.enum";
import { Clan } from "../interfaces/clan.interface";

export class ClanService {
  async getClan(name: string, server: Server | null): Promise<Clan> {
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
        const endpoint = WFApi.getApiUrl(server);

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
}

export default new ClanService();
