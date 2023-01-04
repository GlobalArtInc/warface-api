import { Endpoint } from '../../core/wfs';
import axios from 'axios';

export class ClanProvider {
  async members(name: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(encodeURI(`${Endpoint.Api}/clan/${name}`));

        return resolve(response.data);
      } catch (err) {
        reject(err);
      }
    });
  }
}
