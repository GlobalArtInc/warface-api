import axios from "axios";
import { WFApi } from "..";
import { Server } from "../enum/common.enum";
import { Weapon } from "../interfaces/weapons.interface";

export class WeaponsService {
  async getWeapons(server: Server): Promise<Weapon[]> {
    return new Promise(async (resolve, reject) => {
      const endpoint = WFApi.getApiUrl(server);
      const response = await axios.get(`${endpoint}weapon/catalog`);

      try {
        return resolve(response.data);
      } catch (err) {
        return reject(err.response.data);
      }
    });
  }
}

export default new WeaponsService();
