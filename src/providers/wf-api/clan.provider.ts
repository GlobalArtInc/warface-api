import axios from "axios";
import { WFClient, Server } from "../../core";
import { Clan } from "../../interfaces/wf-api";

export class ClanProvider {
  async members(name: string, server: Server | null = null): Promise<Clan> {
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
        const endpoint = WFClient.getEndpoint(server);

        try {
          const response = await axios.get(encodeURI(`${endpoint}/clan/members?clan=${name}`))

          return resolve(response.data);
        } catch (err) {
          const response = err.response.data

          if (response.message === 'Ошибка: invalid response status') {
            return reject('maintenance');
          } else if (servers[servers.length - 1] === server && response.message === 'Клан не найден') {
            return reject('not_found');
          }
        }
      }
    });
  }
}