import axios from "axios";
import { WFClient, Server } from "../../core";

export class GameProvider {
  async missions(server: Server = Server.Ru) {
    const endpoint = WFClient.getEndpoint(server);
    
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`${endpoint}/game/missions`);

        return resolve(response.data);
      } catch (err) {
        return reject(err.response.data);
      }
    });
  }
}