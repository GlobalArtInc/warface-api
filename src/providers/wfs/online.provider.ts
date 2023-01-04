import { Endpoint } from '../../core/wfs';
import axios from 'axios';

export class OnlineProvider {
  async stats() {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(encodeURI(`${Endpoint.Api}/online`));

        return resolve(response.data);
      } catch (err) {
        reject(err);
      }
    });
  }
}
