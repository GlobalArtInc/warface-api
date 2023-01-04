import axios from "axios";
import { WFApi } from "..";
import { Server } from "../enum/common.enum";
import { Top } from "../interfaces/top.interface";

export class TopService {
  async getTop(server: Server): Promise<Top> {
    return new Promise(async (resolve, reject) => {
      if(!server) {
        return reject('no_server_specified');
      }
      const endpoint = WFApi.getApiUrl(server);

      try {
        const response = await axios.get(`${endpoint}rating/top100`);

        return resolve(response.data);
      } catch (err) {
        return reject(err.response.data);
      }
    });
  }
}

export default new TopService();
