import { Endpoint } from '../../core/wfs';
import axios from 'axios';

export class PlayerProvider {
  async stats(name: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(encodeURI(`${Endpoint.Api}/player/${name}`));

        return resolve(response.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async pve(name: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(encodeURI(`${Endpoint.Api}/player/${name}/pve`));

        return resolve(response.data);
      } catch (err) {
        reject(err);
      }
    });
  }

  async pveAchievements(name: string, ) {
    return new Promise(async (resolve, reject) => {
      try {
        const response = await axios.get(encodeURI(`${Endpoint.Api}/player/${name}/pve/achievements`));

        return resolve(response.data);
      } catch (err) {
        reject(err);
      }
    });
  }
}
