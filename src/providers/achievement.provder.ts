import axios from "axios";
import { WFClient } from "../core";
import { Server } from "../core/common";

export class AchievementProvider {
  async catalog(server = Server.Ru) {
    const endpoint = WFClient.getEndpoint(server);

    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(`${endpoint}achievement/catalog`);

        return resolve(response.data);
      } catch (err) {
        return reject(err.response.data);
      }
    });
  }
}